package com.mintpot.readingm.backend.dto.student;

import com.mintpot.readingm.backend.dto.admin.AdMemListDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StudentDto extends AdMemListDto {
    private String school;

    private String parentName;

    private String parentPhoneNumber;
}
