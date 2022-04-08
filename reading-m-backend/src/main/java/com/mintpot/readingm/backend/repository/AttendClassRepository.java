package com.mintpot.readingm.backend.repository;


import com.mintpot.readingm.backend.entity.clazz.LiveClass;
import com.mintpot.readingm.backend.entity.settlement.AttendClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;


public interface AttendClassRepository extends JpaRepository<AttendClass, Long> {

    @Query("select a from AttendClass a where a.liveClass.id = :classId and a.startTime >= :startTime " +
            "and a.startTime <= :endTime")
    List<AttendClass> findByClassAndTime(long classId, LocalDateTime startTime, LocalDateTime endTime);

    List<AttendClass> findByLiveClass(LiveClass liveClass);

    @Query("select a from AttendClass a where a.liveClass.id = :classId and a.participant.id = :userId")
    List<AttendClass> findByClassIdAndUserId(long classId, long userId);
}
