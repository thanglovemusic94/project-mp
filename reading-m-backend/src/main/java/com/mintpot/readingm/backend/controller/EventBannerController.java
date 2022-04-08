package com.mintpot.readingm.backend.controller;

import com.mintpot.readingm.backend.dto.admin.EventBannerView;
import com.mintpot.readingm.backend.dto.admin.SaveEventBannerDto;
import com.mintpot.readingm.backend.dto.admin.SaveEventBannerResDto;
import com.mintpot.readingm.backend.entity.MstConfig;
import com.mintpot.readingm.backend.repository.MstConfigRepository;
import com.mintpot.readingm.backend.security.AuthenticationFacade;
import com.mintpot.storage.StorageService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/event-banner")
@Api(tags = {"Event Banner"})
@RequiredArgsConstructor
public class EventBannerController {
    private final MstConfigRepository mstConfigRepo;

    private final StorageService storageService;

    private final AuthenticationFacade authFacade;

    private final String PC_IMG_PATH = "common/ev/pc_banner";

    private final String MOBILE_IMG_PATH = "common/ev/mobile_banner";

    private final String PC_IMG_PATH_KEY = "ev_pc_banner_url";

    private final String MOBILE_IMG_PATH_KEY = "ev_mobile_banner_url";

    @GetMapping
    public EventBannerView getBannerUrl() {
        var res = new EventBannerView();
        var pcImgConfig = mstConfigRepo.findByConfigKey(PC_IMG_PATH_KEY).orElse(null);
        var pcImgUrl = pcImgConfig != null ? pcImgConfig.getConfigValue() : null;
        res.setPcImgUrl(pcImgUrl);
        res.setPcImgName(pcImgUrl != null ? pcImgUrl.substring(pcImgUrl.lastIndexOf('/') + 1) : null);
        var mobileImgConfig = mstConfigRepo.findByConfigKey(MOBILE_IMG_PATH_KEY).orElse(null);
        var mobileImgUrl = mobileImgConfig != null ? mobileImgConfig.getConfigValue() : null;
        res.setMobileImgUrl(mobileImgUrl);
        res.setMobileImgName(mobileImgUrl != null ? mobileImgUrl.substring(mobileImgUrl.lastIndexOf('/') + 1) : null);
        return res;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Transactional
    public SaveEventBannerResDto saveBanner(@RequestBody SaveEventBannerDto bannerDto) {
        authFacade.assertAdmin();
        var res = new SaveEventBannerResDto();
        if (bannerDto.getPcImgName() != null) {
            var objKey = PC_IMG_PATH + "/" + bannerDto.getPcImgName();
            res.setPcImgUrl(storageService.getPresignedUrl(objKey));
            var mstConfig = mstConfigRepo.findByConfigKey(PC_IMG_PATH_KEY).orElse(null);
            if (mstConfig == null) {
                mstConfig = new MstConfig(PC_IMG_PATH_KEY, objKey);
            } else {
                storageService.deleteObjectKeys(List.of(mstConfig.getConfigValue()));
                mstConfig.setConfigValue(objKey);
            }

            mstConfigRepo.save(mstConfig);
        }

        if (bannerDto.getMobileImgName() != null) {
            var objKey = MOBILE_IMG_PATH + "/" + bannerDto.getMobileImgName();
            res.setMobileImgUrl(storageService.getPresignedUrl(objKey));
            var mstConfig = mstConfigRepo.findByConfigKey(MOBILE_IMG_PATH_KEY).orElse(null);

            if (mstConfig == null) {
                mstConfig = new MstConfig(MOBILE_IMG_PATH_KEY, objKey);
            } else {
                storageService.deleteObjectKeys(List.of(mstConfig.getConfigValue()));
                mstConfig.setConfigValue(objKey);
            }
            mstConfigRepo.save(mstConfig);
        }
        return res;
    }
}
