package com.mintpot.carcloth.api.solapi;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class Message {
    private String from;

    private String to;

    private String text;

    private MessageType type;
}
