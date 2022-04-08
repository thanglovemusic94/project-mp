package com.mintpot.readingm.backend.repository;

import com.mintpot.readingm.backend.entity.CashRequirement;
import com.mintpot.readingm.backend.entity.CashStatus;
import com.mintpot.readingm.backend.entity.Refund;
import com.mintpot.readingm.backend.entity.constant.ClassType;
import com.mintpot.readingm.backend.entity.constant.PaymentMethod;
import com.mintpot.readingm.backend.entity.constant.RefundStatus;
import com.mintpot.readingm.backend.entity.user.Parent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Set;

public interface CashRequirementRepository extends ExtendedRepository<CashRequirement, Long>, JpaSpecificationExecutor<CashRequirement> {

    @Transactional
    @Modifying
    @Query("update CashRequirement c set c.status = :status where c.id = :id")
    void updateStatusById(long id, CashStatus status);

    Page<CashRequirement> findByUser_Id(long userId, Pageable page);

    @Query("select c from CashRequirement c " +
            "where (:startTime is null or c.createdOn >= :startTime) " +
            "and (:endTime is null or c.createdOn <= :endTime) " +
            "and (:status is null or c.status = :status) " +
            "and (:userName is null or c.user.name like %:userName%) " +
            "and (:point is null or CONVERT(c.point,char) like %:point%) " +
            "and (:term is null or ( c.user.name like %:term% " +
            "                     or CONVERT(c.point,char) like %:term%))")
    Page<CashRequirement> search(CashStatus status, String userName, String point, String term,
                        LocalDateTime startTime, LocalDateTime endTime, Pageable page);
}
