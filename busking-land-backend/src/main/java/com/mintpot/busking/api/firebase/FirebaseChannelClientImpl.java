package com.mintpot.busking.api.firebase;

import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.mintpot.busking.api.firebase.dto.Channel;
import com.mintpot.busking.dto.api.LiveStreamConfig;
import com.mintpot.busking.model.constant.BuskingProgress;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;

@Component
@Log4j2
public class FirebaseChannelClientImpl implements FirebaseChannelClient {

    @Override
    public void createChannel(String channelId) {
        final FirebaseDatabase db = FirebaseDatabase.getInstance();
        // cRef = channel reference
        DatabaseReference cRef = db.getReference("channel");
        Channel channel = Channel.builder().name(channelId).like(0).viewer(0).sponsor(0).config(new LiveStreamConfig()).progress(BuskingProgress.INIT.name()).build();
        cRef.child(channelId).setValueAsync(channel);
    }

    @Override
    public void updateChannelLike(String channelId, int like) {
        final FirebaseDatabase db = FirebaseDatabase.getInstance();
        // cRef = channel reference
        DatabaseReference cRef = db.getReference("channel");
        cRef.child(channelId).child("like").setValueAsync(like);
    }

    @Override
    public void updateChannelViewer(String channelId, int viewer) {
        final FirebaseDatabase db = FirebaseDatabase.getInstance();
        // cRef = channel reference
        DatabaseReference cRef = db.getReference("channel");
        cRef.child(channelId).child("viewer").setValueAsync(viewer);
    }

    @Override
    public void updateChannelSponsor(String channelId, int sponsor) {
        final FirebaseDatabase db = FirebaseDatabase.getInstance();
        // cRef = channel reference
        DatabaseReference cRef = db.getReference("channel");
        cRef.child(channelId).child("sponsor").setValueAsync(sponsor);
    }

    @Override
    public void updateChannelConfig(String channelId, LiveStreamConfig config) {
        final FirebaseDatabase db = FirebaseDatabase.getInstance();
        // cRef = channel reference
        DatabaseReference cRef = db.getReference("channel");
        cRef.child(channelId).child("config").setValueAsync(config);
    }

    @Override
    public void updateChannelProgress(String channelId, BuskingProgress progress) {
        final FirebaseDatabase db = FirebaseDatabase.getInstance();
        // cRef = channel reference
        DatabaseReference cRef = db.getReference("channel");
        cRef.child(channelId).child("progress").setValueAsync(progress.name());
    }
}
