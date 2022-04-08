package com.mintpot.carcloth.repository;

import com.mintpot.carcloth.entity.car.Brand;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Long> {

    @Query("SELECT b FROM Brand b " +
            "WHERE b.deleteFlg = false" +
            " and (:categoryId is null or b.category.id = :categoryId)" +
            " and (:term is null or b.brandName like %:term%)")
    Page<Brand> getBrandByPage(Long categoryId, String term, Pageable page);

    @Query("SELECT b FROM Brand b " +
            "WHERE b.deleteFlg = false AND lower(b.brandName) = :brandName")
    Optional<Brand> findByBrandName(String brandName);

    @Modifying
    @Transactional
    @Query("UPDATE Brand b SET b.deleteFlg = true WHERE b.id = :id")
    void delete(long id);
}
