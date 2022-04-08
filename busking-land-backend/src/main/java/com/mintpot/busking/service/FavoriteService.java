package com.mintpot.busking.service;

import com.mintpot.busking.dto.SliceDto;
import com.mintpot.busking.dto.web.FavoriteDTO;
import com.mintpot.busking.model.Favorite;

import java.util.List;

public interface FavoriteService {
    SliceDto<Favorite> getFavorites();
    List<FavoriteDTO> listFavorites();
}
