package com.mintpot.readingm.backend.service;

import com.mintpot.readingm.backend.dto.admin.PointDto;
import com.mintpot.readingm.backend.dto.admin.SavePointDto;
import com.mintpot.readingm.backend.entity.Point;
import com.mintpot.readingm.backend.entity.constant.PointType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;


public interface PointService {
    Page<PointDto> find(PointType type, String optionSearch, String term, Pageable page);

    void editPoint(Long id, SavePointDto dto);

    void addPoint(SavePointDto dto);

    void removePoint(List<Long> ids);

    SavePointDto findById(Long id);
}
