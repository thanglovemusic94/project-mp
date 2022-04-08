package com.mintpot.busking.dto.web.request;

import com.mintpot.busking.constant.UserStatus;
import com.mintpot.busking.dto.web.FavoriteDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.util.Date;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateDTO {
    @NotBlank
    private String name;
    @NotBlank
    private String email;
    @NotBlank
    private String phone;
    private String snsType;
    private int pointAmount;
    private Date createdOn;

    @NotEmpty
    private Set<FavoriteDTO> favorites;
}
