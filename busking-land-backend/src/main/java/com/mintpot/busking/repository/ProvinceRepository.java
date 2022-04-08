package com.mintpot.busking.repository;

import com.mintpot.busking.model.Busking;
import com.mintpot.busking.model.City;
import com.mintpot.busking.model.Province;
import org.springframework.data.jpa.repository.EntityGraph;
import com.mintpot.busking.model.constant.BuskingStatus;
import com.mintpot.busking.model.constant.Status;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface ProvinceRepository extends CrudRepository<Province, Integer> {

    @Query("from Province p where p.provinceName = :name")
    Optional<Province> findByName(String name);

    @Query("from Province p where p.provinceName like %:keySearch% and p.status = com.mintpot.busking.model.constant.Status.ACTIVATED ")
    List<Province> searchProvince(String keySearch);

    @Query("select p from Province p where p.status = " + Status.Constant.ACTIVATED_VALUE)
    @EntityGraph(attributePaths = {"cities"}, type = EntityGraph.EntityGraphType.FETCH)
    List<Province> getListProvince();

    @Query("select p from Province p " +
            "where p.provinceId = :id " +
            "and p.status = " + Status.Constant.ACTIVATED_VALUE )

    @EntityGraph(attributePaths = {"cities"}, type = EntityGraph.EntityGraphType.FETCH)
    Optional<Province> findById(Integer id);
}
