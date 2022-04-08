package com.mintpot.readingm.backend.dto.admin;

import com.mintpot.readingm.backend.dto.student.StudentDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ParentDto extends AdMemListDto {
    private List<StudentDto> children;
}
