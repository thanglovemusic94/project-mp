package com.mintpot.pii.repository;

import com.mintpot.pii.entity.Reservation;
import com.mintpot.pii.entity.constant.ReservationStatus;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    @EntityGraph(attributePaths = {"branchReviews"}, type = EntityGraph.EntityGraphType.LOAD)
    List<Reservation> findByUserIdAndStatusNot(long userId, ReservationStatus status);

    boolean existsByOrderId(String orderId);

    Optional<Reservation> findByOrderId(String orderId);

    //@Query("select r from Reservation r where r.startDate = :currentDate and r.status = :status")
    List<Reservation> findAllByStatus(ReservationStatus status);

    //@Query("select r from Reservation r where r.status = :status")
    List<Reservation> findAllReservationByStatusAndStartDateIsBefore(ReservationStatus reservationStatus, LocalDate currentDate);

    @Query("select r from Reservation r " +
            "left join fetch r.product p " +
            "left join fetch p.branch b " +
            "left join fetch b.company " +
            "where r.id = :reservationId")
    Optional<Reservation> findById(long reservationId);
}
