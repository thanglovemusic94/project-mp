package com.mintpot.pii.service.impl;

import com.mintpot.pii.entity.Reservation;
import com.mintpot.pii.entity.constant.ReservationStatus;
import com.mintpot.pii.facade.AuthenticationFacade;
import com.mintpot.pii.repository.ReservationRepository;
import com.mintpot.pii.service.ReservationService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;

@Service
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository reservationRepo;

    private final AuthenticationFacade authFacade;

    public ReservationServiceImpl(
            ReservationRepository reservationRepo,
            AuthenticationFacade authFacade) {
        this.reservationRepo = reservationRepo;
        this.authFacade = authFacade;
    }

    @Override
    public Reservation regReservation(Reservation reservation) {
        reservation.setStatus(ReservationStatus.PENDING);

        String orderId = null;
        do {
            orderId = String.format("%06d", new Random().nextInt(999999));
        } while (reservationRepo.existsByOrderId(orderId));
        reservation.setOrderId(orderId);
        return reservationRepo.save(reservation);
    }

    @Override
    public boolean hasModifyRight(Reservation reservation) {
        // Check user authern vs reservation
        if (authFacade.hasRole("ADMIN")) {
            return true;
        } else if (authFacade.hasRole("ROLE_USER")) {
            final var userId = authFacade.getAuthentication().getUserId();
            if (reservation.getUser().getId() == userId) {
                return true;
            }
        }
        return false;
    }

    @Override
    public void udpReservationStatus() {
        // update in-use -> expired
        List<Reservation> lstInUse = reservationRepo.findAllByStatus(ReservationStatus.IN_USE);
        if (!lstInUse.isEmpty()) {
            lstInUse.forEach(updReservation -> {
                int periodDays = updReservation.getUsagePeriod() * 30;
                if (LocalDate.now().minusDays(periodDays - 1).isAfter(updReservation.getStartDate())) {
                    updReservation.setStatus(ReservationStatus.ENDED);
                }
            });
            reservationRepo.saveAll(lstInUse);
        }

        // update reserved -> in-use
        List<Reservation> lstReserved = reservationRepo
                .findAllReservationByStatusAndStartDateIsBefore(ReservationStatus.RESERVED, LocalDate.now().plusDays(1));
        if (!lstReserved.isEmpty()) {
            lstReserved.forEach(updReservation -> {
                updReservation.setStatus(ReservationStatus.IN_USE);
            });
            reservationRepo.saveAll(lstReserved);
        }
    }
}
