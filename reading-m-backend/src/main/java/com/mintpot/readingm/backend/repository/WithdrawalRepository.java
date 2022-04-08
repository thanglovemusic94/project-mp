package com.mintpot.readingm.backend.repository;

import com.mintpot.readingm.backend.entity.Withdrawal;
import com.mintpot.readingm.backend.user.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface WithdrawalRepository extends JpaRepository<Withdrawal, Long> {
    @Query("select w from Withdrawal w " +
        "where (:memberType is null or w.withdrawalPerson.role = :memberType)" +
        "  and (:userName is null or w.withdrawalPerson.name like %:userName%)" +
        "  and (:reason is null or w.reason like %:reason%)" +
        "  and (:term is null or w.withdrawalPerson.name like %:term% or w.reason like %:term%)")
    Page<Withdrawal> findByTerm(Role memberType, String userName, String reason, String term, Pageable page);
}
