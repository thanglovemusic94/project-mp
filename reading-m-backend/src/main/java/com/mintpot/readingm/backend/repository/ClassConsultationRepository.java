package com.mintpot.readingm.backend.repository;

import com.mintpot.readingm.backend.entity.clazz.Class;
import com.mintpot.readingm.backend.entity.clazz.ClassConsultation;
import com.mintpot.readingm.backend.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClassConsultationRepository extends JpaRepository<ClassConsultation, Long> {
    <T> Page<T> findByQuestioner_IdOrRespondent_Id(long questionerId, long respondentId, java.lang.Class<T> classType, Pageable page);

    List<ClassConsultation> findByClassInfo(Class classInfo);
}
