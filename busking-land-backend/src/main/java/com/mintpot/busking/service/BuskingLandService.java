package com.mintpot.busking.service;

import com.mintpot.busking.dto.PageResponse;
import com.mintpot.busking.dto.SliceDto;
import com.mintpot.busking.dto.api.BuskingLandInfoDto;
import com.mintpot.busking.dto.api.BuskingLandRegDto;
import com.mintpot.busking.dto.web.BuskingLandDTO;
import com.mintpot.busking.dto.web.request.BuskingLandEditDTO;
import com.mintpot.busking.dto.web.response.ProvinceDTO;
import com.mintpot.busking.model.City;
import com.mintpot.busking.model.Province;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BuskingLandService {

    SliceDto<Province> getListProvince ();

    SliceDto<City> getListCity (int provinceId);

    SliceDto<BuskingLandInfoDto> getListBuskingLand (int cityId);

    void composeABuskingLand (BuskingLandRegDto regDto);

    List<BuskingLandInfoDto> getListBuskingInNearBy (Double lat, Double lng);

    PageResponse<BuskingLandDTO> findAll(Pageable pageable, String keyword);

    BuskingLandDTO findById(Integer id);

    BuskingLandDTO create(BuskingLandEditDTO dto);

    BuskingLandDTO update(BuskingLandEditDTO dto, Integer id);

    void delete(Integer id);

    void deletes(List<Integer>  ids);

    List<ProvinceDTO> listProvince();

    void removeImageRestaurent(int id);

}
