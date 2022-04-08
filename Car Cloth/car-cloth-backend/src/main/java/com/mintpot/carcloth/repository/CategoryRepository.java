package com.mintpot.carcloth.repository;

import com.mintpot.carcloth.entity.car.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    @Query("SELECT c FROM Category c " +
            "WHERE c.deleteFlg = false " +
            "ORDER BY c.orderCategory")
    List<Category> getAll();

    @Query("SELECT c FROM Category c " +
            "WHERE c.deleteFlg = false AND lower(c.title) = :title")
    Optional<Category> findByTitle(String title);

    @Query("SELECT MAX(c.orderCategory) FROM Category c")
    int getMaxOrderCategory();

    @Modifying
    @Transactional
    @Query("UPDATE Category c SET c.deleteFlg = true WHERE c.id = :id")
    void delete(long id);
}
