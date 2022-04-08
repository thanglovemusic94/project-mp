package com.mintpot.carcloth.controller.app;

import com.mintpot.carcloth.constant.ShowStatus;
import com.mintpot.carcloth.constant.enums.ENoticeType;
import com.mintpot.carcloth.dto.car.CarInfoDto;
import com.mintpot.carcloth.dto.review.EditUserReview;
import com.mintpot.carcloth.dto.review.RegisterUserReview;
import com.mintpot.carcloth.dto.review.UserReviewDto;
import com.mintpot.carcloth.entity.ConstructionReview;
import com.mintpot.carcloth.exception.CommonException;
import com.mintpot.carcloth.exception.ErrorCode;
import com.mintpot.carcloth.repository.CompanyQuoteRepository;
import com.mintpot.carcloth.repository.CompanyRepository;
import com.mintpot.carcloth.repository.ConstructionReviewRepository;
import com.mintpot.carcloth.repository.MemberRepository;
import com.mintpot.carcloth.security.AuthenticationFacade;
import com.mintpot.carcloth.service.NoticeService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/app/reviews")
@Api(tags = {"User review"})
@RequiredArgsConstructor
public class ReviewController {

    private final AuthenticationFacade authenticationFacade;
    private final MemberRepository memberRepo;
    private final ConstructionReviewRepository reviewRepo;
    private final CompanyQuoteRepository quotationRepo;
    private final NoticeService noticeService;
    private final ModelMapper mapper;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @ApiOperation(value = "Api for slide 53")
    @Transactional
    public void registerReview(@Valid @RequestBody RegisterUserReview reviewDto) {
        long userId = authenticationFacade.getAuthentication().getUserId();
        var user = memberRepo.findById(userId)
                .orElseThrow(() -> new CommonException(ErrorCode.USER_NOT_EXIST));

        var quotation = quotationRepo.findById(reviewDto.getQuotationId())
                .orElseThrow(() -> new CommonException(ErrorCode.QUOTATION_NOT_FOUND));

        var company = quotation.getCompany();

        reviewRepo.findByQuotation(quotation).ifPresent(ex -> {
            throw new CommonException(ErrorCode.REVIEW_EXISTED);
        });

        var review = mapper.map(reviewDto, ConstructionReview.class);
        review.setWriter(user);
        review.setCompany(company);
        review.setQuotation(quotation);
        review.setStatus(ShowStatus.SHOW);

        review = reviewRepo.save(review);

        //send a notice to company
        noticeService.createNotice(ENoticeType.REVIEW, company.getRequestUser(),
                String.format("\"{%s}\"님이 후기를 남겼습니다", review.getWriter().getCarNumber()), reviewDto.getQuotationId());

    }

    @PutMapping("/{reviewId}")
    @Transactional
    public void edit(@PathVariable long reviewId,
                     @Valid @RequestBody EditUserReview reviewDto) {

        var review = reviewRepo.findById(reviewId)
                .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));

        review.setContent(reviewDto.getContent());
        review.setQuality(reviewDto.getQuality());
        review.setKindness(reviewDto.getKindness());
        review.setProductExplain(reviewDto.getProductExplain());

        reviewRepo.save(review);
    }

    @GetMapping("/exists-by-id")
    @ApiOperation(value = "Api for slide 50")
    public UserReviewDto findByQuotationId(@RequestParam long quotationId) {
        var quotation = quotationRepo.findById(quotationId)
                .orElseThrow(() -> new CommonException(ErrorCode.QUOTATION_NOT_FOUND));

        var review = reviewRepo
                .findByQuotation(quotation)
                .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));

        var res = mapper.map(review, UserReviewDto.class);

        var reviewer = review.getWriter();
        var carInfo = mapper.map(reviewer.getCarType(), CarInfoDto.class);
        carInfo.setCarNumber(reviewer.getCarNumber());
        res.setCarInfo(carInfo);

        return res;
    }

    @GetMapping("/company/{companyId}")
    @ApiOperation(value = "Api for slide 55")
    public Page<UserReviewDto> findByCompany(@PathVariable long companyId,
                                             Pageable page) {
        return reviewRepo.findByCompany_Id(companyId, page)
                .map(r -> {
                    var dto = mapper.map(r, UserReviewDto.class);
                    var writer = r.getWriter();
                    var carInfo = mapper.map(writer.getCarType(), CarInfoDto.class);
                    carInfo.setCarNumber(writer.getCarNumber());
                    dto.setCarInfo(carInfo);
                    return dto;
                });
    }
}
