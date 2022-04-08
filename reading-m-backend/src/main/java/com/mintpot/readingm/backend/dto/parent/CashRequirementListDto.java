package com.mintpot.readingm.backend.dto.parent;

import com.mintpot.readingm.backend.entity.CashStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CashRequirementListDto {
    private long id;

    private int point;

    private LocalDateTime createdOn;

    private LocalDateTime completionTime;

    private CashStatus status;
}
