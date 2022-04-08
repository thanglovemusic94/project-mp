package com.mintpot.busking.api.solapi.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Response {

    private String groupId;

    private String to;

    private String from;

    private String type;

    private String statusMessage;

    private String country;

    private String messageId;

    private String status;

    private String accountId;
}
