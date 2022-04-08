package com.mintpot.readingm.backend.dto.sms;

import com.mintpot.readingm.backend.constant.MessageType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
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
