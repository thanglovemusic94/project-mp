package com.mintpot.busking.dto;

import com.mintpot.busking.dto.api.BuskerRegDto;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class UserEditDto {

    private String name;

    private String phone;

    private String email;

    private Boolean agreePolicy;

    private BuskerRegDto buskerInfo;

    private FavoriteRegDto favoriteInfo;

    private String avatar;

}
