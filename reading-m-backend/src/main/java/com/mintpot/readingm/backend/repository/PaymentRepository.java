package com.mintpot.readingm.backend.repository;

import com.mintpot.readingm.backend.dto.admin.PaidClassView;
import com.mintpot.readingm.backend.entity.Payment;
import com.mintpot.readingm.backend.entity.clazz.Class;
import com.mintpot.readingm.backend.entity.clazz.LiveClass;
import com.mintpot.readingm.backend.entity.constant.*;
import com.mintpot.readingm.backend.entity.user.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface PaymentRepository extends ExtendedRepository<Payment, Long>, JpaSpecificationExecutor<Payment> {

    @Query(value = "select p.id as id, p.class_type as classTypeCode, p.created_on as paymentTime," +
            " p.status as statusCode, p.method as methodCode, payer.name as payerName, " +
            " t.name as tutorName, p.final_amount as payValue, c.name as className" +
            " from payment p " +
            " join user payer on p.payer_id = payer.id " +
            " join class c on p.class_id = c.id " +
            " left join user t on c.tutor_id = t.id" +
            " where p.status = " + PaymentStatus.Constant.COMPLETED  +
            " and (:tutorName is null or t.name = :tutorName)" +
            " and (:classTypeCode is null or p.class_type = :classTypeCode) " +
            " and (:methodCode is null or p.method = :methodCode) " +
            " and (:startTime is null or p.created_on >= :startTime) " +
            " and (:endTime is null or p.created_on <= :endTime) " +
            " and (:payerName is null or payer.name like %:payerName%) " +
            " and (:amount is null or CONVERT(p.amount, char) like %:amount%) " +
            " and (:term is null or ( payer.name like %:term%" +
            "                     or CONVERT(p.amount, char) like %:term%))" +
            " order by p.created_on desc",

            countQuery =  "select count(*) " +
                    " from payment p " +
                    " join user payer on p.payer_id = payer.id " +
                    " join class c on p.class_id = c.id " +
                    " left join user t on c.tutor_id = t.id" +
                    " where p.status = " + PaymentStatus.Constant.COMPLETED  +
                    " and (:tutorName is null or t.name = :tutorName)" +
                    " and (:classTypeCode is null or p.class_type = :classTypeCode) " +
                    " and (:methodCode is null or p.method = :methodCode) " +
                    " and (:startTime is null or p.created_on >= :startTime) " +
                    " and (:endTime is null or p.created_on <= :endTime) " +
                    " and (:payerName is null or payer.name like %:payerName%) " +
                    " and (:amount is null or CONVERT(p.amount, char) like %:amount%) " +
                    " and (:term is null or (payer.name like %:term%" +
                    "                     or CONVERT(p.amount, char) like %:term%))",

            nativeQuery = true)
    <T> Page<T> findCompletedPayment(Integer classTypeCode, Integer methodCode, String tutorName,
                                       LocalDateTime startTime, LocalDateTime endTime,
                                       String payerName, String amount, String term, Pageable page, java.lang.Class<T> resultType);

    @Query("select p from Payment p where p.status = " + PaymentStatus.Constant.COMPLETED +
            " and p.payer.id = :payerId")
    Page<Payment> findCompletedPaymentByPayerId(long payerId, Pageable page);

    @Query("select p from Payment p where p.status = " + PaymentStatus.Constant.COMPLETED +
            " and p.payer.id = :payerId and p.id = :id")
    Optional<Payment> findCompletedPaymentByPayerIdAndId(long payerId, long id);

    @Query(value = "select p.classInformation.id as classId, p.classType as classType ,max (p.createdOn) as paymentCreatedOn " +
            "from Payment p where p.children.id = :childrenId and p.classType= :classType group by p.classInformation")
    Page<PaidClassView> getPaidClassView(long childrenId, ClassType classType, Pageable page);

    @Query("select count(*) from Payment p left join p.refund r " +
            "where p.status = " +  PaymentStatus.Constant.COMPLETED +
            " and p.classInformation = :liveClass and " +
            "(r.id is null or r.status <> " + RefundStatus.Constant.REFUND_COMPLETION + ")")
    int countPaymentNotRefund(LiveClass liveClass);

    Optional<Payment> findByOrderIdAndPayer_Id(String orderId, long payerId);

    boolean existsByOrderId(String orderId);

    @Query("select p.classInformation from Payment p left join p.refund r" +
            " where p.children.id = :studentId and r.id is null" +
            " and p.status = " + PaymentStatus.Constant.COMPLETED +
            " order by p.createdOn desc")
    Page<Class> getPaidClassByStudentId(long studentId, Pageable page);

    @Query("select p from Payment p where" +
            " p.status = " + PaymentStatus.Constant.COMPLETED +
            " and p.classInformation.id = :classId"
    )
    List<Payment> findPaymentByClass(long classId);
}
