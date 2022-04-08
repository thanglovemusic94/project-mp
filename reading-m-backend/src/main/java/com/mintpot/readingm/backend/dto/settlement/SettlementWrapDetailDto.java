package com.mintpot.readingm.backend.dto.settlement;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class SettlementWrapDetailDto {
    private SettlementDetailDto settlement;

    private List<AttendClassDto> attend;
}
