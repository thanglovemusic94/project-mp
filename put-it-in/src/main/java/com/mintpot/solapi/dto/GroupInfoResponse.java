package com.mintpot.solapi.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
public class GroupInfoResponse {

    private String _id;

    private MessageCount count;

    private String serviceMethod;

    private String sdkVersion;

    private String osPlatform;

    private List<LogMessage> log;

    private String status;

    private String dateSent;

    private String dateCompleted;

    private boolean isRefunded;

    private boolean flagUpdated;

    private boolean prepaid;

    private boolean strict;

    private String accountId;

    private String apiVersion;

    private String groupId;

    private String dateCreated;

    private String dateUpdated;
}
