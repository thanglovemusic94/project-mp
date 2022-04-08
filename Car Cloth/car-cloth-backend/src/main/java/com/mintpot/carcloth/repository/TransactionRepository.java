package com.mintpot.carcloth.repository;

import com.mintpot.carcloth.constant.TransactionStatus;
import com.mintpot.carcloth.dto.quote.TransactionList;
import com.mintpot.carcloth.entity.transaction.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    @Query("select t from Transaction t where (:status is null or t.status = :status)" +
            "and (:id is null or t.id = :id) " +
            "and (:memberId is null or requester.memberId like %:memberId%)")
    Page<Transaction> find(TransactionStatus status, Long id, String memberId, Pageable page);

    @Query(value = "SELECT COUNT(t.id) FROM Transaction t " +
            "WHERE t.status = :status")
    int totalTransactionByStatus(TransactionStatus status);

    @Query(value = "SELECT t.id, t.type, t.status, t.desired_date as desiredDate," +
            " t.reservation_date as reservationDate, t.complete_date as completeDate " +
            "FROM transaction t " +
            "WHERE t.user_id = :memberId",
            countQuery = "SELECT t.id FROM transaction t WHERE t.user_id = :memberId",
            nativeQuery = true)
    Page<TransactionList> getAllByMember(long memberId, Pageable pageable);

    @Query(value = "SELECT t FROM Transaction t " +
            "WHERE t.id = :id AND t.requester.id = :memberId")
    Optional<Transaction> getByIdAndRequestedUser(long id, long memberId);

}
