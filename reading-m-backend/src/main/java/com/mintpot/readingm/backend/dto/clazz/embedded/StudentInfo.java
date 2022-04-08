package com.mintpot.readingm.backend.dto.clazz.embedded;

import com.mintpot.readingm.backend.dto.admin.UserViewDto;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class StudentInfo {
    private long id;

    private String name;

    private String school;

    private int grade;

    private String phone;

    private UserViewDto parent;

    private LocalDateTime paymentDate;

    private boolean isNew;
}
