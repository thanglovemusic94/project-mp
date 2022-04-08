package com.mintpot.busking.api.google.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserInfo {
    private String id;
    private String email;
    private String name;
    private String give_name;
    private String family_name;
}
