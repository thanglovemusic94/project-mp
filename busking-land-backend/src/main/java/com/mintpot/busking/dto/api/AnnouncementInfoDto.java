package com.mintpot.busking.dto.api;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.mintpot.busking.model.constant.Status;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
public class AnnouncementInfoDto {

    private String title;

    private String content;

    private Status status;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private Timestamp createdOn;

}
