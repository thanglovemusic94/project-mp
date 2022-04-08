package com.mintpot.carcloth.dto;

import com.mintpot.carcloth.constant.SNSType;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SNSInfoDto {

    private String id;

    private String name;

    private String email;

    private String mobile;

    private SNSType type;

    private String token = "";

    private int userId = -1;

    @Builder
    public SNSInfoDto(int userId) {
        this.userId = userId;
    }

    @Builder
    public SNSInfoDto(String id, String name, SNSType type) {
        this.id = id;
        this.name = name;
        this.type = type;
    }

    @Builder
    public SNSInfoDto(String id, String name, String email, SNSType type) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.email = email;
    }

    @Builder
    public SNSInfoDto(String id, String name, String email, SNSType type, String token) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.email = email;
        this.token = token;
    }

    @Builder
    public SNSInfoDto(String id, String name, String email, String mobile, SNSType type, String token) {
        this.id = id;
        this.name = name;
        this.mobile = mobile;
        this.type = type;
        this.email = email;
        this.token = token;
    }
}
