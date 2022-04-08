package com.mintpot.readingm.backend.repository;

import com.mintpot.readingm.backend.entity.clazz.ClassCart;
import com.mintpot.readingm.backend.entity.id.UserClassId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Set;

public interface ClassCartRepository extends JpaRepository<ClassCart, UserClassId> {

    @Query("select cart.classInfo.id from ClassCart cart where cart.id.userId = :buyerId")
    List<Long> getClassIdByBuyer(long buyerId);

    @Query("select c from ClassCart c where c.id.userId IN (:userIds)")
    Page<ClassCart> findByListUserId(Set<Long> userIds, Pageable page);

    @Query("select c from ClassCart c where c.id.userId = :userIds")
    Page<ClassCart> findByUserId(Long userIds, Pageable page);
}
