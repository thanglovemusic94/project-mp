package com.mintpot.readingm.backend.dto.clazz;

import com.mintpot.readingm.backend.entity.constant.GoalClassCategory;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class EditClassDto {

    private String name;

    private String materials;

    private String guide;

    private Long tuitionFee;

    @NotNull
    private List<EditTextBookCurriculumDto> curriculum;

    private String revisionReason;

    private String introduction;

    private GoalClassCategory category;
}
