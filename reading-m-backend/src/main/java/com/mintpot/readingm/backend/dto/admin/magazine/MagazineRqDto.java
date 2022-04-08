package com.mintpot.readingm.backend.dto.admin.magazine;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class MagazineRqDto {
    private String title;
    private MultipartFile imagePc;
    private MultipartFile imageMb;
    private MultipartFile file;
}
