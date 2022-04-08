package com.mintpot.busking.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.mintpot.busking.dto.PageResponse;
import com.mintpot.busking.dto.api.BuskerRegDto;
import com.mintpot.busking.dto.web.BuskerInfoDTO;
import com.mintpot.busking.dto.web.request.BuskerInfoDTOEdit;
import com.mintpot.busking.dto.web.response.BuskerInfoWebDTO;
import com.mintpot.busking.exception.BusinessException;
import com.mintpot.busking.exception.constant.ErrorCode;
import com.mintpot.busking.facade.AuthenticationFacade;
import com.mintpot.busking.model.BuskerInfo;
import com.mintpot.busking.model.User;
import com.mintpot.busking.model.constant.BuskerStatus;
import com.mintpot.busking.repository.BuskerRepository;
import com.mintpot.busking.repository.UserRepository;
import com.mintpot.busking.service.BuskerService;
import com.mintpot.busking.service.EmailService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.apache.commons.lang3.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

@Service
public class BuskerServiceImpl implements BuskerService {

    private final BuskerRepository buskerRepository;

    private final AuthenticationFacade authenticationFacade;

    private final ModelMapper modelMapper;

    private final EmailService emailService;

    @Autowired
    private UserRepository userRepository;

    public BuskerServiceImpl(BuskerRepository buskerRepository, AuthenticationFacade authenticationFacade, ModelMapper modelMapper, EmailService emailService) {
        this.buskerRepository = buskerRepository;
        this.authenticationFacade = authenticationFacade;
        this.modelMapper = modelMapper;
        this.emailService = emailService;
    }


    @Override
    public void registerBusker(BuskerRegDto regDto) {
        int userId = authenticationFacade.getAuthentication().getUserId();
        Optional<BuskerInfo> buskerInfoOptional = buskerRepository.getBuskerInfoByUser(userId);
        if (buskerInfoOptional.isPresent()) {
            BuskerInfo buskerInfo = buskerInfoOptional.get();
            if(buskerInfo.getStatus() != BuskerStatus.END) {
                throw new BusinessException(ErrorCode.BUSKER_EXIST);
            } else {
                // Busker Reject >> and Request Make Busker Again
                registerBuskerAgain(buskerInfo, regDto);
                return;
            }
        }

        validate(regDto);
        BuskerInfo buskerInfo = modelMapper.map(regDto, BuskerInfo.class);
        buskerInfo.setUser(new User(userId));
        buskerInfo.setPerformanceVideos(new Gson().toJson(regDto.getPerformanceVideos()));
        if (regDto.getListGenre() != null && regDto.getListGenre().size() > 0) {
            buskerInfo.setListFavoriteId(regDto.getListGenre());
        }
        buskerRepository.save(buskerInfo);
    }

    private void registerBuskerAgain (BuskerInfo buskerInfo, BuskerRegDto regDto) {
        validate(regDto);
        buskerInfo.setAvatar(regDto.getAvatar());
        buskerInfo.setName(regDto.getName());
        buskerInfo.setActivityCity(regDto.getActivityCity());
        buskerInfo.setPerformanceVideos(new Gson().toJson(regDto.getPerformanceVideos()));
        if (regDto.getListGenre() != null && regDto.getListGenre().size() > 0) {
            buskerInfo.setListFavoriteId(regDto.getListGenre());
        }
        buskerInfo.setStatus(BuskerStatus.IN_ACTIVE);
        buskerRepository.save(buskerInfo);
    }




    @Override
    public void editBusker(BuskerRegDto regDto) {
        int userId = authenticationFacade.getAuthentication().getUserId();
        Optional<BuskerInfo> buskerInfoOptional = buskerRepository.getBuskerInfoByUser(userId);
        if (buskerInfoOptional.isEmpty()) throw new BusinessException(ErrorCode.BUSKER_NOT_FOUND);
        BuskerInfo buskerInfo = buskerInfoOptional.get();
        if (buskerInfo.getUser().getId() != userId) throw new BusinessException(ErrorCode.INSUFFICIENT_PRIVILEGE);

        if (!StringUtils.isEmpty(regDto.getAvatar())) {
            buskerInfo.setAvatar(regDto.getAvatar());
        }

        if (!StringUtils.isEmpty(regDto.getName())) {
            buskerInfo.setName(regDto.getName());
        }

        if (!StringUtils.isEmpty(regDto.getActivityCity())) {
            buskerInfo.setActivityCity(regDto.getActivityCity());
        }

        if (regDto.getPerformanceVideos() != null) {
            String videos = new Gson().toJson(regDto.getPerformanceVideos());
            buskerInfo.setPerformanceVideos(videos);
        }

        if (regDto.getListGenre() != null && regDto.getListGenre().size() > 0) {
            buskerInfo.setListFavoriteId(regDto.getListGenre());
        }
        buskerRepository.save(buskerInfo);
    }

    @Override
    public void activeBusker(int buskerId) {
        Optional<BuskerInfo> buskerInfoOptional = buskerRepository.findById(buskerId);
        if (buskerInfoOptional.isEmpty()) throw new BusinessException(ErrorCode.BUSKER_NOT_FOUND);
        buskerInfoOptional.get().setStatus(BuskerStatus.ACTIVE);
        buskerRepository.save(buskerInfoOptional.get());
    }

