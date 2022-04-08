package com.mintpot.solapi;

import com.mintpot.solapi.dto.GroupInfoResponse;
import com.mintpot.solapi.dto.Message;
import com.mintpot.solapi.dto.Response;

import java.util.List;

public interface SolapiApiClient {

    GroupInfoResponse createMessageGroup();

    void deleteMessageGroup(String groupId);

    void addGroupMessage(String groupId, List<Message> messages);

    GroupInfoResponse sendGroupMessage(String groupId);

    Response sendSingleMessage(Message message);
}
