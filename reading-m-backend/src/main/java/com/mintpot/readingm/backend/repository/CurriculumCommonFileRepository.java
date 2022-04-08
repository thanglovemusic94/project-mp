package com.mintpot.readingm.backend.repository;

import com.mintpot.readingm.backend.entity.clazz.CurriculumCommonFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CurriculumCommonFileRepository extends JpaRepository<CurriculumCommonFile, Long> {

    Optional<CurriculumCommonFile> findByClassInfo_IdAndCurriculumIndex(Long classId, Integer curriculumIndex);
}
