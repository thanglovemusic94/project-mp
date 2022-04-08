package com.mintpot.readingm.backend.controller;

import com.mintpot.readingm.backend.dto.admin.RefundDto;
import com.mintpot.readingm.backend.dto.admin.SaveCashRequirementDto;
import com.mintpot.readingm.backend.dto.admin.SaveRefundDto;
import com.mintpot.readingm.backend.dto.admin.UserViewDto;
import com.mintpot.readingm.backend.dto.parent.*;
import com.mintpot.readingm.backend.dto.payment.PaymentDetailDto;
import com.mintpot.readingm.backend.dto.payment.SavePaymentDto;
import com.mintpot.readingm.backend.dto.payment.SavePaymentRes;
import com.mintpot.readingm.backend.dto.payment.TossPaymentDto;
import com.mintpot.readingm.backend.dto.payment.embedded.ClassInfo;
import com.mintpot.readingm.backend.dto.payment.embedded.PaymentInfo;
import com.mintpot.readingm.backend.entity.Refund;
import com.mintpot.readingm.backend.entity.TossTransaction;
import com.mintpot.readingm.backend.entity.constant.ClassType;
import com.mintpot.readingm.backend.entity.constant.IssuingMode;
import com.mintpot.readingm.backend.entity.constant.PaymentStatus;
import com.mintpot.readingm.backend.exception.CommonException;
import com.mintpot.readingm.backend.exception.ErrorCode;
import com.mintpot.readingm.backend.repository.*;
import com.mintpot.readingm.backend.security.AuthenticationFacade;
import com.mintpot.readingm.backend.service.CashRequirementService;
import com.mintpot.readingm.backend.service.PaymentService;
import com.mintpot.readingm.backend.service.RefundService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/parent")
@Api(tags = {"Parent"})
@RequiredArgsConstructor
//@PreAuthorize("hasRole('Parent')")
public class ParentController {
    private final ModelMapper mapper;

    private final AuthenticationFacade authenticationFacade;

    private final ParentRepository parentRepository;

    private final PaymentRepository paymentRepository;

    private final RefundRepository refundRepository;

    private final RefundService refundService;

    private final PaymentService paymentService;

    private final CashRequirementService cashRequirementService;

    private final CouponRepository couponRepository;

    private final PointRepository pointRepository;

    private final StudentRepository studentRepo;

    private final CashRequirementRepository cashRequirementRepo;

    private final TossTransactionRepository transactionRepo;

    private final WebClient tossWebClient;

    @GetMapping("/byClass")
    @ApiOperation(value="API for parent selection drop down 9-7-2 web main")
    public List<UserViewDto> getParentByClass(@RequestParam long classId) {
        return parentRepository.findByChildren_Classes_Id(classId).stream()
                .map(parent -> mapper.map(parent, UserViewDto.class))
                .collect(Collectors.toList());
    }

    @GetMapping("/children")
    public List<UserViewDto> getChildren() {
        long parentId =  authenticationFacade.getAuthentication().getUserId();
        return studentRepo.findByParent_Id(parentId).stream()
                .map(std -> mapper.map(std, UserViewDto.class))
                .collect(Collectors.toList());
    }

    @GetMapping("/children/byParentId/{parentId}")
    public List<UserViewDto> getChildren(@PathVariable long parentId) {
        return studentRepo.findByParent_Id(parentId).stream()
                .map(std -> mapper.map(std, UserViewDto.class))
                .collect(Collectors.toList());
    }

    @GetMapping("/payment")
    public Page<PaymentListDto> getPayment(Pageable page) {
        long payerId = authenticationFacade.getAuthentication().getUserId();
        return paymentRepository.findCompletedPaymentByPayerId(payerId, page).map(p -> mapper.map(p, PaymentListDto.class));
    }

