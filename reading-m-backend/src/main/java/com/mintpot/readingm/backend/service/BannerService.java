package com.mintpot.readingm.backend.service;

import com.mintpot.readingm.backend.dto.admin.banner.BannerRqDto;
import com.mintpot.readingm.backend.entity.Banner;

import java.io.IOException;
import java.util.List;

public interface BannerService {
    Banner findById(Long id);
    Banner create(BannerRqDto bannerRqDto) throws IOException;
    Banner update(BannerRqDto bannerRqDto, Long id) throws IOException;
    void remove(List<Long> ids);
    Banner show(Long id);
    Banner hide(Long id);
}
