package com.mintpot.readingm.backend.service.impl;

import com.mintpot.readingm.backend.dto.admin.magazine.MagazineRqDto;
import com.mintpot.readingm.backend.entity.Magazine;
import com.mintpot.readingm.backend.exception.CommonException;
import com.mintpot.readingm.backend.exception.ErrorCode;
import com.mintpot.readingm.backend.repository.MagazineRepository;
import com.mintpot.readingm.backend.service.MagazineService;
import com.mintpot.storage.LocalStorageService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class MagazineServiceImpl implements MagazineService {

    private final ModelMapper mapper;
    private final MagazineRepository magazineRepository;

    @Autowired
    LocalStorageService storageService;

    public MagazineServiceImpl(ModelMapper mapper, MagazineRepository magazineRepository, MagazineRepository magazineRepository1) {
        this.mapper = mapper;
        this.magazineRepository = magazineRepository1;
    }

    @Override
    public Magazine findById(Long id) {
        Magazine magazine = magazineRepository.findById(id).orElseThrow(() -> new CommonException(ErrorCode.MAGAZINE_NOT_FOUND));
        return magazine;
    }

    @Transactional
    @Override
    public Magazine create(MagazineRqDto dto) throws IOException {
        Magazine magazine = new Magazine();
        mapper.map(dto, magazine);
        magazineRepository.save(magazine);
        if (dto.getImagePc() != null) {
            String imagePcMagazine = "/readingm-bucket/magazines/" + magazine.getId() + "/big-" + dto.getImagePc().getOriginalFilename();
            magazine.setImagePc(imagePcMagazine);
            storageService.uploadFile(dto.getImagePc().getBytes(), imagePcMagazine);
        }

        if (dto.getImageMb() != null) {
            String imageMbMagazine = "/readingm-bucket/magazines/" + magazine.getId() + "/small-" + dto.getImageMb().getOriginalFilename();
            magazine.setImageMb(imageMbMagazine);
            storageService.uploadFile(dto.getImageMb().getBytes(), imageMbMagazine);
        }
        if (dto.getFile() != null) {
            String nameFile = dto.getFile().getOriginalFilename().trim().replaceAll(" +", "_");
            String fileURL = "/readingm-bucket/magazines/" + magazine.getId() + "/" + nameFile;
            magazine.setFile(fileURL);
            storageService.uploadFile(dto.getFile().getBytes(), fileURL);
        }
        return magazineRepository.save(magazine);
    }

    @Transactional
    @Override
    public Magazine update(MagazineRqDto dto, Long id) throws IOException {
        Magazine magazine = magazineRepository.findById(id).orElseThrow(() -> new CommonException(ErrorCode.MAGAZINE_NOT_FOUND));
        magazine.setTitle(dto.getTitle());

        if (dto.getImagePc() != null) {
            String imagePcMagazine = "/readingm-bucket/magazines/" + magazine.getId() + "/big-" + dto.getImagePc().getOriginalFilename();
            magazine.setImagePc(imagePcMagazine);
            storageService.uploadFile(dto.getImagePc().getBytes(), imagePcMagazine);
        }

        if (dto.getImageMb() != null) {
            String imageMbMagazine = "/readingm-bucket/magazines/" + magazine.getId()  + "/small-" + dto.getImageMb().getOriginalFilename();
            magazine.setImageMb(imageMbMagazine);
            storageService.uploadFile(dto.getImageMb().getBytes(), imageMbMagazine);
        }

        if (dto.getFile() != null) {
            String nameFile = dto.getFile().getOriginalFilename().trim().replaceAll(" +", "_");
            String file = "/readingm-bucket/magazines/"  + magazine.getId() + "/"  + nameFile;
            magazine.setFile(file);
            storageService.uploadFile(dto.getFile().getBytes(), file);
        }

        return magazineRepository.save(magazine);
    }

    @Transactional
    @Override
    public void remove(List<Long> ids) {
        for (Long id : ids) {
            Optional<Magazine> magazine = magazineRepository.findById(id);
            if (!magazine.isPresent()) {
                throw new CommonException(ErrorCode.MAGAZINE_NOT_FOUND);
            } else {

                magazineRepository.deleteById(id);
            }
        }
    }
}
