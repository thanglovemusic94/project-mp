package com.mintpot.carcloth.repository;

import com.mintpot.carcloth.constant.NotificationType;
import com.mintpot.carcloth.entity.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    @Query("select n from Notification n where (:type is null or n.type = :type) and " +
            "(:term is null or n.title like %:term%)")
    Page<Notification> find(NotificationType type, String term, Pageable page);

    @Query("select n from Notification n where (:type is null or n.type <> :type) and " +
            "(:term is null or n.title like %:term%)")
    Page<Notification> findExcludeType(NotificationType type, String term, Pageable page);

    //TODO
    @Query("select n from Notification n order by n.createdOn DESC")
    Page<Notification> getMyPageNotifications(Pageable pageable);

    //TODO
    @Query("select n from Notification n order by n.createdOn DESC")
    List<Notification> getCompanyNotifications();
}