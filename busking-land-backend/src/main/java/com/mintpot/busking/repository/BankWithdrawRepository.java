package com.mintpot.busking.repository;

import com.mintpot.busking.model.BankWithdraw;
import com.mintpot.busking.model.PointHistory;
import com.mintpot.busking.model.constant.PointTransactionType;
import com.mintpot.busking.model.constant.Status;
import org.checkerframework.checker.nullness.Opt;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.Nullable;
import org.w3c.dom.stylesheets.LinkStyle;

import java.util.List;
import java.util.Optional;

public interface BankWithdrawRepository extends JpaRepository<BankWithdraw, Integer> , JpaSpecificationExecutor<BankWithdraw> {

    @Query(value = "from BankWithdraw bw where bw.user.id = :userId order by bw.id DESC")
    List<BankWithdraw> getBankByUser (int userId);

    @Query("from BankWithdraw bw " +
            "left join PointHistory ph on ph.pointHistoryId = bw.pointHistory.pointHistoryId " +
            "left join User u on u.id = bw.user.id " +
            " where ph.type = :type and ph.status = :status")
    List<BankWithdraw> getBankByPointHistoryStatus (PointTransactionType type, Status status);

    @EntityGraph(attributePaths = {"user", "pointHistory"}, type = EntityGraph.EntityGraphType.FETCH)
    Page<BankWithdraw> findAll(@Nullable Specification<BankWithdraw> spec, Pageable pageable);

    @EntityGraph(attributePaths = {"user", "pointHistory"}, type = EntityGraph.EntityGraphType.FETCH)
    Optional<BankWithdraw> findById(Long id);

    @EntityGraph(attributePaths = {"user", "pointHistory"}, type = EntityGraph.EntityGraphType.FETCH)
    List<BankWithdraw> findAll();

    @Query(value = "from BankWithdraw bw where bw.user.id = :user_id order by bw.id DESC")
    @EntityGraph(attributePaths = {"pointHistory"}, type = EntityGraph.EntityGraphType.FETCH)
    Page<BankWithdraw> findAllByBuskerId(Pageable pageable, Integer user_id);

    @Query(value = "from BankWithdraw bw where bw.pointHistory.pointHistoryId = :pointId")
    Optional<BankWithdraw> findByPointHistoryId (Long pointId);


    @Query("from BankWithdraw bw left join PointHistory ph on bw.pointHistory.pointHistoryId = ph.pointHistoryId " +
            "where ph.type = com.mintpot.busking.model.constant.PointTransactionType.WITHDRAW_APPROVE")
    @EntityGraph(attributePaths = {"user", "pointHistory"}, type = EntityGraph.EntityGraphType.FETCH)
    List<BankWithdraw> findAllCompletedWithdraw ();

}
