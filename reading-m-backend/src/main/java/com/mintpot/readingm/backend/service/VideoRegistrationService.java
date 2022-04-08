package com.mintpot.readingm.backend.service;

import com.mintpot.readingm.backend.dto.admin.videoregistration.VideoRegistrationRqDto;
import com.mintpot.readingm.backend.entity.MstConfig;

public interface VideoRegistrationService {
    MstConfig findByKey();
    MstConfig create(VideoRegistrationRqDto registrationRqDto);
}
