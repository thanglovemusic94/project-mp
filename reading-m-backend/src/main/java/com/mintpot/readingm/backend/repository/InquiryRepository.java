package com.mintpot.readingm.backend.repository;

import com.mintpot.readingm.backend.dto.admin.AdInquiryView;
import com.mintpot.readingm.backend.entity.Inquiry;
import com.mintpot.readingm.backend.entity.Payment;
import com.mintpot.readingm.backend.entity.constant.InquiryStatus;
import com.mintpot.readingm.backend.entity.constant.InquiryType;
import com.mintpot.readingm.backend.user.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface InquiryRepository extends ExtendedRepository<Inquiry, Long>, JpaSpecificationExecutor<Inquiry> {

    @Query("select i from Inquiry i " +
            "where (:type is null or i.type = :type)" +
            " and (:role is null or i.questioner.role = :role)" +
            " and (:status is null or i.status = :status)" +
            " and (:inquiry is null or i.title like %:inquiry%)" +
            " and (:writer is null or i.questioner.name like %:writer%)" +
            " and (:term is null or ( i.questioner.name like %:term% or i.title like %:term%))")
    Page<AdInquiryView> search(InquiryType type, Role role, InquiryStatus status,
                               String inquiry, String writer, String term, Pageable page);

    Page<AdInquiryView> findByQuestioner_Id(long questionerId, Pageable page);
}
