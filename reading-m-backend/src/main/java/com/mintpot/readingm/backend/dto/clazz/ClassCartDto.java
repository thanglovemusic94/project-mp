package com.mintpot.readingm.backend.dto.clazz;


import com.mintpot.readingm.backend.entity.id.UserClassId;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ClassCartDto {

    private UserClassId id;

    private ClassInfoDto classInfo;

    private LocalDateTime createdOn;
}
