package com.mintpot.busking.dto.api;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class UserShortInfoDto {

    private String name;

    private String email;

    private String phone;
}
