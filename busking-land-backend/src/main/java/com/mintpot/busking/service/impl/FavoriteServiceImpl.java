package com.mintpot.busking.service.impl;

import com.mintpot.busking.dto.SliceDto;
import com.mintpot.busking.dto.web.FavoriteDTO;
import com.mintpot.busking.model.Favorite;
import com.mintpot.busking.repository.FavoriteRepository;
import com.mintpot.busking.service.FavoriteService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FavoriteServiceImpl implements FavoriteService {

    private final FavoriteRepository favoriteRepository;

    public FavoriteServiceImpl(FavoriteRepository favoriteRepository) {
        this.favoriteRepository = favoriteRepository;
    }

    @Autowired
    private ModelMapper mapper;

    @Override
    public SliceDto<Favorite> getFavorites() {
        List<Favorite> favorites = new ArrayList<Favorite>();
        favoriteRepository.findAll().forEach(favorites::add);
        return SliceDto.of(favorites, false);
    }

    @Override
    public List<FavoriteDTO> listFavorites() {
        List<Favorite> favorites = favoriteRepository.findAll();
        List<FavoriteDTO> favoriteDTOS = favorites.stream().map(favorite ->  mapper.map(favorite, FavoriteDTO.class)).collect(Collectors.toList());
        return favoriteDTOS;
    }
}
