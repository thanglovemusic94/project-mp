package com.mintpot.pii.controller;

import com.mintpot.pii.dto.RegPaymentDto;
import com.mintpot.pii.entity.Reservation;
import com.mintpot.pii.entity.Transaction;
import com.mintpot.pii.entity.constant.ReservationStatus;
import com.mintpot.pii.exception.BusinessException;
import com.mintpot.pii.exception.error.ErrorCode;
import com.mintpot.pii.repository.ReservationRepository;
import com.mintpot.pii.repository.TransactionRepository;
import io.swagger.annotations.Api;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

@RestController
@RequestMapping("/api/payments")
@Api("Payment")
public class PaymentController {

    private final ReservationRepository reservationRepo;
    private final TransactionRepository transRepo;

    private final WebClient tossWebClient;

    public PaymentController(ReservationRepository reservationRepo, TransactionRepository transRepo,
                             WebClient tossWebClient) {
        this.reservationRepo = reservationRepo;
        this.transRepo = transRepo;
        this.tossWebClient = tossWebClient;
    }

    @PostMapping("/transact")
    @PreAuthorize("hasRole('ROLE_USER')")
    Reservation transact(@RequestBody RegPaymentDto regPaymentDto) throws CloneNotSupportedException {
        var reservation = reservationRepo.findByOrderId(regPaymentDto.getOrderId())
                .orElseThrow(() -> new BusinessException(ErrorCode.PYMNT_ORDER_ID_NOT_FOUND));
        if(reservation.getStatus() != ReservationStatus.PENDING)
            throw new BusinessException(ErrorCode.PYMNT_ORDER_ILLEGAL_STATUS);

        if(reservation.getPaidAmount() != regPaymentDto.getAmount())
            throw new BusinessException(ErrorCode.PYMNT_ORDER_WRONG_AMNT);

        var reqBody = (RegPaymentDto)regPaymentDto.clone();
        reqBody.setPaymentKey(null);
        var res = tossWebClient
                .post()
                .uri("/v1/payments/" + regPaymentDto.getPaymentKey())
                .body(BodyInserters.fromValue(reqBody))
                .retrieve()
                .bodyToMono(Transaction.class)
                .block();
        if(res != null) {
            transRepo.save(res);
            reservation.setStatus(ReservationStatus.RESERVED);
            reservation = reservationRepo.save(reservation);
            return reservation;
        } else throw new BusinessException(ErrorCode.PYMNT_TRANSACTION_FAILED);
    }
}
