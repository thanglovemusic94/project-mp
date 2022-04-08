package com.mintpot.readingm.backend.repository;

import com.mintpot.readingm.backend.entity.clazz.DavinciLog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface DavinciLogRepository extends JpaRepository<DavinciLog, Long> {

    @Query("select d.id as id, d.lectureTitle as lectureTitle," +
            " d.lectureName as lectureName, d.createdOn as createdOn, " +
            " d.ip as ip, u.name as studentName from DavinciLog d " +
            " join User u on d.studentId = u.id where" +
            " (:startTime is null or d.createdOn >= :startTime) " +
            " and (:endTime is null or d.createdOn <= :endTime)" +
            " and (:courseName is null or d.lectureName like %:courseName%)" +
            " and (:courseTitle is null or d.lectureTitle like %:courseTitle%)" +
            " and (:courseName is null or d.lectureName like %:courseName%)" +
            " and (:targetStudent is null or u.name like %:targetStudent%)" +
            " and (:id is null or d.id like %:id%)" +
            " and (:term is null or d.lectureTitle like %:term%" +
            " or d.lectureName like %:term%" +
            " or d.id like %:id%" +
            " or u.name like %:term%)")
    <T> Page<T> find(LocalDateTime startTime, LocalDateTime endTime, String courseName, String courseTitle,
                     String targetStudent, String id, String term, Pageable page, Class<T> resultType);
}
