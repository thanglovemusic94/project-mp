package com.mintpot.busking.api.solapi.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SingleMessage {

    private Message message;

    public SingleMessage(Message message) {
        this.message = message;
    }
}
