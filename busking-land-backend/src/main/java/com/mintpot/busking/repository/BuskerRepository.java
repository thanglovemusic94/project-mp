package com.mintpot.busking.repository;

import com.mintpot.busking.constant.UserStatus;
import com.mintpot.busking.model.BuskerInfo;
import com.mintpot.busking.model.User;
import com.mintpot.busking.model.constant.BuskerStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface BuskerRepository extends CrudRepository<BuskerInfo, Integer> {

    @Query("from BuskerInfo bi where bi.user.id = :userId")
    @EntityGraph(attributePaths = {"favorites"}, type = EntityGraph.EntityGraphType.LOAD)
    Optional<BuskerInfo> getBuskerInfoByUser (int userId);

    @Query("select bi from BuskerInfo bi where (:keyword is null or bi.name like %:keyword%) " +
            "and (bi.status = " + BuskerStatus.Constant.ACTIVE +") " +
            "and (bi.user.status = " + UserStatus.Constant.ACTIVATED_VALUE +") " +
            " order by bi.id desc ")
    @EntityGraph(attributePaths = {"favorites", "user"}, type = EntityGraph.EntityGraphType.FETCH)
    Page<BuskerInfo> findAllBySearch(Pageable pageable, @Param("keyword") String keyword);

//    @Query("select bi from BuskerInfo bi where bi.status = " + BuskerStatus.Constant.ACTIVE +" and bi.id = :id")
//    @EntityGraph(attributePaths = {"favorites", "user"}, type = EntityGraph.EntityGraphType.FETCH)
//    Optional<BuskerInfo> findBuskerInfoById(Integer id);

    @Query("select bi from BuskerInfo bi where bi.status = " + BuskerStatus.Constant.ACTIVE +" and bi.id = :id order by bi.id desc")
    @EntityGraph(attributePaths = {"user"}, type = EntityGraph.EntityGraphType.FETCH)
    Optional<BuskerInfo> findBuskerInfoById(Integer id);

    @Query("select bi from BuskerInfo bi where bi.id = :id order by bi.id desc")
    @EntityGraph(attributePaths = {"user"}, type = EntityGraph.EntityGraphType.FETCH)
    Optional<BuskerInfo> findBuskerWithoutStatusById(Integer id);

    @Query("select bi from BuskerInfo bi where bi.status = " + BuskerStatus.Constant.IN_ACTIVE  +" order by bi.id desc ")
    @EntityGraph(attributePaths = {"favorites", "user"}, type = EntityGraph.EntityGraphType.FETCH)
    Page<BuskerInfo> findUserWaiting(Pageable pageable);



}
