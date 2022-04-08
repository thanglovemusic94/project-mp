package com.mintpot.carcloth.service.impl;

import com.mintpot.carcloth.constant.NotificationType;
import com.mintpot.carcloth.dto.NotificationDetail;
import com.mintpot.carcloth.dto.NotificationList;
import com.mintpot.carcloth.exception.CommonException;
import com.mintpot.carcloth.exception.ErrorCode;
import com.mintpot.carcloth.repository.NotificationRepository;
import com.mintpot.carcloth.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepo;
    private final ModelMapper mapper;

    @Override
    public Page<NotificationList> getMyPageNotifications(Pageable pageable) {
        return notificationRepo.find(NotificationType.GENERAL, null, pageable)
                .map(n -> mapper.map(n, NotificationList.class));
    }

    @Override
    public Page<NotificationList> getCompanyNotifications(Pageable pageable) {

        return notificationRepo.find(NotificationType.COMPANY, null, pageable)
                .map(n -> mapper.map(n, NotificationList.class));
    }

    @Override
    public NotificationDetail getNotificationDetail(long id) {
        var notification = notificationRepo.findById(id)
                .orElseThrow(() -> new CommonException(ErrorCode.NOTIFICATION_NOT_FOUND));

        return mapper.map(notification, NotificationDetail.class);
    }
}
