package com.mintpot.readingm.backend.dto.parent;

import com.mintpot.readingm.backend.entity.constant.ClassType;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class CouponListDto {
    private long id;

    private String name;

    private int amount;

    private ClassType classType;

    private LocalDate startValidDate;

    private LocalDate endValidDate;
}
