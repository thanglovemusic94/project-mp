package com.mintpot.readingm.api.rams.curriculum;

import com.mintpot.readingm.api.rams.Response;
import com.mintpot.readingm.api.rams.ResultData;
import com.mintpot.readingm.backend.entity.Curriculum;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CurriculumResponse extends Response {

    private ResultData<Curriculum> resultData;
}
