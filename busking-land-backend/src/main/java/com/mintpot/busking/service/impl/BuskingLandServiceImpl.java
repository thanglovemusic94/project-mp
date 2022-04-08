package com.mintpot.busking.service.impl;

import com.mintpot.busking.dto.PageResponse;
import com.mintpot.busking.dto.SliceDto;
import com.mintpot.busking.dto.api.BuskingLandInfoDto;
import com.mintpot.busking.dto.api.BuskingLandNearByDto;
import com.mintpot.busking.dto.api.BuskingLandRegDto;
import com.mintpot.busking.dto.web.BuskingLandDTO;
import com.mintpot.busking.dto.web.RestaurantDTO;
import com.mintpot.busking.dto.web.request.BuskingLandEditDTO;
import com.mintpot.busking.dto.web.response.ProvinceDTO;
import com.mintpot.busking.exception.BusinessException;
import com.mintpot.busking.exception.constant.ErrorCode;
import com.mintpot.busking.model.BuskingLand;
import com.mintpot.busking.model.City;
import com.mintpot.busking.model.Province;
import com.mintpot.busking.model.Restaurant;
import com.mintpot.busking.model.constant.Status;
import com.mintpot.busking.repository.BuskingLandRepository;
import com.mintpot.busking.repository.CityRepository;
import com.mintpot.busking.repository.ProvinceRepository;
import com.mintpot.busking.repository.RestaurantRepository;
import com.mintpot.busking.service.BuskingLandService;
import com.mintpot.busking.service.S3Service;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.net.URL;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class BuskingLandServiceImpl implements BuskingLandService {

    private final ProvinceRepository provinceRepository;

    private final CityRepository cityRepository;

    private final ModelMapper modelMapper;

    private final GeometryFactory geometryFactory;

    private final BuskingLandRepository buskingLandRepository;

    private final RestaurantRepository restaurantRepository;

    @Autowired
    private S3Service s3Service;

    public BuskingLandServiceImpl(ProvinceRepository provinceRepository, CityRepository cityRepository, ModelMapper modelMapper, GeometryFactory geometryFactory, BuskingLandRepository buskingLandRepository, RestaurantRepository restaurantRepository) {
        this.provinceRepository = provinceRepository;
        this.cityRepository = cityRepository;
        this.modelMapper = modelMapper;
        this.geometryFactory = geometryFactory;
        this.buskingLandRepository = buskingLandRepository;
        this.restaurantRepository = restaurantRepository;
    }


    @Override
    public SliceDto<Province> getListProvince() {
        List<Province> provinces = new ArrayList<>();
        provinceRepository.findAll().forEach(province -> {
            if (province.getStatus() == Status.ACTIVATED) {
                provinces.add(province);
            }
        });
        provinces.sort(Comparator.comparing(Province::getProvinceName));
        return SliceDto.of(provinces, false);
    }

    @Override
    public SliceDto<City> getListCity(int provinceId) {
        Slice<City> cities = cityRepository.getCitiesByProvince(provinceId);
        List<City> cityList = new ArrayList<>(cities.getContent());
        cityList.sort(Comparator.comparing(City::getCityName));
        return SliceDto.of(cityList, false);
    }

    @Override
    public SliceDto<BuskingLandInfoDto> getListBuskingLand(int cityId) {
        Slice<BuskingLandInfoDto> buskingLands = buskingLandRepository.getBuskingLandsByCity(cityId);
        List<BuskingLandInfoDto> buskingLandInfoDtoList = new ArrayList<>(buskingLands.getContent());
        buskingLandInfoDtoList.sort(Comparator.comparing(BuskingLandInfoDto::getName));
        return SliceDto.of(buskingLandInfoDtoList, false);
    }

    @Override
    public void composeABuskingLand(BuskingLandRegDto regDto) {
        BuskingLand buskingLand = modelMapper.map(regDto, BuskingLand.class);
        Point point = geometryFactory.createPoint(new Coordinate(regDto.getLat(), regDto.getLng()));
        buskingLand.setLocation(point);
        buskingLand.setCity(new City(regDto.getCity_id()));

        buskingLandRepository.save(buskingLand);
    }

    @Override
    public List<BuskingLandInfoDto> getListBuskingInNearBy(Double lat, Double lng) {
        List<BuskingLandNearByDto> nearByDtoList = buskingLandRepository.findBuskingLandInNearBy(lat, lng);
        List<BuskingLandInfoDto> result = new ArrayList<>();
        nearByDtoList.forEach(nearByDto -> {
            result.add(BuskingLandInfoDto.from(nearByDto));
        });
        return result;
    }

    @Override
    public PageResponse<BuskingLandDTO> findAll(Pageable pageable, String keyword) {
        Page<BuskingLand> buskingLand = buskingLandRepository.findAll(pageable, keyword);
        Page<BuskingLandDTO> dtoPage = buskingLand.map(buskingLand1 -> {
            BuskingLandDTO buskingLandDTO = modelMapper.map(buskingLand1, BuskingLandDTO.class);
            Optional<City> city = cityRepository.findById(buskingLandDTO.getCity().getCityId());
            if (city.isPresent()) {
                Province province = city.get().getProvince();
                com.mintpot.busking.dto.web.ProvinceDTO provinceDTO = modelMapper.map(province, com.mintpot.busking.dto.web.ProvinceDTO.class);
                buskingLandDTO.setProvince(provinceDTO);
            }
            return buskingLandDTO;
        });
        PageResponse<BuskingLandDTO> response = new PageResponse(dtoPage);
        return response;
    }

    @Override
    public BuskingLandDTO findById(Integer id) {
        BuskingLand land = buskingLandRepository.findById(id).orElseThrow(() -> new BusinessException(ErrorCode.NOT_CONTENT));
        if (land.getRestaurants().size() == 0) {
            List<Restaurant> restaurants = new ArrayList<>();
            for (int i = 0; i < 3; i++) {
                Restaurant r = new Restaurant();
                r.setId(null);
                r.setImage("");
                r.setName("");
                r.setStatus(Status.ACTIVATED);
                r.setBuskingLand(land);
                restaurantRepository.save(r);
                restaurants.add(r);
            }
            land.setRestaurants(restaurants);
        }
        BuskingLandDTO landDTO = modelMapper.map(land, BuskingLandDTO.class);
        Optional<City> city = cityRepository.findById(landDTO.getCity().getCityId());
        if (city.isPresent()) {
            Province province = city.get().getProvince();
            com.mintpot.busking.dto.web.ProvinceDTO provinceDTO = modelMapper.map(province, com.mintpot.busking.dto.web.ProvinceDTO.class);
            landDTO.setProvince(provinceDTO);
        }
        return landDTO;
    }


    @Override
    @Transactional
    public BuskingLandDTO create(BuskingLandEditDTO dto) {
        BuskingLand buskingLand = new BuskingLand();
        if (StringUtils.isEmpty(dto.getLandName())) throw new BusinessException(ErrorCode.BUSKING_LAND_MISSING_NAME);
        if (buskingLandRepository.existsByName(dto.getLandName()))
            throw new BusinessException(ErrorCode.BUSKING_LAND_DUPLICATE_NAME);
        if (StringUtils.isEmpty(dto.getAddress())) throw new BusinessException(ErrorCode.BUSKING_LAND_MISSING_ADDRESS);

        int cityId = dto.getCityId();
        cityRepository.findById(cityId).orElseThrow(() -> new BusinessException(ErrorCode.BUSKING_LAND_MISSING_CITY));
        buskingLand.setCity(new City(cityId));

        buskingLand.setName(dto.getLandName());
        buskingLand.setAddress(dto.getAddress());
        buskingLand.setVideo(dto.getVideo());
        buskingLand.setStatus(Status.ACTIVATED);
        buskingLand.setLat(dto.getLatAsDouble(dto.getLat()));
        buskingLand.setLng(dto.getLatAsDouble(dto.getLng()));

        Province province = provinceRepository.findById(dto.getProvinceId()).get();
        City city = cityRepository.findById(dto.getCityId()).get();
        city.setProvince(province);

        buskingLand.setCity(city);

        Point point = geometryFactory.createPoint(new Coordinate(dto.getLatAsDouble(dto.getLat()),dto.getLatAsDouble(dto.getLng())));
        buskingLand.setLocation(point);

        if (dto.getRestaurants() != null && dto.getRestaurants().size() > 0) {
            List<Restaurant> restaurants = new ArrayList<>();
            for (int i = 0; i <= dto.getRestaurants().size() - 1; i++) {
                Restaurant restaurant = new Restaurant();
                restaurant.setId(null);
                restaurant.setName(dto.getRestaurants().get(i).getName());
                restaurant.setImage(dto.getRestaurants().get(i).getImage());
                restaurant.setUrl(dto.getRestaurants().get(i).getUrl());
                restaurant.setStatus(Status.ACTIVATED);
                restaurant.setBuskingLand(buskingLand);
                restaurants.add(restaurant);
            }
            buskingLand.setRestaurants(restaurants);
        }

        buskingLandRepository.save(buskingLand);
        BuskingLandDTO buskingLandDTO = modelMapper.map(buskingLand, BuskingLandDTO.class);
        return buskingLandDTO;
    }

    @Override
    @Transactional
    public BuskingLandDTO update(BuskingLandEditDTO dto, Integer id) {
        if (StringUtils.isEmpty(dto.getLandName())) throw new BusinessException(ErrorCode.BUSKING_LAND_MISSING_NAME);
        if (StringUtils.isEmpty(dto.getAddress())) throw new BusinessException(ErrorCode.BUSKING_LAND_MISSING_ADDRESS);
        BuskingLand buskingLand = buskingLandRepository.findById(id).orElseThrow(() -> new BusinessException(ErrorCode.NOT_CONTENT));
        if (buskingLandRepository.existsByName(dto.getLandName())){
            if (dto.getLandName().equals(buskingLand.getName()) == false){
                throw new BusinessException(ErrorCode.BUSKING_LAND_DUPLICATE_NAME);
            }else {
                buskingLand.setName(dto.getLandName());
            }
        }else {
            buskingLand.setName(dto.getLandName());
        }
        buskingLand.setAddress(dto.getAddress());
        buskingLand.setVideo(dto.getVideo());

        buskingLand.setLat(dto.getLatAsDouble(dto.getLat()));
        buskingLand.setLng(dto.getLatAsDouble(dto.getLng()));

        Point point = geometryFactory.createPoint(new Coordinate(dto.getLatAsDouble(dto.getLat()), dto.getLatAsDouble(dto.getLng())));
        buskingLand.setLocation(point);

        Province province = provinceRepository.findById(dto.getProvinceId()).get();
        Set<City> cities = province.getCities().stream().filter(city -> city.getStatus() == Status.ACTIVATED).collect(Collectors.toSet());
        province.setCities(cities);

        City city = cityRepository.findById(dto.getCityId()).get();
        city.setProvince(province);
        buskingLand.setCity(city);

        List<Restaurant> restaurants = new ArrayList<>(3);
        for (int i = 0; i <= dto.getRestaurants().size() - 1; i++) {
            Restaurant restaurant = restaurantRepository.findById(dto.getRestaurants().get(i).getId()).orElseThrow(() -> new BusinessException(ErrorCode.RESTAURENT_NOT_EXIT));
            restaurant.setName(dto.getRestaurants().get(i).getName());
            restaurant.setImage(dto.getRestaurants().get(i).getImage());
            restaurant.setUrl(dto.getRestaurants().get(i).getUrl());
            restaurant.setBuskingLand(buskingLand);
            restaurants.add(restaurant);
        }
        buskingLand.setRestaurants(restaurants);
        buskingLandRepository.save(buskingLand);
        BuskingLandDTO buskingLandDTO = modelMapper.map(buskingLand, BuskingLandDTO.class);
        return buskingLandDTO;
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        BuskingLand bl = buskingLandRepository.findById(id).orElseThrow(() -> new BusinessException(ErrorCode.NOT_CONTENT));
        bl.setStatus(Status.DELETED);
        bl.getRestaurants().forEach(rt -> {
            rt.setStatus(Status.DELETED);
            rt.setBuskingLand(bl);
        });
        buskingLandRepository.save(bl);
    }

    @Override
    @Transactional
    public void deletes(List<Integer> ids) {
        ids.forEach(id -> {
            delete(id);
        });
    }

    @Override
    public List<ProvinceDTO> listProvince() {
        List<Province> provinces = provinceRepository.getListProvince();
        List<ProvinceDTO> provinceDTOS = provinces.stream().map(province -> {
            return modelMapper.map(province, ProvinceDTO.class);
        }).collect(Collectors.toList());
        return provinceDTOS;
    }

    @Override
    public void removeImageRestaurent(int id) {
        Restaurant res = restaurantRepository.findById(id).get();
        String image = res.getImage();
        if (!StringUtils.isEmpty(image)) {
            s3Service.deleteImageByKey(image);
            res.setImage("");
            restaurantRepository.save(res);
        }
    }
}
