package com.mintpot.readingm.backend.repository;

import com.mintpot.readingm.backend.entity.constant.SettlementStatus;
import com.mintpot.readingm.backend.entity.settlement.Settlement;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface SettlementRepository extends JpaRepository<Settlement, Long> {

    @Query("select s from Settlement s where (:type is null or s.liveClass.type = :type) and " +
            "(:status is null or s.status = :status) and " +
            "(:tutorName is null or s.liveClass.tutor.name = :tutorName) and " +
            "(:startDate is null or s.liveClass.openDate >= :startDate) and " +
            "(:endDate is null or s.liveClass.openDate <= :endDate) and " +
            "(:className is null or s.liveClass.name like %:className%) and " +
            "(:tuitionFee is null or str(s.liveClass.tuitionFee) like %:tuitionFee%) and " +
            "(:payerNumber is null or str(s.payerNumber) like %:payerNumber%) and " +
            "(:fee is null or str(s.fee) like %:fee%) and " +
            "(:tax is null or str(s.tax) like %:tax%) and " +
            "(:amount is null or str(s.amount) like %:amount%) and " +
            "(:term is null or s.liveClass.name like %:term% or " +
            "s.liveClass.tutor.name like %:term% or " +
            "s.liveClass.type like %:term% or " +
            "str(s.liveClass.tuitionFee) like %:term% or " +
            "str(s.payerNumber) like %:term% or " +
            "str(s.fee) like %:term% or " +
            "str(s.tax) like %:term% or " +
            "str(s.amount) like %:term%) order by s.liveClass.openDate")
    <T> Page<T> find(String type, SettlementStatus status, String tutorName, LocalDate startDate, LocalDate endDate,
                     String className, String tuitionFee, String payerNumber, String fee, String tax, String amount,
                     String term, Pageable pageable, Class<T> projectionClass);


    <T>  Optional<T> findById(long id, Class<T> projectionClass);

    Optional<Settlement> findById(long id);

    <T> Page<T> findByLiveClass_Tutor_Id(long tutorId, Pageable pageable, Class<T> projectionClass);
}
