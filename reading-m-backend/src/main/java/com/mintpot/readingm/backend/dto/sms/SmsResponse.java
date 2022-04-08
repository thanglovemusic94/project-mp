package com.mintpot.readingm.backend.dto.sms;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SmsResponse {
    private String groupId;

    private String messageId;

    private String accountId;

    private String statusMessage;

    private String statusCode;

    private String from;

    private String to;

    private String type;

    private String country;
}
