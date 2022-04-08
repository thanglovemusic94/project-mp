package com.mintpot.readingm.backend.service;

import com.mintpot.readingm.backend.dto.admin.RefundDto;
import com.mintpot.readingm.backend.dto.admin.SaveRefundDto;
import com.mintpot.readingm.backend.entity.Refund;
import com.mintpot.readingm.backend.entity.constant.ClassType;
import com.mintpot.readingm.backend.entity.constant.PaymentMethod;
import com.mintpot.readingm.backend.entity.constant.RefundStatus;
import com.mintpot.readingm.backend.exception.CommonException;
import com.mintpot.readingm.backend.exception.ErrorCode;
import com.mintpot.readingm.backend.repository.PaymentRepository;
import com.mintpot.readingm.backend.repository.RefundRepository;
import com.mintpot.readingm.backend.security.AuthenticationFacade;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.util.Strings;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class RefundServiceImpl implements RefundService {

    private final RefundRepository refundRepository;

    private final PaymentService paymentService;

    private final PaymentRepository paymentRepository;

    private final ModelMapper mapper;

    private final AuthenticationFacade authenticationFacade;

    @Override
    public RefundDto convertEntityToDto(Refund entity) {
        RefundDto dto = mapper.map(entity, RefundDto.class);
        dto.setRefundTime(entity.getCreatedOn());
        dto.setPayment(paymentService.convertEntityToDto(entity.getPayment()));
        return dto;
    }

    private Refund convertDtoToEntity(SaveRefundDto dto) {
        Refund entity = mapper.map(dto, Refund.class);
        entity.setStatus(RefundStatus.REFUND_REQUEST);
        entity.setPayment(paymentService.findEntityById(dto.getPaymentId()));
        return entity;
    }

    @Override
    public void createRefund(SaveRefundDto dto) {
        Optional<Refund> refund = refundRepository.findByPaymentId(dto.getPaymentId());
        long payerId = authenticationFacade.getAuthentication().getUserId();
        paymentRepository.findCompletedPaymentByPayerIdAndId(payerId, dto.getPaymentId())
                .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));

        if (refund.isEmpty()) {
            refundRepository.save(convertDtoToEntity(dto));
        }
    }

    @Override
    public void updateRefundStatus(long id, RefundStatus status) {
        refundRepository.updateStatusById(id, status);
    }

    @Override
    public Optional<Refund> getRefundById(Long refundId) {
        return refundRepository.findById(refundId);
    }

    @Override
    public Page<RefundDto> findBySpec(Specification<Refund> query, Pageable page) {
        return refundRepository.findAll(query, page).map(this::convertEntityToDto);
    }

    @Override
    public Page<RefundDto> search(LocalDate start, LocalDate end, RefundStatus status, PaymentMethod method,
                                  String optionSearch, String term, Pageable page) {
        String payerName = null;
        String className = null;
        String amount = null;

        if(!Strings.isBlank(optionSearch)) {
            if("payerName".equals(optionSearch)) {
                payerName = term;
                term = null;
            } else if("className".equals(optionSearch)) {
                className = term;
                term = null;
            } else if("amount".equals(optionSearch)) {
                amount = term;
                term = null;
            }
        }

        LocalDateTime startTime = start != null ? LocalDateTime.of(start, LocalTime.of(0, 0, 0)) : null;
        LocalDateTime endTime = end != null ? LocalDateTime.of(end, LocalTime.of(23, 59, 59)) : null;

        return refundRepository.search(status, method, payerName, className, amount, term, startTime, endTime, page)
            .map(this::convertEntityToDto);
    }
}
