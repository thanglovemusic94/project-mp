package com.mintpot.carcloth.controller.admin;

import com.mintpot.carcloth.dto.BannerDto;
import com.mintpot.carcloth.dto.admin.SaveBannerDto;
import com.mintpot.carcloth.dto.admin.SaveBannerRes;
import com.mintpot.carcloth.entity.Banner;
import com.mintpot.carcloth.repository.BannerRepository;
import com.mintpot.carcloth.utils.StorageService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Sort;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/banners")
@Api(tags={"Banner"})
@RequiredArgsConstructor
@Validated
public class BannerController {

    private final BannerRepository bannerRepo;
    private final StorageService storageService;
    private final ModelMapper mapper;

    @GetMapping
    public List<BannerDto> list() {
        List<BannerDto> res = new ArrayList<>();

        var banners = bannerRepo.findAll(Sort.by("position"));
        if(banners != null && !banners.isEmpty()) {
            res = banners.stream()
                    .map( b -> mapper.map(b, BannerDto.class))
                    .collect(Collectors.toList());
        }

        return res;
    }

    @PatchMapping
    public List<SaveBannerRes> upload(@RequestBody List<@Valid SaveBannerDto> bannerDtos) {
        var res = new ArrayList<SaveBannerRes>();

        for (var dto : bannerDtos) {
            var banner = bannerRepo.findById(dto.getPosition())
                    .orElse(new Banner(dto.getPosition()));
            banner.setConnectionLink(dto.getConnectionLink());
            banner.setStatus(dto.getStatus());

            if (dto.isImgChanged()) {
                //remove old image
                storageService.remove(banner.getImgUrl());
                //generate presigned url for upload new image
                var imgKey = String.format("banner/%d_banner", System.currentTimeMillis());
                var url = storageService.getPresignedUrl(imgKey, true);
                res.add(new SaveBannerRes(dto.getPosition(), url));
                banner.setImgUrl(imgKey);
            }

            bannerRepo.save(banner);
        }
        return res;
    }
}