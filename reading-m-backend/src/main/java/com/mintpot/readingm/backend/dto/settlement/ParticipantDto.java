package com.mintpot.readingm.backend.dto.settlement;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ParticipantDto {
    private String name;

    private boolean isPresent;
}
