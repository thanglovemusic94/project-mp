package com.mintpot.readingm.backend.dto.admin;

import com.mintpot.readingm.backend.entity.constant.IssuingMode;
import com.mintpot.readingm.backend.entity.constant.PointType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
public class PointDto {
    private long id;

    private PointType type;

    private String name;

    private int amount;

    private LocalDate startValidDate;

    private LocalDate endValidDate;

    private IssuingMode issuingMode;

    private Set<UserViewDto> members;
}
