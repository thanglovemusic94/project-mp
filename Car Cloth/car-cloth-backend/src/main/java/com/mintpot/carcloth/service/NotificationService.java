package com.mintpot.carcloth.service;

import com.mintpot.carcloth.dto.NotificationDetail;
import com.mintpot.carcloth.dto.NotificationList;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface NotificationService {

    Page<NotificationList> getMyPageNotifications(Pageable pageable);

    Page<NotificationList> getCompanyNotifications(Pageable pageable);

    NotificationDetail getNotificationDetail(long id);
}
