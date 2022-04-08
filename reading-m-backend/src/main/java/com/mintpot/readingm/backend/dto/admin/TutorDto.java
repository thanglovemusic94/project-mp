package com.mintpot.readingm.backend.dto.admin;

import com.mintpot.readingm.backend.entity.constant.Gender;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class TutorDto extends AdMemListDto {
    private Date birth;

    private Gender gender;

    private String bank;

    private String accountNumber;
}
