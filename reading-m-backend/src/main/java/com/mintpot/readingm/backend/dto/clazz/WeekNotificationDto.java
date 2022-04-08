package com.mintpot.readingm.backend.dto.clazz;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Getter
@Setter
public class WeekNotificationDto {

    @NotBlank
    private String notification;

    @NotNull
    private LocalDateTime start;
}
