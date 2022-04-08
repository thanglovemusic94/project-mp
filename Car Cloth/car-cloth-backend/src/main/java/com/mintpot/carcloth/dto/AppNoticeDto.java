package com.mintpot.carcloth.dto;

import com.mintpot.carcloth.constant.enums.ENoticeType;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class AppNoticeDto {
    private long id;

    private String content;

    private boolean hasRead;

    private ENoticeType type;

    private Long detailId;

    private LocalDate createdOn;
}
