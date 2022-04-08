package com.mintpot.carcloth.repository;

import com.mintpot.carcloth.constant.SNSType;
import com.mintpot.carcloth.constant.UserStatus;
import com.mintpot.carcloth.entity.CompanyGroup;
import com.mintpot.carcloth.entity.Member;
import com.mintpot.carcloth.projection.admin.MemberView;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface MemberRepository extends ExtendedRepository<Member, Long>, JpaSpecificationExecutor<Member> {

    @Query(value = "SELECT m FROM Member m " +
            "WHERE m.status = " + UserStatus.Constant.ACTIVATED_VALUE +
            " AND (:normal is null or (:normal is true and m.lastLoggedIn > :lastLoggedIn) or (:normal is false and m.lastLoggedIn < :lastLoggedIn))" +
            " AND (:companyMember is null or m.companyMember = :companyMember)" +
            " AND (:companyGroup is null or m.group = :companyGroup)" +
            " AND (:name is null or m.name like %:name%)" +
            " AND (:memberId is null or m.memberId like %:memberId%)" +
            " AND (:term is null or (m.name like %:term% or m.memberId like %:term%))")
    Page<MemberView> search(Boolean normal, Boolean companyMember, LocalDateTime lastLoggedIn,
                            CompanyGroup companyGroup, String name, String memberId, String term, Pageable pageable);

    @Query(value = "SELECT COUNT(*) FROM Member m " +
            "WHERE m.status = " + UserStatus.Constant.ACTIVATED_VALUE)
    int totalMembers();

    @Query(value = "SELECT COUNT(*) FROM Member m " +
            "WHERE m.status = " + UserStatus.Constant.ACTIVATED_VALUE +
            " AND IF(m.lastLoggedIn,DATE_FORMAT(m.lastLoggedIn, '%d-%m-%Y'),NULL) = :nowDay")
    int totalLogin(String nowDay);

    @Query("select u.id from User u left join u.snsInfo sns where u.status = " + UserStatus.Constant.ACTIVATED_VALUE
            + " and sns.snsId = :snsId and sns.type= :snsType")
    Optional<Long> getUserIdBySnsIdAndSnsType(@Param("snsId") String snsId, @Param("snsType") SNSType snsType);

    @Query("select count(m)>0 from Member m where m.phone = :phoneNo")
    Boolean exitByPhone(String phoneNo);
}
