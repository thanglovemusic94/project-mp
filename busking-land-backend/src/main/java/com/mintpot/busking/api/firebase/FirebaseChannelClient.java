package com.mintpot.busking.api.firebase;

import com.mintpot.busking.dto.api.LiveStreamConfig;
import com.mintpot.busking.model.constant.BuskingProgress;

public interface FirebaseChannelClient {

    void createChannel (String channelId);

    void updateChannelLike (String channelId, int like);

    void updateChannelViewer (String channelId, int viewer);

    void updateChannelSponsor (String channelId, int sponsor);

    void updateChannelConfig (String channelId, LiveStreamConfig config);

    void updateChannelProgress (String channelId, BuskingProgress progress);

}
