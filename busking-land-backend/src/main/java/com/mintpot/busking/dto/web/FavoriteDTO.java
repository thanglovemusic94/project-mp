package com.mintpot.busking.dto.web;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FavoriteDTO {
    private int favoriteId;
    private String favoriteName;
    @JsonProperty("isActive")
    private boolean isActive = false;
}
