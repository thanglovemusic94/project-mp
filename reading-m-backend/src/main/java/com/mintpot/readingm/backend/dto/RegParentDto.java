package com.mintpot.readingm.backend.dto;

import com.mintpot.readingm.backend.dto.tutorApplication.RegStudentDto;
import com.mintpot.readingm.backend.dto.tutorApplication.RegUserDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
public class RegParentDto extends RegUserDto {
    private Set<RegStudentDto> children;
}
