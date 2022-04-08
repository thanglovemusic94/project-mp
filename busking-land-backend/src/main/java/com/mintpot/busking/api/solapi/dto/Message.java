package com.mintpot.busking.api.solapi.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Message {

    //recipient number
    private String to;

    //calling number
    private final String from = "01020123296";

    private String text;

    private String type = "LMS";

//    private String country;
//
//    private String subject;
//
//    private String imageId;
//
//    // private Object kakaoOptions;
//
//    // private Object customFields;
//
//    private boolean autoTypeDetect;

    @Builder
    public Message(String to, String text) {
        this.to = to;
        this.text = text;
    }
}
