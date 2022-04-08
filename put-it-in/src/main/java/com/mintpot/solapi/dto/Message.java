package com.mintpot.solapi.dto;

import com.mintpot.solapi.constants.MessageType;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Message {

    //recipient number
    private String to;

    //calling number
    private String from;

    private String text;

    private MessageType type;

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
    public Message(String from, String to, String text, MessageType type) {
        this.from = from;
        this.to = to;
        this.text = text;
        this.type = type;
    }
}
