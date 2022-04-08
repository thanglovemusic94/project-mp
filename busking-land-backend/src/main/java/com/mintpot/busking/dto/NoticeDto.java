package com.mintpot.busking.dto;

import com.mintpot.busking.model.constant.NotificationType;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class NoticeDto {
    @ApiModelProperty(hidden = true)
    private NotificationType notiType;

    private String fcmToken;

    private String content;

    private String title;
}
