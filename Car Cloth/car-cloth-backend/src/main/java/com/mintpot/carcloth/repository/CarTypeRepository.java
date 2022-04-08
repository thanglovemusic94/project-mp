package com.mintpot.carcloth.repository;

import com.mintpot.carcloth.constant.enums.EProductType;
import com.mintpot.carcloth.entity.car.CarType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface CarTypeRepository extends JpaRepository<CarType, Long> {

    @Query("SELECT c FROM CarType c " +
            "WHERE c.deleteFlg = false" +
            " and (:productType is null or c.productType = :productType)" +
            " and (:modelId is null or (c.model is not null and c.model.id = :modelId))" +
            " and (:brandId is null or (c.brand is not null and c.brand.id = :brandId))")
    Page<CarType> getByPage(EProductType productType, Long brandId, Long modelId, Pageable pageable);

    @Query("SELECT c FROM CarType c " +
            "WHERE c.deleteFlg = false and c.id = :id" +
            " and (:type is null or c.productType = :type)")
    Page<CarType> getByIdAndProductType(Long id, EProductType type, Pageable pageable);

    @Modifying
    @Transactional
    @Query("UPDATE CarType c SET c.deleteFlg = true WHERE c.id = :id")
    void delete(long id);

    @Query("SELECT c FROM CarType c " +
            "WHERE c.deleteFlg = false and (c.model is not null and c.model.id = :modelId)")
    List<CarType> getByModelId(Long modelId);

    @Query("SELECT c FROM CarType c " +
            "WHERE c.deleteFlg = false and (c.model is not null and c.model.id = :modelId)")
    Page<CarType> getByModelId(Long modelId, Pageable pageable);
}
