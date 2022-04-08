package com.mintpot.readingm.backend.dto.notice;

import com.mintpot.readingm.backend.user.Role;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class SaveNoticeDto {

    @NotBlank
    private String title;

    @NotBlank
    private String content;

    private Role role;

    private String fileName;
}