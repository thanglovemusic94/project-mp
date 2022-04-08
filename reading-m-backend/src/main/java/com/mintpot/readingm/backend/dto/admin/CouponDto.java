package com.mintpot.readingm.backend.dto.admin;

import com.mintpot.readingm.backend.entity.constant.ClassType;
import com.mintpot.readingm.backend.entity.constant.IssuingMode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
public class CouponDto {
    private long id;

    private String name;

    private int amount;

    private ClassType classType;

    private LocalDate startValidDate;

    private LocalDate endValidDate;

    private IssuingMode issuingMode;

    private Set<ParentDto> members;

}
