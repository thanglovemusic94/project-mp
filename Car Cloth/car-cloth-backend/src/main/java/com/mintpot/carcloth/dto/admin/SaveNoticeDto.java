package com.mintpot.carcloth.dto.admin;

import com.mintpot.carcloth.constant.NotificationType;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
public class SaveNoticeDto {

    @NotNull
    private NotificationType type;

    @NotBlank
    @Size(max = 100)
    private String title;

    @NotBlank
    @Size(max = 2000)
    private String content;
}