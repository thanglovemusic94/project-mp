package com.mintpot.carcloth.dto.term;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PrivacyDto implements Serializable {

    private String privacyStatement;

    private LocalDateTime createdOn;
}
