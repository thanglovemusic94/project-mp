package com.mintpot.busking.api.naver;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.net.URL;
import java.time.LocalDate;

@Getter
@Setter
@ToString
public class UserInfo {

    private String email;

    private String nickname;

    private URL profile_image;

    private int age;

    private long id;

    private String name;

    private LocalDate birthday;

    private String mobile;

    public String getMobile() {
        mobile = mobile.replaceAll("-", "");
        return mobile;
    }
}
