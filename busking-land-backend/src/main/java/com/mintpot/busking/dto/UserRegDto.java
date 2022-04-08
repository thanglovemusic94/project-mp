package com.mintpot.busking.dto;

import com.mintpot.busking.model.Favorite;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;


@Getter
@Setter
@NoArgsConstructor
public class UserRegDto {

    private String email;

    private String name;

    private String phone;

    private String password;

    private Set<Favorite> favorites;

}
