package com.mintpot.readingm.backend.service;

import com.mintpot.readingm.backend.constant.StudentGradeRange;
import com.mintpot.readingm.backend.dto.clazz.SearchClassDto;
import com.mintpot.readingm.backend.dto.admin.AdClassView;
import com.mintpot.readingm.backend.dto.clazz.ClassSelectionView;
import com.mintpot.readingm.backend.entity.clazz.Class;
import com.mintpot.readingm.backend.entity.clazz.GoalClass;
import com.mintpot.readingm.backend.entity.clazz.LiveClass;
import com.mintpot.readingm.backend.entity.clazz.TextBookClass;
import com.mintpot.readingm.backend.entity.constant.GoalClassCategory;
import com.mintpot.readingm.backend.entity.constant.SchoolGrade;
import com.mintpot.readingm.backend.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Log4j2
@RequiredArgsConstructor
public class ClassServiceImpl implements ClassService {

    private final ClassRepository classRepo;

    private final LiveClassRepository liveClassRepo;

    private final LiveClassService liveClassService;

    private final ClassConsultationRepository classConsultationRepo;

    private final GoalClassRepository goalClassRepository;

    private final TextBookClassRepository textBookClassRepository;

    private final ClassReviewRepository classReviewRepo;

    private final ModelMapper mapper;

    @Override
    public Page<AdClassView> findBySpec(Specification<Class> spec, Pageable page) {
        return classRepo.find(spec, page, AdClassView.class);
    }

    @Override
    public Page<SearchClassDto> findTextBookClass(String tutorName, LocalDateTime startTime,
                                                   StudentGradeRange gradeRange, Pageable page) {
        SchoolGrade fromGrade = null;
        SchoolGrade toGrade = null;

        if (gradeRange != null) {
            switch (gradeRange) {
                case ONE_TO_THREE:
                    fromGrade = SchoolGrade.G1;
                    toGrade = SchoolGrade.G3;
                    break;

                case FOUR_TO_SIX:
                    fromGrade = SchoolGrade.G4;
                    toGrade = SchoolGrade.G6;
                    break;

                case SEVEN_TO_NINE:
                    fromGrade = SchoolGrade.G7;
                    toGrade = SchoolGrade.G9;
                    break;
                default:

            }
        }

        Page<TextBookClass> classPage;
        if (startTime != null) {
            classPage = textBookClassRepository.findByTime(tutorName, fromGrade, toGrade, startTime, page);
        } else {
            classPage = textBookClassRepository.find(tutorName, fromGrade, toGrade, page);
        }
        return classPage.map(this::liveClassToSearchDto);
    }

    @Override
    public Page<SearchClassDto> findGoalClass(String tutorName, LocalDateTime startTime,
                                               GoalClassCategory goalClassCategory, Pageable page) {

        Page<GoalClass> classPage;
        if (startTime != null) {
            classPage = goalClassRepository.findByTime(tutorName, goalClassCategory, startTime, page);
        } else {
            classPage = goalClassRepository.find(tutorName, goalClassCategory, page);
        }
        return classPage.map(this::liveClassToSearchDto);
    }

    @Override
    public List<ClassSelectionView> getLiveClassByStudentId(long studentId) {
        return liveClassRepo.findByStudentId(studentId).stream()
                .map(this::classToSelectionView)
                .collect(Collectors.toList());
    }

    @Override
    public List<ClassSelectionView> getClassSelectionByTutorId(long tutorId) {
        return liveClassRepo.findByTutor_Id(tutorId).stream()
                .map(this::classToSelectionView)
                .collect(Collectors.toList());
    }

    @Override
    public Double getAverageRating(long classId) {
        var rate = classReviewRepo.getRateByClass(classId);
        return rate.map(r -> Double.valueOf(String.format("%.1f", r))).orElse(null);
    }

    private SearchClassDto liveClassToSearchDto(LiveClass liveClass) {
        SearchClassDto dto = mapper.map(liveClass, SearchClassDto.class);
        dto.setRating(getAverageRating(liveClass.getId()));
        dto.setClosed(liveClassService.hasFull(liveClass.getId()));
        return dto;
    }

    private ClassSelectionView classToSelectionView(Class classInfo) {
        var classView = mapper.map(classInfo, ClassSelectionView.class);
        var consultations = classConsultationRepo.findByClassInfo(classInfo);
        if (classInfo instanceof LiveClass) {
            if (((LiveClass) classInfo).hasEnded()) {
                classView.setDisable(true);
            }
        }

        if (consultations != null && consultations.size() > 0) {
            classView.setDisable(true);
        }
        return classView;
    }
}
