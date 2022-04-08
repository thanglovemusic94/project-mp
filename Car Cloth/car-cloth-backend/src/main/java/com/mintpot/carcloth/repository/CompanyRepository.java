package com.mintpot.carcloth.repository;

import com.mintpot.carcloth.constant.enums.EActivateStatus;
import com.mintpot.carcloth.constant.enums.ERegistrationStatus;
import com.mintpot.carcloth.entity.Company;
import com.mintpot.carcloth.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {

    @Query("SELECT c FROM Company c " +
            "WHERE c.activate = " + EActivateStatus.Constant.ACTIVATE +
            " and c.processingStatus = " + ERegistrationStatus.Constant.APPROVE +
            " and (:companyName is null or c.companyName like %:companyName%) " +
            " and (:companyId is null or c.companyId like %:companyId%) " +
            " and (:term is null or ( c.companyName like %:term%" +
            "   or c.companyId like %:term%))")
    Page<Company> getCompaniesByPage(String companyName, String companyId, String term, Pageable page);

    @Query("SELECT c FROM Company c " +
            "WHERE c.activate = " + EActivateStatus.Constant.ACTIVATE +
            " and (c.processingStatus = " + ERegistrationStatus.Constant.APPROVE +
            "   and c.expiredDateTime is not null and c.expiredDateTime >= current_date)" +
            " and (:companyName is null or c.companyName like %:companyName%) " +
            " and (:companyId is null or c.companyId like %:companyId%) " +
            " and (:term is null or ( c.companyName like %:term%" +
            "   or c.companyId like %:term%))")
    Page<Company> getCompaniesUseByPage(String companyName, String companyId, String term, Pageable page);

    @Query("SELECT c FROM Company c " +
            "WHERE c.activate = " + EActivateStatus.Constant.ACTIVATE +
            " and (c.processingStatus = " + ERegistrationStatus.Constant.APPROVE +
            "   and (c.expiredDateTime is null or c.expiredDateTime < current_date))" +
            " and (:companyName is null or c.companyName like %:companyName%) " +
            " and (:companyId is null or c.companyId like %:companyId%) " +
            " and (:term is null or ( c.companyName like %:term%" +
            "   or c.companyId like %:term%))")
    Page<Company> getCompaniesUnusedByPage(String companyName, String companyId, String term, Pageable page);

    @Query("SELECT c FROM Company c " +
            "WHERE c.activate = " + EActivateStatus.Constant.ACTIVATE +
            " and (:processingStatus is null or c.processingStatus = :processingStatus)" +
            " and (:companyName is null or c.companyName like %:companyName%)" +
            " and (:applicantId is null or c.requestUser.memberId like %:applicantId%)" +
            " and (:term is null or ( c.companyName like %:term%" +
            "   or c.requestUser.memberId like %:term%))")
    Page<Company> getApplicantsByPage(ERegistrationStatus processingStatus, String companyName,
                                             String applicantId, String term, Pageable page);

    @Query("SELECT c FROM Company c " +
            "WHERE c.requestUser = :user" +
            " and c.activate = " + EActivateStatus.Constant.ACTIVATE +
            " and (:status is null or c.processingStatus = :status)")
    Optional<Company> getByUserAndStatus(User user, ERegistrationStatus status);

    @Query("SELECT c FROM Company c " +
            "WHERE c.activate = " + EActivateStatus.Constant.ACTIVATE +
            " and c.processingStatus = " + ERegistrationStatus.Constant.APPROVE)
    List<Company> getCompaniesSendRequest();
}
