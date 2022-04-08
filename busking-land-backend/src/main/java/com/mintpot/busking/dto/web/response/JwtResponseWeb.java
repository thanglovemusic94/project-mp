package com.mintpot.busking.dto.web.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponseWeb {
    private String token;
    private String type = "Bearer";
    private int id;
    private String name;
    private String email;

    public JwtResponseWeb(String accessToken, int id, String name, String email) {
        this.token = accessToken;
        this.id = id;
        this.name = name;
        this.email = email;
    }
}
