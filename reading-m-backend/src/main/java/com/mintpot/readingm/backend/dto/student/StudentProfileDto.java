package com.mintpot.readingm.backend.dto.student;

import com.mintpot.readingm.api.rams.book.School;
import com.mintpot.readingm.backend.dto.UserProfileDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class StudentProfileDto extends UserProfileDto {

    private String school;

    private Integer grade;

    private School clazz;

    private long parentId;

    private String parentName;

    private String parentPhone;
}
