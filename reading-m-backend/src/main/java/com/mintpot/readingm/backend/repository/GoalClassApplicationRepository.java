package com.mintpot.readingm.backend.repository;

import com.mintpot.readingm.backend.entity.clazz.GoalClassApplication;
import com.mintpot.readingm.backend.entity.constant.GoalClassCategory;
import com.mintpot.readingm.backend.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface GoalClassApplicationRepository extends JpaRepository<GoalClassApplication, Long> {
    @Query("select g from GoalClassApplication g where :category is null or g.category = :category")
    <T> Page<T> findByCategory(GoalClassCategory category, Pageable page, Class<T> classType);

    <T> Page<T> findByApplicant_Id(long userId, Pageable page, Class<T> classType);
}
