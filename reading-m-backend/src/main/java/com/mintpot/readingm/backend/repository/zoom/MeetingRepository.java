package com.mintpot.readingm.backend.repository.zoom;

import com.mintpot.readingm.backend.entity.zoom.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface MeetingRepository extends JpaRepository<Meeting, Long> {

    @Query(value = "select * from zoom_meeting where class_id = :classId order by created_at desc", nativeQuery = true)
    Optional<Meeting> findLastMeetingByClass(long classId);
}
