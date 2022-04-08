package com.mintpot.readingm.backend.controller;

import com.mintpot.readingm.backend.dto.admin.banner.BannerRqDto;
import com.mintpot.readingm.backend.dto.admin.banner.BannerView;
import com.mintpot.readingm.backend.entity.Banner;
import com.mintpot.readingm.backend.repository.BannerRepository;
import com.mintpot.readingm.backend.security.AuthenticationFacade;
import com.mintpot.readingm.backend.service.BannerService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@Api(tags = {"Admin Main Banner"})
@RequestMapping("/api/banner")
@RequiredArgsConstructor
public class BannerController {

    private final BannerService bannerService;
    private final BannerRepository bannerRepository;
    private final AuthenticationFacade authenticationFacade;

    @GetMapping
    Page<BannerView> findByQuery(@RequestParam(required = false) String query, Pageable pageable) {
        authenticationFacade.assertAdmin();
        Page<BannerView> bannerViews = bannerRepository.findByQuery(query, pageable);
        return bannerViews;
    }

    @ApiOperation(value = "create Banner")
    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
    Banner createBanner(BannerRqDto dto) throws IOException {
        authenticationFacade.assertAdmin();
        return bannerService.create(dto);
    }

    @ApiOperation("find Banner by id")
    @GetMapping("/{id}")
    Banner findBannerById(@PathVariable Long id) {
        authenticationFacade.assertAdmin();
        return bannerService.findById(id);
    }

    @ApiOperation("update Banner")
    @PostMapping(value = "/{id}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
    Banner updateBanner(BannerRqDto dto, @PathVariable Long id) throws IOException {
        authenticationFacade.assertAdmin();
        return bannerService.update(dto, id);
    }

    @ApiOperation("delete Banner")
    @DeleteMapping()
    void removeBanner(@RequestParam List<Long> ids) {
        authenticationFacade.assertAdmin();
        bannerService.remove(ids);
    }

    @ApiOperation("Show Banner")
    @PatchMapping("/show/{id}")
    Banner showBanner(@PathVariable Long id) {
        authenticationFacade.assertAdmin();
        return bannerService.show(id);
    }

    @ApiOperation("Hide Banner")
    @PatchMapping("/hide/{id}")
    Banner hideBanner(@PathVariable Long id) {
        authenticationFacade.assertAdmin();
        return bannerService.hide(id);
    }

}
