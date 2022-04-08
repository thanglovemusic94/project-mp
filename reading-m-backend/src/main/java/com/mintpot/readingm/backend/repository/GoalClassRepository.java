package com.mintpot.readingm.backend.repository;

import com.mintpot.readingm.backend.dto.clazz.LiveGoalCurriculumsView;
import com.mintpot.readingm.backend.dto.clazz.LiveGoalCurriculumView;
import com.mintpot.readingm.backend.entity.clazz.GoalClass;
import com.mintpot.readingm.backend.entity.constant.GoalClassCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface GoalClassRepository extends JpaRepository<GoalClass, Long> {

    @Query("select c from GoalClass c where (:tutorName is null or c.tutor.name = :tutorName) " +
            "and (:category is null or c.category = :category) " +
            "order by c.openDate desc")
    Page<GoalClass> find(String tutorName, GoalClassCategory category, Pageable page);

    @Query("select gc from GoalClass gc join gc.curriculum curr " +
            "where (:tutorName is null or gc.tutor.name = :tutorName) " +
            "and (:category is null or gc.category = :category) " +
            "and curr.start = :startTime " +
            "order by gc.openDate")
    Page<GoalClass> findByTime(String tutorName, GoalClassCategory category,
                         LocalDateTime startTime, Pageable page);

    @Query(value =
        "select  gcc.name, gcc.start, gcc.end, gcc.curriculum_index as curriculumIndex, ac.is_present as present " +
        "from goal_class_curriculum gcc " +
        "left join attend_class  ac " +
        "  on ac.participant_id = :userId " +
        "    and ac.class_id = :classId " +
        "    and gcc.curriculum_index = ac.lesson_index " +
        "where gcc.goal_class_id = :classId " +
        "order by gcc.curriculum_index asc", nativeQuery = true)
    List<LiveGoalCurriculumsView> findAttended(Long classId, Long userId);

    @Query(value =
        "select  c.id as classId, c.category as classCategory, c.name as className, c.type as classType, " +
        "  u.name as tutorName, tu.profile_image_url as tutorImage, " +
        "  gcc.curriculum_index as curIndex, gcc.name as curName, gcc.start, gcc.end, gcc.material, " +
        "  gcc.content, gcc.notification, ccf.files as cmAttachFiles, caf.files as attachFiles,  mcaf.files as myAttachFiles " +
        "from goal_class_curriculum gcc " +
        "join class  c " +
        "  on c.id = gcc.goal_class_id " +
        "join user u " +
        "  on u.id = c.tutor_id " +
        "join user_tutor tu " +
        "  on tu.id = c.tutor_id " +
        "left join curriculum_common_file ccf " +
        "  on ccf.curriculum_index = :curriculumIndex and ccf.class_id = :classId " +
        "left join curriculum_attach_file caf " +
        "  on caf.curriculum_index = :curriculumIndex and caf.class_id = :classId and caf.recipient_id = :studentId " +
        "left join curriculum_attach_file mcaf " +
        "  on mcaf.curriculum_index = :curriculumIndex and mcaf.class_id = :classId and mcaf.sender_id = :studentId " +
        "where gcc.goal_class_id = :classId " +
        "  and gcc.curriculum_index = :curriculumIndex", nativeQuery = true)
    Optional<LiveGoalCurriculumView> findGoalClassCurriculum(Long classId, int curriculumIndex, Long studentId);

}
