package com.mintpot.busking.service;

import com.mintpot.busking.dto.AnnouncementDTO;
import com.mintpot.busking.dto.PageResponse;
import com.mintpot.busking.dto.SliceDto;
import com.mintpot.busking.dto.api.AnnouncementInfoDto;
import com.mintpot.busking.model.Announcement;
import org.springframework.data.domain.Pageable;

public interface AnnouncementService {

    SliceDto<AnnouncementInfoDto> getAllAnnouncement (Pageable pageable);
    PageResponse<AnnouncementDTO> findAllActivated(Pageable pageable);
    AnnouncementDTO findById(Integer id);
    AnnouncementDTO create(AnnouncementDTO dto);
    AnnouncementDTO update(AnnouncementDTO dto, Integer id);
    void delete(Integer id);

}
