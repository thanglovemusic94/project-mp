package com.mintpot.readingm.backend.repository;

import com.mintpot.readingm.backend.dto.admin.VideoInPayView;
import com.mintpot.readingm.backend.entity.VideoInPay;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VideoInPayRepository extends ExtendedRepository<VideoInPay, Long> {
    Page<VideoInPayView> findByPayment_Children_IdAndPayment_ClassInformation_Id(long childrenId, long classId, Pageable page);
    List<VideoInPay> getAllByPayment_Children_IdAndPayment_ClassInformation_Id(long childrenId, long classId);

    @Query(value = "update VideoInPay v set v.viewedAt=v.time where id= :id")
    @Modifying
    void updateViewed(long id);

    @Query(value = "update VideoInPay v set v.viewedAt= :viewAt where id= :id")
    @Modifying
    void updateViewedAt(long id, long viewAt);

}
