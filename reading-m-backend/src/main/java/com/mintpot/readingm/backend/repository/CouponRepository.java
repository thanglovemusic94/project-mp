package com.mintpot.readingm.backend.repository;

import com.mintpot.readingm.backend.entity.Coupon;
import com.mintpot.readingm.backend.entity.constant.ClassType;
import com.mintpot.readingm.backend.entity.constant.IssuingMode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface CouponRepository extends JpaRepository<Coupon, Long> {

    @Query("select c from Coupon c where (:classType is null or c.classType = :classType) " +
        "and (:name is null or c.name like %:name%) " +
        "and (:term is null or c.name like %:term% or str(c.amount) like %:term%)")
    Page<Coupon> find(ClassType classType, String name, String term, Pageable page);

    @Query("select c from Coupon c where (c.classType is null) " +
        "and (:name is null or c.name like %:name%) " +
        "and (:term is null or c.name like %:term% or str(c.amount) like %:term%)")
    Page<Coupon> findByAppliedAll(String name, String term, Pageable page);

    @Query("select c from Coupon c left join c.members m where (m.id = :parentId " +
            "or c.issuingMode = " + IssuingMode.Constant.ALL_VALUE +
            ") and (c.id, :parentId) not in (select u.couponId, u.parentId from CouponUsed u)"
    )
    Page<Coupon> findCoupOnStillValid(long parentId, Pageable page);

    @Query("select c from Coupon c left join c.members m where ((m.id = :parentId " +
            "or c.issuingMode = " + IssuingMode.Constant.ALL_VALUE +
            ") and (:classType is null or c.classType is null or c.classType = :classType))" +
            " and (c.id, :parentId) not in (select u.couponId, u.parentId from CouponUsed u)"
    )
    List<Coupon> findCoupOnStillValid(long parentId, ClassType classType);

}
