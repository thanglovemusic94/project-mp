package com.mintpot.readingm.backend.dto.admin.videoregistration;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class VideoRegistrationRqDto {
    @NotBlank
    private String videoUrl;
}
