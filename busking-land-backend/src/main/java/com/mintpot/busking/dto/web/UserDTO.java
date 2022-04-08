package com.mintpot.busking.dto.web;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonRootName;
import com.mintpot.busking.constant.UserStatus;
import com.mintpot.busking.dto.api.BuskerInfoDto;
import com.mintpot.busking.model.Favorite;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class  UserDTO {
    private Integer id;
    private String name;
    private String email;
    private String phone;
    private String snsType;
    private int pointAmount;
    private String performanceVideos;
    private String avatar;
    private boolean agreePolicy;
    private UserStatus status;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private Date createdOn;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private Date updatedOn;

    private Set<FavoriteDTO> favorites;

//    private List<String> noticeSettings;
//    private BuskerInfoDTO buskerInfo;


    public UserDTO(String name, String email, String phone, String snsType, int pointAmount, Date createdOn, Set<FavoriteDTO> favorites) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.snsType = snsType;
        this.pointAmount = pointAmount;
        this.createdOn = createdOn;
        this.favorites = favorites;
    }
}
