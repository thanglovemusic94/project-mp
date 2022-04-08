package com.mintpot.readingm.backend.repository;

import com.mintpot.readingm.backend.dto.clazz.LiveTextBookCurriculumView;
import com.mintpot.readingm.backend.dto.clazz.LiveTextBookCurriculumsView;
import com.mintpot.readingm.backend.entity.clazz.TextBookClass;
import com.mintpot.readingm.backend.entity.constant.SchoolGrade;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface TextBookClassRepository extends JpaRepository<TextBookClass, Long> {

    @Query("select t from TextBookClass t " +
            "where (:fromGrade is null or t.targetStudentGrade >= :fromGrade) " +
            "and (:toGrade is null or t.targetStudentGrade <= :toGrade)" +
            "and (:tutorName is null or t.tutor.name = :tutorName) " +
            "order by t.openDate desc")
    Page<TextBookClass> find(String tutorName, SchoolGrade fromGrade, SchoolGrade toGrade, Pageable page);

    @Query("select t from TextBookClass t join t.curriculum c " +
            "where (:fromGrade is null or t.targetStudentGrade >= :fromGrade) " +
            "and (:toGrade is null or t.targetStudentGrade <= :toGrade)" +
            "and (:tutorName is null or t.tutor.name = :tutorName) " +
            "and :startTime = c.start " +
            "order by t.openDate desc")
    Page<TextBookClass> findByTime(String tutorName, SchoolGrade fromGrade, SchoolGrade toGrade,
                             LocalDateTime startTime, Pageable page);

    Page<TextBookClass> findByTutor_Id(long tutorId, Pageable page);

    @Query("select t from TextBookClass t where t.tutor.id = :tutorId and t.openDate < current_date()")
    Page<TextBookClass> findConductedByTutor(long tutorId, Pageable page);

    @Query(value =
        "select c.id as classId, c.name as className, c.type as classType, u.name as tutorName," +
        "  tu.profile_image_url as tutorImage, tbc.curriculum_index as curIndex, tbc.material," +
        "  tbc.content, tbc.notification, b.title as bookName, b.idx as bookId, b.week as bookWeek," +
        "  b.activitypapers1 as activity1, b.activitypapers2 as activity2, " +
        "  b.activitypapert1 as activityPaperT1, b.activitypapert2 as activityPaperT2, " +
        "  c.target_student_grade as targetStudentGrade, tbc.start, tbc.end," +
        "  ccf.files as cmAttachFiles, caf.files as attachFiles, mcaf.files as myAttachFiles  " +
        "from text_book_class_curriculum tbc " +
        "join class c on c.id = tbc.text_book_class_id " +
        "join user u on u.id = c.tutor_id " +
        "join user_tutor tu on tu.id = c.tutor_id " +
        "left join book b on b.idx = tbc.book_id " +
        "left join curriculum_common_file ccf on ccf.curriculum_index = :curriculumIndex and ccf.class_id = :classId " +
        "left join curriculum_attach_file caf on  caf.curriculum_index = :curriculumIndex " +
        "  and caf.class_id = :classId and caf.recipient_id = :studentId " +
        "left join curriculum_attach_file mcaf on  mcaf.curriculum_index = :curriculumIndex " +
        "  and mcaf.class_id = :classId and mcaf.sender_id = :studentId " +
        "where tbc.text_book_class_id = :classId and tbc.curriculum_index = :curriculumIndex", nativeQuery = true)
    Optional<LiveTextBookCurriculumView> findBookClassCurriculum(Long classId, int curriculumIndex, Long studentId);

    @Query(value =
        "select  tbc.curriculum_index as curriculumIndex, ac.is_present as present," +
        "  b.title as classBook, b.writer, b.publisher, tbc.start, tbc.end, " +
        "  b.activitypapers1 as activity1, b.activitypapers2 as activity2, " +
        "  b.activitypapert1 as activityPaperT1, b.activitypapert2 as activityPaperT2 " +
        "from text_book_class_curriculum tbc " +
        "left join attend_class  ac on ac.participant_id = :userId" +
        "  and ac.class_id = :classId" +
        "  and tbc.curriculum_index = ac.lesson_index " +
        "left join book b on b.idx = tbc .book_id " +
        "where tbc.text_book_class_id = :classId " +
        "order by tbc.curriculum_index asc", nativeQuery = true)
    List<LiveTextBookCurriculumsView> findAttended(Long classId, Long userId);
}

