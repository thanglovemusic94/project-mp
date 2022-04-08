package com.mintpot.busking.dto.api;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.mintpot.busking.model.constant.BuskingProgress;
import com.mintpot.busking.model.constant.BuskingStatus;
import com.mintpot.busking.model.constant.BuskingType;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class BuskingInfoDto {

    private int id;

    private String title;

    private String name;

    private String image;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private Date start;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private Date end;

    private BuskingType type;

    private BuskingStatus status;

    @ApiModelProperty(example = "INIT|IN_LIVE|END")
    private BuskingProgress progress;

    private int userId;

    private int durationInMinute;

    private Double distance;

    private Double lat;

    private Double lng;

    private String landName;

    private String landId;

    private String landAddress;

    private int numberLike;

    private int numberSponsor;

    private int numberViewer;

    private String buskerName;

    private String avatar;

    private String channelId;

    public BuskingInfoDto(int id, String title, String name, String image, Date start, Date end, BuskingType type, int userId, int durationInMinute, Double lat, Double lng, String landName, int landId, String landAddress, int numberLike, int numberSponsor, int numberViewer, String buskerName, String avatar, String channelId) {
        this.id = id;
        this.title = title;
        this.name = name;
        this.image = image;
        this.start = start;
        this.end = end;
        this.type = type;
        this.userId = userId;
        this.durationInMinute = durationInMinute;
        this.lat = lat;
        this.lng = lng;
        this.landName = landName;
        this.landId = String.valueOf(landId);
        this.landAddress = landAddress;
        this.numberLike = numberLike;
        this.numberSponsor = numberSponsor;
        this.numberViewer = numberViewer;
        this.buskerName = buskerName;
        this.avatar = avatar;
        this.channelId = channelId;
    }

    public static BuskingInfoDto from (BuskingNearByDto nearByDto) {
        BuskingInfoDto infoDto = new BuskingInfoDto();
        infoDto.setId(nearByDto.getId());
        infoDto.setName(nearByDto.getName());
        infoDto.setTitle(nearByDto.getTitle());
        infoDto.setImage(nearByDto.getImage());
        infoDto.setDistance(nearByDto.getDistance());

        infoDto.setLat(nearByDto.getLat());
        infoDto.setLng(nearByDto.getLng());
        infoDto.setLandName(nearByDto.getLand_name());
        infoDto.setLandAddress(nearByDto.getLand_address());
        infoDto.setLandId(nearByDto.getLand_id());

        infoDto.setDurationInMinute(nearByDto.getDuration_in_minute());
        infoDto.setStart(nearByDto.getStart());
        infoDto.setEnd(nearByDto.getEnd());

        infoDto.setType(BuskingType.valueOf(nearByDto.getType()));
        infoDto.setStatus(BuskingStatus.valueOf(nearByDto.getStatus()));
        infoDto.setProgress(BuskingProgress.valueOf(nearByDto.getProgress()));
        infoDto.setUserId(nearByDto.getUser_id());

        infoDto.setBuskerName(nearByDto.getBusker_name());
        infoDto.setAvatar(nearByDto.getAvatar());

        infoDto.setChannelId(nearByDto.getChannel_id());

        return infoDto;
    }

}
