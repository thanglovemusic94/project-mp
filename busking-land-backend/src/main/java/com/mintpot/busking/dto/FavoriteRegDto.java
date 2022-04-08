package com.mintpot.busking.dto;

import com.mintpot.busking.model.Favorite;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class FavoriteRegDto {

    private Set<Favorite> favorites;

}
