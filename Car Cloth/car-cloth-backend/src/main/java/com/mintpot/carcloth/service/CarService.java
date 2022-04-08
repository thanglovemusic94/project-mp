package com.mintpot.carcloth.service;

import com.mintpot.carcloth.constant.enums.EProductType;
import com.mintpot.carcloth.dto.car.*;
import com.mintpot.carcloth.entity.Company;
import com.mintpot.carcloth.entity.embeddable.FileInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface CarService {

    List<CategoryDetail> getAllCategory();

    void changeCategoryOrder(List<CategoryOrder> orders);

    FileInfo registerCategory(CategoryRegistration dto);

    FileInfo editCategory(CategoryEdit dto);

    void deleteCategory(long id);

    Page<AdminBrandDetail> getBrandByPage(Long categoryId, String term, Pageable pageable);

    FileInfo registerBrand(BrandRegistration dto);

    FileInfo updateBrand(BrandRegistration dto);

    void deleteBrand(long id);

    Page<CarTypeDetail> getCarTypeByPage(EProductType productType, Long brandId, Long modelId,
                                         Long carTypeId, Pageable pageable);

    FileInfo updateCarType(CarTypeRegistration dto);

    void registerCarType(MultipartFile file) throws IOException;

    void deleteCarType(long id);

    List<BrandInfo> getAllBrand();

    Page<BrandInfo> getAllBrand(Pageable pageable);

    Page<BrandInfo> getAllBrandsByCategoryId(long categoryId, Pageable pageable);

    BrandDetail getBrandDetail(long id);

    List<ModelInfo> getAllModelByBrandId(long brandId);

    Page<ModelInfo> getAllModelByBrandId(long brandId, Pageable pageable);

    Page<ModelInfo> searchModelsByName(String term, Pageable pageable);

    List<CarTypeInfo> getAllCarTypeByModelId(long modelId);

    Page<CarTypeInfo> getAllCarTypeByModelId(long modelId, Pageable pageable);

    void registerMyCar(MyCarRegistration dto);
}
