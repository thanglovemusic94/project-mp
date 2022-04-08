package com.mintpot.readingm.backend.dto.admin.banner;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class BannerRqDto {
    private String name;
    private MultipartFile imagePc;
    private MultipartFile imageMb;
    private Integer orderBanner;
}
