package com.mintpot.readingm.backend.dto;

import com.mintpot.readingm.backend.dto.student.StudentProfileDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ParentProfileDto extends UserProfileDto {

    private List<StudentProfileDto> children;

}

