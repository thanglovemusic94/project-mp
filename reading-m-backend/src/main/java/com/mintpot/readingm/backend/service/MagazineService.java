package com.mintpot.readingm.backend.service;

import com.mintpot.readingm.backend.dto.admin.magazine.MagazineRqDto;
import com.mintpot.readingm.backend.entity.Magazine;

import java.io.IOException;
import java.util.List;

public interface MagazineService{
    Magazine findById(Long id);
    Magazine create(MagazineRqDto magazineDTO) throws IOException;
    Magazine update(MagazineRqDto magazineDTO, Long id) throws IOException;
    void remove(List<Long> id);
}
