package com.mintpot.readingm.backend.service.impl;

import com.mintpot.readingm.backend.dto.admin.videoregistration.VideoRegistrationRqDto;
import com.mintpot.readingm.backend.entity.MstConfig;
import com.mintpot.readingm.backend.exception.CommonException;
import com.mintpot.readingm.backend.exception.ErrorCode;
import com.mintpot.readingm.backend.repository.MstConfigRepository;
import com.mintpot.readingm.backend.service.VideoRegistrationService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class VideoRegistrationServiceImpl implements VideoRegistrationService {

    private final MstConfigRepository mstConfigRepository;
    private final String keyVideoRegister = "video_register";

    public VideoRegistrationServiceImpl(MstConfigRepository mstConfigRepository) {
        this.mstConfigRepository = mstConfigRepository;
    }

    @Override
    public MstConfig findByKey() {
        MstConfig mstConfig = mstConfigRepository.findByConfigKey(keyVideoRegister).orElseThrow(() -> new CommonException(ErrorCode.VIDEO_NOT_FOUND));
        return mstConfig;
    }

    @Transactional
    @Override
    public MstConfig create(VideoRegistrationRqDto dto) {
        Optional<MstConfig> mstConfig = mstConfigRepository.findByConfigKey(keyVideoRegister);

        if (mstConfig.isPresent()){
            mstConfig.get().setConfigValue(dto.getVideoUrl());
            return mstConfigRepository.save(mstConfig.get());
        }else {
            MstConfig entity = new MstConfig();
            entity.setConfigKey(keyVideoRegister);
            entity.setConfigValue(dto.getVideoUrl());
            return mstConfigRepository.save(entity);
        }
    }
}
