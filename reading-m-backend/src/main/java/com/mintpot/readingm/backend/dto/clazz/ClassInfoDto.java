package com.mintpot.readingm.backend.dto.clazz;


import com.mintpot.readingm.backend.dto.admin.UserViewDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClassInfoDto {

    private long id;

    private String type;

    private String name;

    private UserViewDto tutor;

}
