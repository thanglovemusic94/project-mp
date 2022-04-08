package com.mintpot.busking.dto.web;

import com.mintpot.busking.constant.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Busking_UserDTO {
    private Integer id;
    private String name;
    private BuskerShortInfoDto buskerInfo;

}
