package com.mintpot.readingm.backend.dto.parent;

import com.mintpot.readingm.backend.entity.constant.PointAction;
import com.mintpot.readingm.backend.entity.constant.PointType;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class PointListDto {
    private long id;

    private PointAction action;

    private PointType type;

    private int amount;

    private String name;

    private LocalDateTime createdOn;
}
