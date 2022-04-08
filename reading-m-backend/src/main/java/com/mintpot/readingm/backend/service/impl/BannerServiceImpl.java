package com.mintpot.readingm.backend.service.impl;

import com.mintpot.readingm.backend.dto.admin.banner.BannerRqDto;
import com.mintpot.readingm.backend.entity.Banner;
import com.mintpot.readingm.backend.entity.constant.ShowStatus;
import com.mintpot.readingm.backend.exception.CommonException;
import com.mintpot.readingm.backend.exception.ErrorCode;
import com.mintpot.readingm.backend.repository.BannerRepository;
import com.mintpot.readingm.backend.service.BannerService;
import com.mintpot.storage.LocalStorageService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class BannerServiceImpl implements BannerService {
    private final ModelMapper mapper;
    private final BannerRepository bannerRepository;
    private final LocalStorageService storageService;

    public BannerServiceImpl(ModelMapper mapper, BannerRepository bannerRepository, LocalStorageService storageService) {
        this.mapper = mapper;
        this.bannerRepository = bannerRepository;
        this.storageService = storageService;
    }

    @Override
    public Banner findById(Long id) {
        Banner banner = bannerRepository.findById(id).orElseThrow(() -> new CommonException(ErrorCode.BANNER_NOT_FOUND));
        return banner;
    }

    @Override
    @Transactional
    public Banner create(BannerRqDto dto) throws IOException {
        Banner banner = new Banner();
        mapper.map(dto, banner);
        bannerRepository.save(banner);
        if (dto.getImagePc() != null){
            String imagePcBanner = "/readingm-bucket/banner/" + banner.getId() + "/big-" + dto.getImagePc().getOriginalFilename();
            banner.setImagePc(imagePcBanner);
            storageService.uploadFile(dto.getImagePc().getBytes(), imagePcBanner);
        }
        if (dto.getImageMb() != null){
            String imageMbBanner = "/readingm-bucket/banner/" + banner.getId() + "/small-" + dto.getImageMb().getOriginalFilename();
            banner.setImageMb(imageMbBanner);
            storageService.uploadFile(dto.getImageMb().getBytes(), imageMbBanner);
        }

        return bannerRepository.save(banner);
    }

    @Override
    @Transactional
    public Banner update(BannerRqDto dto, Long id) throws IOException {
        Banner banner = bannerRepository.findById(id).orElseThrow(() -> new CommonException(ErrorCode.BANNER_NOT_FOUND));
        banner.setName(dto.getName());
        banner.setOrderBanner(dto.getOrderBanner());

        if (dto.getImagePc() != null) {
            String imagePcBanner = "/readingm-bucket/banner/" + banner.getId() + "/big-" + dto.getImagePc().getOriginalFilename();
            banner.setImagePc(imagePcBanner);
            storageService.uploadFile(dto.getImagePc().getBytes(), imagePcBanner);
        }
        if (dto.getImageMb() != null) {
            String imageMbBanner = "/readingm-bucket/banner/" + banner.getId() + "/small-" + dto.getImageMb().getOriginalFilename();
            banner.setImageMb(imageMbBanner);
            storageService.uploadFile(dto.getImageMb().getBytes(), imageMbBanner);
        }

        return bannerRepository.save(banner);
    }

    @Override
    @Transactional
    public void remove(List<Long> ids) {
        for (Long id : ids) {
            Optional<Banner> bannerEntity = bannerRepository.findById(id);
            if (!bannerEntity.isPresent()) {
                throw new CommonException(ErrorCode.BANNER_NOT_FOUND);
            } else {
                bannerRepository.deleteById(id);
            }
        }
    }

    @Override
    public Banner show(Long id) {
        Banner banner = bannerRepository.findById(id).orElseThrow(() -> new CommonException(ErrorCode.BANNER_NOT_FOUND));
        banner.setShowStatus(ShowStatus.SHOW);
        return bannerRepository.save(banner);
    }

    @Override
    public Banner hide(Long id) {
        Banner banner = bannerRepository.findById(id).orElseThrow(() -> new CommonException(ErrorCode.BANNER_NOT_FOUND));;
        banner.setShowStatus(ShowStatus.HIDE);
        return bannerRepository.save(banner);
    }
}
