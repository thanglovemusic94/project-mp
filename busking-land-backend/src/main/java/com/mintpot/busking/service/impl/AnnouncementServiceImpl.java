package com.mintpot.busking.service.impl;

import com.mintpot.busking.dto.AnnouncementDTO;
import com.mintpot.busking.dto.PageResponse;
import com.mintpot.busking.dto.mapper.AnnouncementMapper;
import com.mintpot.busking.exception.BusinessException;
import com.mintpot.busking.exception.constant.ErrorCode;
import com.mintpot.busking.model.Announcement;
import com.mintpot.busking.model.constant.Status;
import com.mintpot.busking.repository.AnnouncementRepository;
import com.mintpot.busking.repository.UserRepository;
import com.mintpot.busking.security.services.UserDetailsImpl;
import com.mintpot.busking.service.AnnouncementService;
import com.mintpot.busking.service.FCMService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;
import com.mintpot.busking.dto.SliceDto;
import com.mintpot.busking.dto.api.AnnouncementInfoDto;
import com.mintpot.busking.model.Announcement;
import com.mintpot.busking.repository.AnnouncementRepository;
import com.mintpot.busking.service.AnnouncementService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class AnnouncementServiceImpl implements AnnouncementService {

    @Autowired
    private AnnouncementRepository announcementRepository;

    @Autowired
    private AnnouncementMapper announcementMapper;

    @Autowired
    private UserRepository userRepository;

    private final FCMService fcmService;

    private final ModelMapper mapper;

    public AnnouncementServiceImpl(FCMService fcmService, ModelMapper mapper) {
        this.fcmService = fcmService;
        this.mapper = mapper;
    }

    @Override
    public SliceDto<AnnouncementInfoDto> getAllAnnouncement(Pageable pageable) {
        Slice<Announcement> announcementServices = announcementRepository.getAllActivated(pageable);
        List<AnnouncementInfoDto> result = new ArrayList<>();
        announcementServices.forEach(announcement -> {
            result.add(mapper.map(announcement, AnnouncementInfoDto.class));
        });
        return SliceDto.of(result, announcementServices.hasNext());
    }

    @Override
    public PageResponse<AnnouncementDTO> findAllActivated(Pageable pageable) {
        Page<Announcement> pagedResult = announcementRepository.findAllActivated(pageable);

//        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        var user = userRepository.findByName(userDetails.getUsername()).orElseThrow(() -> new BusinessException(ErrorCode.ADMIN_NOT_EXIT));

        Page<AnnouncementDTO> dtoPage = pagedResult.map(new Function<Announcement, AnnouncementDTO>() {
            @Override
            public AnnouncementDTO apply(Announcement announcement) {
                AnnouncementDTO announcementDTO = announcementMapper.toDTO(announcement);
                announcementDTO.setUsername("admin");
                return announcementDTO;
            }
        });
        return new PageResponse<>(dtoPage);
    }

    @Override
    public AnnouncementDTO findById(Integer id) {
        if (announcementRepository.existsById(id)){
            Announcement announcement = announcementRepository.findById(id).orElseThrow(() -> new BusinessException(ErrorCode.NOT_CONTENT));

            AnnouncementDTO announcementDTO = announcementMapper.toDTO(announcement);
//            UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//            var user = userRepository.findByName(userDetails.getUsername()).orElseThrow(() -> new BusinessException(ErrorCode.ADMIN_NOT_EXIT));
            announcementDTO.setUsername("admin");
            return announcementDTO;
        }else {
            new BusinessException(ErrorCode.ANNOUNCEMENT_NOT_FOUND);
        }
        return null;
    }

    @Override
    @Transactional
    public AnnouncementDTO create(AnnouncementDTO dto) {
        Announcement announcement = announcementMapper.toEntity(dto);
        announcement.setId(null);
        announcement.setStatus(Status.ACTIVATED);
        announcementRepository.save(announcement);

        AnnouncementDTO announcementDTO = announcementMapper.toDTO(announcement);
        announcementDTO.setUsername("admin");

        fcmService.broadcastAnnouncementCreated();
        return announcementDTO;
    }


    @Override
    @Transactional
    public AnnouncementDTO update(AnnouncementDTO dto, Integer id) {
        if (announcementRepository.existsById(id)){
            Announcement announcement = announcementMapper.toEntity(dto);
            announcement.setId(id);
            announcement.setStatus(Status.ACTIVATED);
            announcementRepository.save(announcement);

            AnnouncementDTO announcementDTO = announcementMapper.toDTO(announcement);
            announcementDTO.setUsername("admin");

            return announcementDTO;
        }else {
            new BusinessException(ErrorCode.ANNOUNCEMENT_NOT_FOUND);
            return null;
        }
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        if (announcementRepository.existsById(id)){
            announcementRepository.deleteById(id);
        }else {
            new BusinessException(ErrorCode.ANNOUNCEMENT_NOT_FOUND);
        }
    }


}
