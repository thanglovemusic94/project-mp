package com.mintpot.readingm.backend.dto.clazz.embedded;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.net.URL;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PresignedUrlDto {
    private URL url;

    @NotBlank
    private String fileName;
}
