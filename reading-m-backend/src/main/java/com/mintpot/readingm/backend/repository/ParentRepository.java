package com.mintpot.readingm.backend.repository;

import com.mintpot.readingm.backend.entity.user.Parent;
import com.mintpot.readingm.backend.user.UserStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface ParentRepository extends JpaRepository<Parent, Long> {

    @Query(value = "select parent from Parent parent where (" +
            ":signupFrom is null or parent.createdOn >= :signupFrom) and (" +
            ":signupTo is null or parent.createdOn <= :signupTo) and (" +
            ":term is null or parent.memberId like %:term% or parent.name like %:term% or " +
            "parent.phone like %:term% or parent.email like %:term%)")
    Page<Parent> getMemberList(Date signupFrom, Date signupTo, String term, Pageable page);

    List<Parent> findByChildren_Classes_Id(long classId);

    @Query(value = "select p from Parent p where :status is null or p.status = :status")
    List<Parent> findAllByStatus(UserStatus status);
}
