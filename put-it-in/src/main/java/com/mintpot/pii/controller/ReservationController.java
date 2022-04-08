package com.mintpot.pii.controller;

import com.mintpot.pii.dto.BranchReviewDto;
import com.mintpot.pii.dto.RegReservationDto;
import com.mintpot.pii.entity.*;
import com.mintpot.pii.entity.constant.ReservationStatus;
import com.mintpot.pii.entity.embeddable.PeriodDiscount;
import com.mintpot.pii.exception.BusinessException;
import com.mintpot.pii.exception.error.ErrorCode;
import com.mintpot.pii.facade.AuthenticationFacade;
import com.mintpot.pii.repository.ProductRepository;
import com.mintpot.pii.repository.ReservationRepository;
import com.mintpot.pii.service.ReservationService;
import com.mintpot.pii.utils.DateTimeUtils;
import io.swagger.annotations.Api;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;
import java.util.Optional;

@RestController
@RequestMapping("/api/reservations")
@Api("Reservation")
public class ReservationController {

    private final ReservationService reservationService;

    private final ProductRepository productRepo;
    private final ReservationRepository reservationRepo;

    private final ModelMapper mapper;
    private final AuthenticationFacade authFacade;

    public ReservationController(ReservationService reservationService, ProductRepository productRepo,
                                 ReservationRepository reservationRepo, ModelMapper mapper, AuthenticationFacade authFacade) {
        this.reservationService = reservationService;
        this.productRepo = productRepo;
        this.reservationRepo = reservationRepo;
        this.mapper = mapper;
        this.authFacade = authFacade;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('ROLE_USER')")
    Reservation regReservation(@RequestBody RegReservationDto regReservDto) {
        final var userId = authFacade.getAuthentication().getUserId();
        var product =
                productRepo.findDetailsById(regReservDto.getProductId()).orElseThrow(() -> new BusinessException(ErrorCode.ENTITY_NOT_FOUND));

        var reservation = mapper.map(regReservDto, Reservation.class);
        reservation.setProduct(new Product(product.getId()));
        var curDiscount = new PeriodDiscount(0, 0);
        final var rUsagePeriod = regReservDto.getUsagePeriod();

        for (PeriodDiscount discount : product.getPeriodDiscounts()) {
            if (rUsagePeriod >= discount.getMonthAmount() && discount.getMonthAmount() > curDiscount.getMonthAmount())
                curDiscount = discount;
        }
        final long dPricePerMonth = Math.round(product.getPrice() * (100 - curDiscount.getDiscountPercentage()) / 100);
        final long dTotal = dPricePerMonth * rUsagePeriod * regReservDto.getQuantity() + product.getDeposit();

        reservation.setPaidAmount(dTotal);
        reservation.setUser(new User(userId));
        return reservationService.regReservation(reservation);
    }

    @PatchMapping("/{reservationId}/end")
    @PreAuthorize("hasAnyRole({'ROLE_USER', 'ADMIN'})")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void endUseOrCancelReservation(@PathVariable final long reservationId) {
        // Validate
        Reservation reservation = reservationRepo.findById(reservationId)
                .orElseThrow(() -> new BusinessException(ErrorCode.ENTITY_NOT_FOUND));
        if (!reservationService.hasModifyRight(reservation)) {
            throw new BusinessException(ErrorCode.INSUFFICIENT_PRIVILEGE);
        }
        switch (reservation.getStatus()) {
            case RESERVED:
                reservation.setStatus(ReservationStatus.CANCELED);
                break;
            case IN_USE:
                reservation.setStatus(ReservationStatus.ENDED);
                break;
            default:
                throw new BusinessException(ErrorCode.POST_ILLEGAL_STATUS);
        }

        reservationRepo.save(reservation);
        // Refund process
    }

    @GetMapping("/{reservationId}")
    @PreAuthorize("hasAnyRole({'ROLE_USER', 'ADMIN'})")
    Reservation getById(@PathVariable long reservationId) {
        Reservation reservation = reservationRepo.findById(reservationId)
                .orElseThrow(() -> new BusinessException(ErrorCode.ENTITY_NOT_FOUND));
        if (!reservationService.hasModifyRight(reservation)) {
            throw new BusinessException(ErrorCode.INSUFFICIENT_PRIVILEGE);
        }
        return reservation;
    }
}
