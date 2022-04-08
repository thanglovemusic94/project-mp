package com.mintpot.carcloth.dto.admin;

import com.mintpot.carcloth.constant.NotificationType;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class AdNotificationList {

    private long id;

    private NotificationType type;

    private String title;

    private String content;

    private LocalDateTime createdOn;
}