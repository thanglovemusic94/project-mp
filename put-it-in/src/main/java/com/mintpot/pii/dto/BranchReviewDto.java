package com.mintpot.pii.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.lang.Nullable;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.*;

@Getter
@Setter
@NoArgsConstructor
public class BranchReviewDto {

    @NotNull
    private long reservationId;

    @NotNull
    @Min(1)
    @Max(5)
    private byte rating;

    @NotBlank
    @Size(min = 10, max = 200)
    private String contents;
}
