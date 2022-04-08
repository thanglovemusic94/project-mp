package com.mintpot.busking.service.impl;

import com.mintpot.busking.dto.api.BuskingLandRegDto;
import com.mintpot.busking.model.BuskingLand;
import com.mintpot.busking.model.City;
import com.mintpot.busking.model.Province;
import com.mintpot.busking.model.constant.Status;
import com.mintpot.busking.repository.BuskingLandRepository;
import com.mintpot.busking.repository.CityRepository;
import com.mintpot.busking.repository.ProvinceRepository;
import com.mintpot.busking.service.BuskingLandService;
import com.mintpot.busking.service.BuskingService;
import com.mintpot.busking.service.ExcelImportService;


import lombok.Getter;
import lombok.Setter;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@Service
public class ExcelImportServiceImpl implements ExcelImportService {

    private final BuskingLandRepository buskingLandRepository;

    private final BuskingService buskingService;

    private final BuskingLandService buskingLandService;

    private final CityRepository cityRepository;

    private final ProvinceRepository provinceRepository;

    public ExcelImportServiceImpl(BuskingLandRepository buskingLandRepository, BuskingService buskingService, BuskingLandService buskingLandService, CityRepository cityRepository, ProvinceRepository provinceRepository) {
        this.buskingLandRepository = buskingLandRepository;
        this.buskingService = buskingService;
        this.buskingLandService = buskingLandService;
        this.cityRepository = cityRepository;
        this.provinceRepository = provinceRepository;
    }


    @Override
    public boolean hasExcelFormat(MultipartFile file) {
        return true;
    }

    @Override
    @Transactional
    public void excelLands(InputStream is) {
        try {
            List<BuskingLandEntity> buskingLandEntities = new ArrayList<>();
            Workbook workbook = new XSSFWorkbook(is);
            Sheet sheet = workbook.getSheetAt(workbook.getActiveSheetIndex());
            Iterator<Row> rows = sheet.iterator();
            while (rows.hasNext()) {
                Row currentRow = rows.next();
                try {
                    String cellValue = currentRow.getCell(1).getStringCellValue();
                    if(cellValue.equals("lands")) {
                        BuskingLandEntity entity = new BuskingLandEntity();
                        entity.setAddress(currentRow.getCell(2).getStringCellValue());
                        entity.setCity(currentRow.getCell(3).getStringCellValue());
                        entity.setLat(currentRow.getCell(5).getNumericCellValue());
                        entity.setLng(currentRow.getCell(6).getNumericCellValue());
                        entity.setName(currentRow.getCell(7).getStringCellValue());
                        entity.setState(currentRow.getCell(8).getStringCellValue());
                        entity.setVideo(currentRow.getCell(9).getStringCellValue());
                        buskingLandEntities.add(entity);
                    }
                } catch (Exception ignored) {
                }

            }
            workbook.close();
            saveBuskingLandToDb(buskingLandEntities);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    private void saveBuskingLandToDb (List<BuskingLandEntity> buskingLandEntities) {
        buskingLandRepository.deActiveAllBuskingLand();
        buskingLandEntities.forEach(buskingLandEntity -> {
            Province province = new Province(buskingLandEntity.state);
            Optional<Province> provinceOptional = provinceRepository.findByName(province.getProvinceName());
            if(provinceOptional.isPresent()) {
                province = provinceOptional.get();
            } else {
                province = provinceRepository.save(province);
            }
            City city = new City(buskingLandEntity.getCity(), province);
            Optional<City> cityOptional = cityRepository.findByName(city.getCityName());
            if(cityOptional.isPresent()) {
                city = cityOptional.get();
            } else {
                city = cityRepository.save(city);
            }
            BuskingLandRegDto buskingLandRegDto = new BuskingLandRegDto(buskingLandEntity.name, buskingLandEntity.address, buskingLandEntity.lat, buskingLandEntity.lng, city.getCityId(), buskingLandEntity.video);
            if(!buskingLandRepository.existsByName(buskingLandRegDto.getName())) {
                buskingLandService.composeABuskingLand(buskingLandRegDto);
            } else {
                List<BuskingLand> buskingLandList = buskingLandRepository.searchLandByName(buskingLandRegDto.getName());
                buskingLandList.forEach(buskingLand -> {
                    buskingLand.setStatus(Status.ACTIVATED);
                    // update video
                    buskingLand.setVideo(buskingLandRegDto.getVideo());
                    buskingLandRepository.save(buskingLand);
                });
            }
        });
    }

    @Getter
    @Setter
    private class BuskingLandEntity {

        private String address;

        private String city;

        private Double lat;

        private Double lng;

        private String name;

        private String state;

        private String video;

    }
}
