package com.mintpot.carcloth.api.naver;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ApiResponse {

    private String resultcode;

    private String message;

    private Object response;
}
