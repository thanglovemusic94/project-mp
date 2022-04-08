package com.mintpot.busking.api.firebase.dto;

import com.mintpot.busking.dto.api.LiveStreamConfig;
import lombok.*;


@Getter
@Setter
@ToString
@NoArgsConstructor
public class Channel {

    private String name;

    private int like;

    private int viewer;

    private int sponsor;

    private LiveStreamConfig config;

    private String progress;

    @Builder
    public Channel(String name, int like, int viewer, int sponsor, LiveStreamConfig config, String progress) {
        this.name = name;
        this.like = like;
        this.viewer = viewer;
        this.sponsor = sponsor;
        this.config = config;
        this.progress = progress;
    }
}
