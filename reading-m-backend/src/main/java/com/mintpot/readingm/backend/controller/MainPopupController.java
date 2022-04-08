package com.mintpot.readingm.backend.controller;

import com.mintpot.readingm.backend.dto.admin.MainPopupView;
import com.mintpot.readingm.backend.dto.admin.SaveMainPopupDto;
import com.mintpot.readingm.backend.dto.admin.SaveMainPopupResDto;
import com.mintpot.readingm.backend.entity.MstConfig;
import com.mintpot.readingm.backend.repository.MstConfigRepository;
import com.mintpot.readingm.backend.security.AuthenticationFacade;
import com.mintpot.storage.StorageService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/main-popup")
@Api(tags = {"Main popup"})
@RequiredArgsConstructor
public class MainPopupController {
    private final MstConfigRepository mstConfigRepo;

    private final StorageService storageService;

    private final AuthenticationFacade authFacade;

    private final String IMG_PATH = "common/main_popup/img";

    private final String IMG_PATH_KEY = "main_popup_img_url";

    private final String VIDEO_URL_KEY = "main_popup_video_url";

    @GetMapping
    public MainPopupView getInfo() {
        var res = new MainPopupView();
        var imgConfig = mstConfigRepo.findByConfigKey(IMG_PATH_KEY).orElse(null);
        var imgUrl = imgConfig != null ? imgConfig.getConfigValue() : null;
        res.setImageUrl(imgUrl);
        res.setImageName(imgUrl != null ? imgUrl.substring(imgUrl.lastIndexOf('/') + 1) : null);
        var videoConfig = mstConfigRepo.findByConfigKey(VIDEO_URL_KEY).orElse(null);
        res.setVideoUrl(videoConfig != null ? videoConfig.getConfigValue() : null);
        return res;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Transactional
    public SaveMainPopupResDto registerPopup(@Valid @RequestBody SaveMainPopupDto popupDto) {
        authFacade.assertAdmin();
        var res = new SaveMainPopupResDto();
        var imgConfig = mstConfigRepo.findByConfigKey(IMG_PATH_KEY).orElse(null);
        String imgKey = IMG_PATH + "/" + popupDto.getImageUrl();
        if (imgConfig == null) {
            imgConfig = new MstConfig(IMG_PATH_KEY, imgKey);
        } else {
            imgConfig.setConfigValue(imgKey);
        }

        mstConfigRepo.save(imgConfig);
        res.setImageUrl(storageService.getPresignedUrl(imgKey));
        String videoUrl = popupDto.getVideoUrl();
        if (videoUrl != null) {
            var videoConfig = mstConfigRepo.findByConfigKey(VIDEO_URL_KEY).orElse(null);
            if (videoConfig == null) {
                videoConfig = new MstConfig(VIDEO_URL_KEY, videoUrl);
            } else {
                videoConfig.setConfigValue(videoUrl);
            }

            mstConfigRepo.save(videoConfig);
        }

        return res;
    }
}
