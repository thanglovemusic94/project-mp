package com.mintpot.readingm.backend.dto.admin;

import com.mintpot.readingm.backend.dto.clazz.RegClassDavinciDto;
import com.mintpot.readingm.backend.entity.constant.SchoolGrade;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class VodClassDto extends RegClassDavinciDto {

    private String imageUrl;

    private List<VideoDto> videos;

    private SchoolGrade grade;

}
