package com.mintpot.readingm.backend.dto.admin;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class SaveMainPopupDto {
    @NotBlank
    private String imageUrl;

    private String videoUrl;
}
