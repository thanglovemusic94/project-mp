package com.mintpot.busking.api.solapi;

import com.mintpot.busking.api.solapi.dto.GroupInfoResponse;
import com.mintpot.busking.api.solapi.dto.Message;
import com.mintpot.busking.api.solapi.dto.Response;

import java.util.List;

public interface SolapiApiClient {

    GroupInfoResponse createMessageGroup();

    void deleteMessageGroup(String groupId);

    void addGroupMessage(String groupId, List<Message> messages);

    GroupInfoResponse sendGroupMessage(String groupId);

    Response sendSingleMessage(Message message);
}