    @GetMapping("/payment/{paymentId}")
    public PaymentDetailDto getPaymentDetail(@PathVariable long paymentId) {
        var payment = paymentRepository.findById(paymentId).orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));
        if (payment.getStatus() == PaymentStatus.PENDING) {
            throw new CommonException(ErrorCode.ENTITY_NOT_FOUND);
        }

        var paymentDetail = mapper.map(payment, PaymentDetailDto.class);
        paymentDetail.setPaymentInfo(mapper.map(payment, PaymentInfo.class));
        paymentDetail.setClassInformation(mapper.map(payment.getClassInformation(), ClassInfo.class));
        paymentDetail.setChildName(payment.getChildren().getName());
        return paymentDetail;
    }

    @PostMapping("/payment/order")
    @ApiOperation(value = "For live class ignore videoInPays, payment methods: [BANK_TRANSFER,CREDIT_CARD]")
    @ResponseStatus(HttpStatus.CREATED)
    public SavePaymentRes createPayment(@RequestBody SavePaymentDto paymentDto) {
        return mapper.map(paymentService.createPayment(paymentDto), SavePaymentRes.class);
    }

    @PostMapping("/payment/complete")
    public PaymentDetailDto completePayment(@RequestBody @Valid TossPaymentDto tossPaymentDto) {
        long payerId = authenticationFacade.getAuthentication().getUserId();
        var tossApprovalDto = tossPaymentDto.getTossPayment();
        var payment = paymentRepository.findByOrderIdAndPayer_Id(tossApprovalDto.getOrderId(), payerId)
                .orElseThrow(() -> new CommonException(ErrorCode.PYMNT_ORDER_ID_NOT_FOUND));

        if (payment.getStatus() != PaymentStatus.PENDING) {
            throw new CommonException(ErrorCode.PYMNT_ORDER_ILLEGAL_STATUS);
        }

        if (tossApprovalDto.getAmount() != payment.getFinalAmount()) {
            throw new CommonException(ErrorCode.PYMNT_ORDER_WRONG_AMNT);
        }

        var res = tossWebClient
                .post()
                .uri("/v1/payments/" + tossPaymentDto.getPaymentKey())
                .body(BodyInserters.fromValue(tossApprovalDto))
                .retrieve()
                .bodyToMono(TossTransaction.class)
                .block();

        if (res != null) {
            transactionRepo.save(res);
            payment = paymentService.completePayment(payment);
            var paymentDetail = mapper.map(payment, PaymentDetailDto.class);
            paymentDetail.setPaymentInfo(mapper.map(payment, PaymentInfo.class));
            paymentDetail.setClassInformation(mapper.map(payment.getClassInformation(), ClassInfo.class));
            paymentDetail.setChildName(payment.getChildren().getName());
            return paymentDetail;
        } else {
            throw new CommonException(ErrorCode.PYMNT_TRANSACTION_FAILED);
        }
    }

    @GetMapping("/refund")
    public Page<RefundListDto> getRefund(Pageable page) {
        long payerId = authenticationFacade.getAuthentication().getUserId();
        return refundRepository.findByPayment_Payer_Id(payerId, page).map(refund -> mapper.map(refund, RefundListDto.class));
    }

    @GetMapping("/refund/{refundId}")
    public RefundDto getRefundDetail(@PathVariable long refundId) {
        long payerId = authenticationFacade.getAuthentication().getUserId();
        Refund refund = refundRepository.findById(refundId)
                .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));

        if (refund.getPayment().getPayer().getId() != payerId) {
            throw new CommonException(ErrorCode.USER_NOT_ALLOWED);
        }

        return refundService.convertEntityToDto(refund);
    }

    @PostMapping("/refund")
    @ResponseStatus(HttpStatus.CREATED)
    public void requestRefund(@RequestBody SaveRefundDto dto) {
        refundService.createRefund(dto);
    }

    @GetMapping("/cash-requirement")
    public Page<CashRequirementListDto> getCashRequirement(Pageable page) {
        long parentId = authenticationFacade.getAuthentication().getUserId();
        return cashRequirementRepo.findByUser_Id(parentId, page).map(p -> mapper.map(p, CashRequirementListDto.class));
    }

    @PostMapping("/cash-requirement")
    @ResponseStatus(HttpStatus.CREATED)
    public void createCashRequirement(@RequestBody SaveCashRequirementDto dto) {
        long id = authenticationFacade.getAuthentication().getUserId();
        dto.setParentId(id);
        cashRequirementService.createCashRequirement(dto);
    }

    @GetMapping("/coupon")
    public Page<CouponListDto> getAllCoupon(Pageable page) {
        long parentId = authenticationFacade.getAuthentication().getUserId();
        return couponRepository.findCoupOnStillValid(parentId, page).map(c -> mapper.map(c, CouponListDto.class));
    }

    @GetMapping("/coupon/still-valid")
    public List<CouponListDto> getValidCoupon(@RequestParam ClassType classType) {
        long parentId = authenticationFacade.getAuthentication().getUserId();
        return couponRepository.findCoupOnStillValid(parentId, classType).stream()
                .map(c -> mapper.map(c, CouponListDto.class))
                .collect(Collectors.toList());
    }

    @GetMapping("/point")
    public Page<PointListDto> getPoints(Pageable page) {
        long parentId = authenticationFacade.getAuthentication().getUserId();
        return pointRepository.getByOwnerOrMode(parentId, IssuingMode.ALL, page)
                .map(p -> mapper.map(p, PointListDto.class));
    }

    @GetMapping("/point/summary")
    public List<PointSummaryView> summaryPoints() {
        long parentId = authenticationFacade.getAuthentication().getUserId();
        return pointRepository.summaryPointRemained(parentId, PointSummaryView.class);
    }
}
