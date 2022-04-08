package com.mintpot.carcloth.repository;

import com.mintpot.carcloth.entity.car.Brand;
import com.mintpot.carcloth.entity.car.Model;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ModelRepository extends JpaRepository<Model, Long> {

    @Query("SELECT m FROM  Model m " +
            "WHERE m.modelBrand.id = :brandId")
    List<Model> getAllModelByBrandId(long brandId);

    @Query("SELECT m FROM  Model m " +
            "WHERE m.modelBrand.id = :brandId")
    Page<Model> getAllModelByBrandId(long brandId, Pageable pageable);

    @Query("SELECT m FROM  Model m " +
            "WHERE m.modelName like %:term%")
    Page<Model> searchLikeByName(String term, Pageable pageable);

    @Query("SELECT m FROM  Model m " +
            "WHERE m.modelBrand = :brand AND lower(m.modelName) = :modelName")
    Optional<Model> findByBrandAndModelName(Brand brand, String modelName);
}
