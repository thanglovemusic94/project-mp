package com.mintpot.readingm.backend.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mintpot.readingm.backend.converter.ImageUrlSerializer;
import com.mintpot.readingm.backend.entity.constant.Gender;
import com.mintpot.readingm.backend.entity.constant.TutorType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class TutorProfileDto extends UserProfileDto {
    private LocalDate birth;

    private Gender gender;

    private String bank;

    private String bankAccount;

    private String bookTextIntroduction;

    @JsonSerialize(using = ImageUrlSerializer.class)
    private String profileImageUrl;

    private TutorType tutorType;
}
