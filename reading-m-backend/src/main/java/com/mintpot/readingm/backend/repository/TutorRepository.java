package com.mintpot.readingm.backend.repository;

import com.mintpot.readingm.backend.entity.constant.TutorType;
import com.mintpot.readingm.backend.entity.user.Tutor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public interface TutorRepository extends JpaRepository<Tutor, Long> {

    @Query(value = "select tutor From Tutor tutor where (" +
            ":signupFrom is null or tutor.createdOn >= :signupFrom) and (" +
            ":signupTo is null or tutor.createdOn <= :signupTo) and (" +
            ":term is null or tutor.memberId like %:term% or tutor.name like %:term% or " +
            "tutor.phone like %:term% or tutor.email like %:term%) " +
            "and (:tutorType is null or (tutor.tutorType = :tutorType " +
            "or tutor.tutorType = " + TutorType.Constant.ALL_VALUE + "))")
    Page<Tutor> getMemberList(TutorType tutorType, Date signupFrom, Date signupTo, String term, Pageable page);
}
