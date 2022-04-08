package com.mintpot.readingm.backend.repository;

import com.mintpot.readingm.backend.dto.admin.AdTutorApplicationView;
import com.mintpot.readingm.backend.entity.Refund;
import com.mintpot.readingm.backend.entity.constant.ClassType;
import com.mintpot.readingm.backend.entity.constant.PaymentMethod;
import com.mintpot.readingm.backend.entity.constant.RefundStatus;
import com.mintpot.readingm.backend.entity.constant.TutorApplicationStatus;
import com.mintpot.readingm.backend.entity.tutorApplication.TutorApplication;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Set;

@Repository
public interface TutorApplicationRepository extends ExtendedRepository<TutorApplication, Long> {
    @Query("select t from TutorApplication t " +
        " where (:status is null or t.status = :status) " +
        "and (:tutorName is null or t.tutor.name like %:tutorName%) " +
        "and (:phone is null or t.tutor.phone like %:phone%) " +
        "and (:email is null or t.tutor.email like %:email%) " +
        "and (:query is null or ( t.tutor.name like %:query%" +
            "                         or t.tutor.memberId like %:query%" +
            "                         or t.tutor.phone like %:query%" +
            "                         or t.tutor.email like %:query%))")
    Page<AdTutorApplicationView> search(TutorApplicationStatus status, String tutorName, String phone,
                                        String email, String query, Pageable page);
}
