package com.mintpot.busking.dto.web.response;

import com.mintpot.busking.constant.UserStatus;
import com.mintpot.busking.dto.web.BuskerInfoDTO;
import com.mintpot.busking.dto.web.FavoriteDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.Set;

/**
 * @author Admin
 * @date 2021-02-18 10:22 AM
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO_PointHistory {
    private Integer id;
    private String name;
    private String email;
    private String phone;
}
