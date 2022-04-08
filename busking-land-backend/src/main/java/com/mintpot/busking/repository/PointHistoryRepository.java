package com.mintpot.busking.repository;

import com.mintpot.busking.model.PointHistory;
import com.mintpot.busking.model.constant.PointTransactionType;
import com.mintpot.busking.model.constant.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface PointHistoryRepository extends JpaRepository<PointHistory, Long> {

    @Query("SELECT ph FROM PointHistory ph JOIN ph.user c WHERE ph.createdOn >= :queryDate AND (:type is null OR" +
            " ph.type = :type) AND c.id = :userId AND ph.type <> com.mintpot.busking.model.constant.PointTransactionType.WITHDRAW_APPROVE ")
    Slice<PointHistory> findPersonalByTypeAndDate(@Param("userId") int userId,
                                                  @Nullable @Param("type") PointTransactionType type,
                                                  @Param("queryDate") Date queryDate,
                                                  Pageable page);

    @Query("SELECT ph FROM PointHistory ph JOIN ph.user c WHERE ph.createdOn >= :queryDate AND ph.type IN (:types) " +
            "AND c.id = :userId AND ph.type <> com.mintpot.busking.model.constant.PointTransactionType.WITHDRAW_APPROVE ")
    Slice<PointHistory> findPersonalByTypesAndDate(@Param("userId") int userId,
                                                  @Nullable @Param("types") List<PointTransactionType> types,
                                                  @Param("queryDate") Date queryDate,
                                                  Pageable page);


    @Query(nativeQuery = true, value = "(select SUM(ph.amount) from point_history ph WHERE ph.user_id = :userId " +
            "AND ph.created_on >= :queryDate AND (:type is null OR ph.type = :type)) UNION ALL (SELECT comp" +
            ".point_amount FROM user comp WHERE comp.id = :userId)")
    List<BigInteger> getAccumulatedAndTotalPoints(@Param("userId") int userId,
                                                  @Nullable @Param("type") PointTransactionType type,
                                                  @Param("queryDate") Date queryDate);

    @Query("select case when count(p) > 0 then true else false end from PointHistory p where p.transactionId = :transactionId ")
    boolean existsByTransactionId(String transactionId);


    @Query("from PointHistory ph where ph.pointHistoryId = :pointId")
    @EntityGraph(attributePaths = {"user"}, type = EntityGraph.EntityGraphType.LOAD)
    Optional<PointHistory> getPointHistoryById(long pointId);


    @Query("from PointHistory ph where ph.type = :type and ph.status = :status")
    @EntityGraph(attributePaths = {"user"}, type = EntityGraph.EntityGraphType.LOAD)
    List<PointHistory> findPointHistoryByTypeAndStatus(PointTransactionType type, Status status);


    @EntityGraph(attributePaths = {"user"}, type = EntityGraph.EntityGraphType.LOAD)
    Page<PointHistory> findAll(@Nullable Specification<PointHistory> spec, Pageable pageable);

    @EntityGraph(attributePaths = {"user"}, type = EntityGraph.EntityGraphType.LOAD)
    Optional<PointHistory> findByPointHistoryId(Long id);

    @Query("select count (p.pointHistoryId) from PointHistory p " +
            "where " +
            "p.status= " + Status.Constant.DEACTIVATED_VALUE
            + " and " +
            "p.type = "+PointTransactionType.Constant.WITHDRAW_REQUEST_VALUE + "")
    long exchangeCount();

}

