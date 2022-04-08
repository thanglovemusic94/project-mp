package com.mintpot.readingm.backend.repository;

import com.mintpot.readingm.backend.dto.admin.AdFaqView;
import com.mintpot.readingm.backend.entity.Faq;
import com.mintpot.readingm.backend.entity.Refund;
import com.mintpot.readingm.backend.entity.constant.ClassType;
import com.mintpot.readingm.backend.entity.constant.InquiryStatus;
import com.mintpot.readingm.backend.entity.constant.PaymentMethod;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Set;

@Repository
public interface FaqRepository extends ExtendedRepository<Faq, Long>, JpaSpecificationExecutor<Faq> {
    @Query("select f from Faq f " +
            "where (:question is null or f.question like %:question%)")
    Page<AdFaqView> search(String question, Pageable page);
}