    @Override
    public PageResponse<BuskerInfoDTO> findAllBySearch(Pageable pageable, String keyword) {
        if (keyword.trim().isEmpty()) keyword = null;
        Page<BuskerInfo> buskerInfoPage = buskerRepository.findAllBySearch(pageable, keyword);
        Page<BuskerInfoDTO> userDtoPage = buskerInfoPage.map(new Function<BuskerInfo, BuskerInfoDTO>() {
            @Override
            public BuskerInfoDTO apply(BuskerInfo buskerInfo) {
                BuskerInfoDTO dto = modelMapper.map(buskerInfo, BuskerInfoDTO.class);
                return dto;
            }
        });
        PageResponse<BuskerInfoDTO> response = new PageResponse(userDtoPage);
        return response;
    }


    @Override
    public BuskerInfoDTOEdit findById(Integer id) throws JsonProcessingException {
        BuskerInfo buskerInfo = buskerRepository.findBuskerInfoById(id).orElseThrow(() -> new BusinessException(ErrorCode.BUSKER_NOT_FOUND));
        BuskerInfoDTOEdit dto = modelMapper.map(buskerInfo, BuskerInfoDTOEdit.class);
        String videos = buskerInfo.getPerformanceVideos();
        ObjectMapper objectMapper = new ObjectMapper();
        String[] arrayVideo = objectMapper.readValue(videos, String[].class);
        List<String> listVideo = Arrays.asList(arrayVideo);
        dto.setPerformanceVideos(listVideo);
        return dto;
    }


    @Override
    public PageResponse<BuskerInfoDTO> findUserWaiting(Pageable pageable) {
        Page<BuskerInfo> buskerInfos = buskerRepository.findUserWaiting(pageable);
        Page<BuskerInfoDTO> buskerInfoDTOS = buskerInfos.map(new Function<BuskerInfo, BuskerInfoDTO>() {
            @Override
            public BuskerInfoDTO apply(BuskerInfo buskerInfo) {
                return modelMapper.map(buskerInfo, BuskerInfoDTO.class);
            }
        });
        return new PageResponse<>(buskerInfoDTOS);
    }

    @Override
    @Transactional
    public BuskerInfoWebDTO update(BuskerInfoDTOEdit dto, Integer id) {
        BuskerInfo buskerInfo = buskerRepository.findById(id).orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_EXIST));
        buskerInfo.setName(dto.getName());
        buskerInfo.setActivityCity(dto.getActivityCity());
        buskerInfo.setPerformanceVideos(new Gson().toJson(dto.getPerformanceVideos()));
        buskerInfo.setName(dto.getName());
        User u = buskerInfo.getUser();

        ArrayList<ErrorCode> errorCodes = new ArrayList<>();

        if (!StringUtils.isEmpty(dto.getUser().getEmail())){
            if (userRepository.existsByEmail(dto.getUser().getEmail()) ){
                if (dto.getUser().getEmail().equals(u.getEmail()) == false){
                    errorCodes.add(ErrorCode.BUSKER_ALREADY_REGISTERED_EMAIL);
                }
            }else {
                u.setEmail(dto.getUser().getEmail());
            }
        }

        if (!StringUtils.isEmpty(dto.getUser().getPhone())){
            if (userRepository.existsByPhone(dto.getUser().getPhone())){
                if (dto.getUser().getPhone().equals(u.getPhone()) == false){
                    errorCodes.add(ErrorCode.BUSKER_ALREADY_REGISTERED_PHONE);
                }
            }else {
                u.setPhone(dto.getUser().getPhone());
            }
        }

        if(errorCodes.size() > 0) {
            throw new BusinessException(HttpStatus.BAD_REQUEST, errorCodes);
        }

        u.setPointAmount(dto.getUser().getPointAmount());
        userRepository.save(u);

        BuskerInfoWebDTO buskerInfoDTOEdit = modelMapper.map(buskerInfo, BuskerInfoWebDTO.class);
        return buskerInfoDTOEdit;
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        BuskerInfo buskerInfo = buskerRepository.findBuskerInfoById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.BUSKER_NOT_FOUND));
        buskerInfo.setStatus(BuskerStatus.END);
        buskerRepository.save(buskerInfo);
    }

    @Override
    public void reject(Integer id) {
        BuskerInfo buskerInfo = buskerRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.BUSKER_NOT_FOUND));
        buskerInfo.setStatus(BuskerStatus.END);
        buskerRepository.save(buskerInfo);
        emailService.rejectBusker(id);
    }

    @Override
    @Transactional
    public void rejects(List<Integer> ids) {
        ids.forEach(integer -> {
            reject(integer);
        });
    }

    @Override
    @Transactional
    public void approved(Integer id) {
        BuskerInfo buskerInfo = buskerRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.BUSKER_NOT_FOUND));
        buskerInfo.setStatus(BuskerStatus.ACTIVE);
        buskerRepository.save(buskerInfo);
        emailService.approveBusker(id);
    }

    @Override
    @Transactional

    public void approveds(List<Integer> ids) {
        ids.forEach(integer -> {
            approved(integer);
        });
    }

    private void validate(BuskerRegDto buskerInfo) {
        if (buskerInfo.getAvatar().isEmpty()) throw new BusinessException(ErrorCode.BUSKER_NOT_VALIDATE);
        if (buskerInfo.getActivityCity().isEmpty()) throw new BusinessException(ErrorCode.BUSKER_NOT_VALIDATE);
        if (buskerInfo.getName().isEmpty()) throw new BusinessException(ErrorCode.BUSKER_NOT_VALIDATE);
        if (buskerInfo.getListGenre().size() == 0) throw new BusinessException(ErrorCode.BUSKER_NOT_VALIDATE);
    }
}
