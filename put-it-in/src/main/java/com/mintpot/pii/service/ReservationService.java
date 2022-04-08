package com.mintpot.pii.service;

import com.mintpot.pii.dto.BranchReviewDto;
import com.mintpot.pii.entity.BranchReview;
import com.mintpot.pii.entity.Reservation;

import java.time.LocalDate;

public interface ReservationService {
    Reservation regReservation(Reservation reservation);
    boolean hasModifyRight(Reservation reservation);
    void udpReservationStatus();
}
