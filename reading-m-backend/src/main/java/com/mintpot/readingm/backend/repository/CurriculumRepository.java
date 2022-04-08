package com.mintpot.readingm.backend.repository;

import com.mintpot.readingm.api.rams.book.Grade;
import com.mintpot.readingm.api.rams.book.School;
import com.mintpot.readingm.backend.entity.Curriculum;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CurriculumRepository extends ExtendedRepository<Curriculum, String> {

    @Query("select c from Curriculum c where (:cClass is null or c.cClass = :cClass) " +
            " and (:cGrade is null or c.cGrade = :cGrade)")
    List<Curriculum> findByCClassAndCGrade(School cClass, Grade cGrade);
}
