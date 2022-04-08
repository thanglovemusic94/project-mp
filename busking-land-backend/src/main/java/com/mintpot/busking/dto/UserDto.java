package com.mintpot.busking.dto;

import com.mintpot.busking.dto.api.BuskerInfoDto;
import com.mintpot.busking.model.BuskerInfo;
import com.mintpot.busking.model.Favorite;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class UserDto {

    private int id;
    private String name;
    private String email;
    private String phone;
    private Date createdOn;
    private Date updatedOn;

    @ApiModelProperty(example = "KAKAO|NAVER|FACEBOOK|GOOGLE|APPLE|MAIL")
    private String snsType;

    private List<Integer> noticeSettings;

    List<Favorite> favorites;

    private boolean agreePolicy;

    private BuskerInfoDto busker;

    private int pointAmount;

    private String avatar;

}
