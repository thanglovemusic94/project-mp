package com.mintpot.readingm.backend.dto.admin;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserViewDto {
    private long id;

    private String memberId;

    private String name;

    private String phone;
}
