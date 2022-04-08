package com.mintpot.readingm.backend.repository;

import com.mintpot.readingm.backend.dto.clazz.DavinciCourseView;
import com.mintpot.readingm.backend.entity.Enrollment;
import com.mintpot.readingm.backend.entity.clazz.Class;
import com.mintpot.readingm.backend.entity.clazz.Course;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EnrollmentRepository extends ExtendedRepository<Enrollment, Long>, JpaSpecificationExecutor<Enrollment> {

    @Query("select e from Enrollment e where e.vodClass.id = :classId and e.student.id = :studentId")
    List<Enrollment> findByClassIdAndStudentId(long classId, long studentId);

    @Query("select e from Enrollment e where e.courseIndex = :courseIndex and e.vodClass.id = :classId " +
        "and e.student.id = :studentId")
    Optional<Enrollment> findOne(int courseIndex, long classId, long studentId);

    @Query(value =
        "select e.course_index as courseIndex,  class.materials as materials, class.grade as grade," +
        "  video.name as courseName, video.video_url as urlVideo, video.time, e.status, e.payment_date as paymentDate " +
        "from enrollment e " +
        "join vod_class_videos video on video.vod_class_id = e.class_id and video.video_index = e.course_index " +
        "join class class on e.class_id = class.id " +
        "where e.student_id = :studentId and class.id = :classId",
        countQuery = "select count(id) FROM enrollment e " +
                "join vod_class_courses video on video.vod_class_id = e.class_id " +
                "and video.course_index = e.course_index " +
                "join class class on e.class_id = class.id" +
                " where e.student_id = :studentId and class.id = :classId",
        nativeQuery = true)
    Page<DavinciCourseView> findCoursesByClassIdAndStudentId(long classId, long studentId, Pageable page);


}