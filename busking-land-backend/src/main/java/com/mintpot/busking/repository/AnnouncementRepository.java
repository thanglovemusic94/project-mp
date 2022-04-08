package com.mintpot.busking.repository;

import com.mintpot.busking.dto.SliceDto;
import com.mintpot.busking.model.Announcement;
import com.mintpot.busking.model.constant.Status;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import java.util.List;

public interface AnnouncementRepository extends JpaRepository<Announcement, Integer> {

    @Query(value = "SELECT a FROM Announcement a WHERE a.status = " + Status.Constant.ACTIVATED_VALUE + " ORDER BY a.createdOn DESC")
    Slice<Announcement> getAllActivated(Pageable pageable);

    @Query(value = "SELECT a FROM Announcement a WHERE a.status = " + Status.Constant.ACTIVATED_VALUE + " ORDER BY a.createdOn DESC")
    Page<Announcement> findAllActivated(Pageable pageable);

}
