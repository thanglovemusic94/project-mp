package com.mintpot.readingm.backend.repository;

import com.mintpot.readingm.backend.entity.Refund;
import com.mintpot.readingm.backend.entity.constant.ClassType;
import com.mintpot.readingm.backend.entity.constant.InquiryStatus;
import com.mintpot.readingm.backend.entity.constant.PaymentMethod;
import com.mintpot.readingm.backend.entity.constant.RefundStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Set;

public interface RefundRepository extends ExtendedRepository<Refund, Long>, JpaSpecificationExecutor<Refund> {

    @Query("update Refund r set r.status = :status where r.id = :id")
    @Modifying
    @Transactional
    void updateStatusById(long id, RefundStatus status);

    @Query("select r from Refund r join r.payment p where p.id = :paymentId")
    Optional<Refund> findByPaymentId(long paymentId);

    Page<Refund> findByPayment_Payer_Id(long payerId, Pageable page);

    @Query("select r from Refund r " +
            "where (:startTime is null or r.createdOn >= :startTime) " +
            "and (:endTime is null or r.createdOn <= :endTime) " +
            "and (:status is null or r.status = :status) " +
            "and (:method is null or r.method = :method) " +
            "and (:payerName is null or r.payment.payer.name like %:payerName%) " +
            "and (:className is null or r.payment.classInformation.name like %:className%) " +
            "and (:amount is null or CONVERT(r.payment.amount,char) like %:amount%) " +
            "and (:term is null or ( r.payment.payer.name like %:term%" +
            "                     or r.payment.classInformation.name like %:term%" +
            "                     or CONVERT(r.payment.amount,char) like %:term%))")
    Page<Refund> search(RefundStatus status, PaymentMethod method,
                        String payerName, String className, String amount, String term,
                        LocalDateTime startTime, LocalDateTime endTime, Pageable page);
}
