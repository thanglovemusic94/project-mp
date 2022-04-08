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
public class TermDto implements Serializable {

    private String servicePolicy;

    private LocalDateTime createdOn;
}
