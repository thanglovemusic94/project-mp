package com.mintpot.busking.dto.api;

import com.mintpot.busking.model.Favorite;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class BuskerRegDto {

    private String name;

    private String activityCity;

    private String avatar;

    private List<String> performanceVideos;

    private List<Favorite> listGenre;
}
