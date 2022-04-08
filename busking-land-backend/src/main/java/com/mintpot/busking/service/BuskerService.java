package com.mintpot.busking.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.mintpot.busking.dto.PageResponse;
import com.mintpot.busking.dto.api.BuskerRegDto;
import com.mintpot.busking.dto.web.BuskerInfoDTO;
import com.mintpot.busking.dto.web.request.BuskerInfoDTOEdit;
import com.mintpot.busking.dto.web.response.BuskerInfoWebDTO;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface BuskerService {

    void registerBusker(BuskerRegDto regDto);

    void editBusker(BuskerRegDto regDto);

    void activeBusker(int buskerId);

    PageResponse<BuskerInfoDTO> findAllBySearch(Pageable pageable, String keyword);

    BuskerInfoDTOEdit findById(Integer id) throws JsonProcessingException;

    PageResponse<BuskerInfoDTO> findUserWaiting(Pageable pageable);

    BuskerInfoWebDTO update(BuskerInfoDTOEdit dto, Integer id);

    void delete(Integer id);

    void reject(Integer id);

    void rejects(List<Integer> ids);

    void approved(Integer id);

    void approveds(List<Integer> ids);


}
