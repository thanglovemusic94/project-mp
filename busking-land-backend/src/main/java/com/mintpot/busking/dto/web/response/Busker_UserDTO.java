package com.mintpot.busking.dto.web.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Busker_UserDTO {
    private String id;
    private String email;
    private String name;
    private String phone;
    private String snsType;
    private int pointAmount;
    private boolean agreePolicy;
}
