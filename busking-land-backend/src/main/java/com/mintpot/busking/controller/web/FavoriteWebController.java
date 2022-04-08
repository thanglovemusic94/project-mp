package com.mintpot.busking.controller.web;

import com.mintpot.busking.dto.web.FavoriteDTO;
import com.mintpot.busking.service.FavoriteService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = {"${settings.cors_origin}"})
@RestController
@RequestMapping(path = "/web/favorite")
@Api(tags = {"Web Favorite Api"})
@Log4j2
public class FavoriteWebController {

    @Autowired
    private FavoriteService favoriteService;


    @ApiOperation("Get All Favorite")
    @GetMapping("")
    public List<FavoriteDTO> getAll()
    {
        return favoriteService.listFavorites();
    }
}
