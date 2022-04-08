package com.mintpot.readingm.backend.service;

import com.mintpot.readingm.backend.constant.StudentGradeRange;
import com.mintpot.readingm.backend.dto.clazz.SearchClassDto;
import com.mintpot.readingm.backend.dto.admin.AdClassView;
import com.mintpot.readingm.backend.dto.clazz.ClassSelectionView;
import com.mintpot.readingm.backend.entity.clazz.Class;
import com.mintpot.readingm.backend.entity.constant.GoalClassCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDateTime;
import java.util.List;

public interface ClassService {

    Page<AdClassView> findBySpec(Specification<Class> spec, Pageable page);

    Page<SearchClassDto> findTextBookClass(String tutorName, LocalDateTime startTime, StudentGradeRange gradeRange, Pageable page);

    Page<SearchClassDto> findGoalClass(String tutorName, LocalDateTime startTime, GoalClassCategory goalClassCategory, Pageable page);

    List<ClassSelectionView> getLiveClassByStudentId(long studentId);

    List<ClassSelectionView> getClassSelectionByTutorId(long tutorId);

    Double getAverageRating(long classId);

}
