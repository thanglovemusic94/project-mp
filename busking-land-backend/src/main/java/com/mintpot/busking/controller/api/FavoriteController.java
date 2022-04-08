package com.mintpot.busking.controller.api;


import com.mintpot.busking.controller.ApiController;
import com.mintpot.busking.dto.SliceDto;
import com.mintpot.busking.model.Favorite;
import com.mintpot.busking.service.FavoriteService;
import io.swagger.annotations.Api;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

@RestController
@Api(tags = { "Favorite Api" })
@RequestMapping(path = "/favorite")
@Log4j2
public class FavoriteController extends ApiController {

    private final FavoriteService favoriteService;

    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @GetMapping("")
    SliceDto<Favorite> getFavorites () {
        return favoriteService.getFavorites();
    }
}
