package com.mintpot.carcloth.repository;

import com.mintpot.carcloth.constant.ShowStatus;
import com.mintpot.carcloth.entity.Company;
import com.mintpot.carcloth.entity.CompanyQuote;
import com.mintpot.carcloth.entity.ConstructionReview;
import com.mintpot.carcloth.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ConstructionReviewRepository extends JpaRepository<ConstructionReview, Long> {

    @Query("select r from ConstructionReview r where (:status is null or r.status = :status)" +
            " and (:companyName is null or r.company.companyName like %:companyName%) " +
            " and (:writerId is null or r.writer.memberId like %:writerId%)" +
            " and (:writerName is null or r.writer.name like %:writerName%)")
    Page<ConstructionReview> findAdReviewList(ShowStatus status, String companyName, String writerId, String writerName, Pageable page);

//    Optional<ConstructionReview> findByWriter_IdAndQuotation_Id(long writerId, long quotationId);

    Page<ConstructionReview> findByCompany_Id(long companyId, Pageable page);

    Optional<ConstructionReview> findByQuotation(CompanyQuote quotation);
}