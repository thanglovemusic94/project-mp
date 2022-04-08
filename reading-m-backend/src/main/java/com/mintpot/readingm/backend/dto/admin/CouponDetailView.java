package com.mintpot.readingm.backend.dto.admin;

import com.mintpot.readingm.backend.entity.constant.ClassType;
import com.mintpot.readingm.backend.entity.constant.IssuingMode;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Set;

@Getter
@Setter
public class CouponDetailView {

    private long id;

    private String name;

    private Integer amount;

    private ClassType classType;

    private LocalDate startValidDate;

    private LocalDate endValidDate;

    private IssuingMode issuingMode;

    private Set<Long> parentIdList;
}