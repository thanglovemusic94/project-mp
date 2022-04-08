package com.mintpot.pii.controller;

import com.mintpot.pii.dto.BranchReviewDto;
import com.mintpot.pii.entity.Reservation;
import com.mintpot.pii.entity.constant.ReservationStatus;
import com.mintpot.pii.exception.BusinessException;
import com.mintpot.pii.exception.error.ErrorCode;
import com.mintpot.pii.repository.ReservationRepository;
import com.mintpot.pii.service.BranchReviewService;
import com.mintpot.pii.service.ReservationService;
import com.mintpot.pii.utils.DateTimeUtils;
import io.swagger.annotations.Api;
import org.springframework.http.HttpStatus;
import org.springframework.lang.Nullable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.Date;

@RestController
@RequestMapping("/api/branchReviews")
@Api("Branch Review")
public class BranchReviewController {

    private final ReservationService reservationService;
    private final BranchReviewService branchReviewService;
    private final ReservationRepository reservationRepo;

    public BranchReviewController(ReservationService reservationService,
                                  BranchReviewService branchReviewService,
                                  ReservationRepository reservationRepo) {
        this.reservationService = reservationService;
        this.branchReviewService = branchReviewService;
        this.reservationRepo = reservationRepo;
    }

    @PostMapping
    @PreAuthorize("hasAnyRole({'ROLE_USER', 'ADMIN'})")
    @ResponseStatus(HttpStatus.CREATED)
    void createReview(@Valid @ModelAttribute BranchReviewDto branchReviewDto, @Nullable @RequestPart("photo") MultipartFile photo) {
        // Validate
        Reservation reservation = reservationRepo.findById(branchReviewDto.getReservationId())
                .orElseThrow(() -> new BusinessException(ErrorCode.ENTITY_NOT_FOUND));
        if (!reservationService.hasModifyRight(reservation)) {
            throw new BusinessException(ErrorCode.INSUFFICIENT_PRIVILEGE);
        }
        // Write review
        Date now = new Date();
        if (ReservationStatus.ENDED != reservation.getStatus()) {
            throw new BusinessException(ErrorCode.POST_ILLEGAL_STATUS);
        }
        if (DateTimeUtils.getDiffDays(now, reservation.getLastUpdatedOn()) > 30) {
            throw new BusinessException(ErrorCode.VALIDATION_FAILED);
        }
        branchReviewService.createReview(branchReviewDto, photo);
    }
}

