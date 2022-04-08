package com.mintpot.readingm.backend.dto.clazz;

import com.mintpot.readingm.api.rams.book.Grade;
import com.mintpot.readingm.api.rams.book.School;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TextBookCurriculumDto {
    private String cIdx;

    private School cClass;

    private Grade cGrade;

    //private List<CurriculumBookDto> curriculumBooks;
}


