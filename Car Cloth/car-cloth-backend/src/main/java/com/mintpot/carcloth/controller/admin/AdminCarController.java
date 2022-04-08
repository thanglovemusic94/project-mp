package com.mintpot.carcloth.controller.admin;

import com.mintpot.carcloth.constant.enums.EProductType;
import com.mintpot.carcloth.dto.car.*;
import com.mintpot.carcloth.entity.embeddable.FileInfo;
import com.mintpot.carcloth.service.CarService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/admin/car")
@Api(tags = {"Admin Car"})
@RequiredArgsConstructor
public class AdminCarController {

    private final CarService carService;

    @GetMapping("/category")
    @ApiOperation(value = "api for admin get all category")
    @ResponseStatus(HttpStatus.OK)
    public List<CategoryDetail> getAllCategory() {

        return carService.getAllCategory();
    }

    @PutMapping("/category/order")
    @ApiOperation(value = "api for admin change order category")
    @ResponseStatus(HttpStatus.OK)
    public void changeOrder(@RequestBody List<CategoryOrder> orders) {

        carService.changeCategoryOrder(orders);
    }

    @PostMapping("/category")
    @ApiOperation(value = "api for admin register new a category")
    @ResponseStatus(HttpStatus.OK)
    public FileInfo register(@RequestBody CategoryRegistration dto) {

        return carService.registerCategory(dto);
    }

    @PutMapping("/category/edit")
    @ApiOperation(value = "api for admin edit a category")
    @ResponseStatus(HttpStatus.OK)
    public FileInfo update(@RequestBody CategoryEdit dto) {

        return carService.editCategory(dto);
    }

    @DeleteMapping("/category/{id}")
    @ApiOperation(value = "api for admin delete a category")
    @ResponseStatus(HttpStatus.OK)
    public void deleteCategory(@PathVariable long id) {

        carService.deleteCategory(id);
    }

    @GetMapping("/brand")
    @ApiOperation(value = "api for admin brand management and detail")
    @ResponseStatus(HttpStatus.OK)
    public Page<AdminBrandDetail> getBrandByPage(@RequestParam(required = false) Long categoryId,
                                                 @RequestParam(required = false) String term,
                                                 Pageable pageable) {

        return carService.getBrandByPage(categoryId, term, pageable);
    }

    @GetMapping("/brand/list")
    @ApiOperation(value = "api for admin get all brand list")
    @ResponseStatus(HttpStatus.OK)
    public List<BrandInfo> getAllBrands() {

        return carService.getAllBrand();
    }

    @PostMapping("/brand")
    @ApiOperation(value = "api for admin register new a brand")
    @ResponseStatus(HttpStatus.CREATED)
    public FileInfo register(@Valid @RequestBody BrandRegistration dto) {

        return carService.registerBrand(dto);
    }

    @PutMapping("/brand")
    @ApiOperation(value = "api for admin update a brand")
    @ResponseStatus(HttpStatus.OK)
    public FileInfo update(@Valid @RequestBody BrandRegistration dto) {

        return carService.updateBrand(dto);
    }

    @DeleteMapping("/brand/{id}")
    @ApiOperation(value = "api for admin delete a brand")
    @ResponseStatus(HttpStatus.OK)
    public void deleteBrand(@PathVariable long id) {

        carService.deleteBrand(id);
    }

    @GetMapping("/{brandId}/model")
    @ApiOperation(value = "api for app get all models by brand id")
    @ResponseStatus(HttpStatus.OK)
    public List<ModelInfo>  getAllModelByBrandId(@PathVariable long brandId) {

        return carService.getAllModelByBrandId(brandId);
    }

    @GetMapping("/{modelId}/car-type")
    @ApiOperation(value = "api for admin get all car types by model id")
    @ResponseStatus(HttpStatus.OK)
    public List<CarTypeInfo>  getAllModelByModelId(@PathVariable long modelId) {

        return carService.getAllCarTypeByModelId(modelId);
    }

    @GetMapping("/car-type")
    @ApiOperation(value = "api for admin car type list")
    @ResponseStatus(HttpStatus.OK)
    public Page<CarTypeDetail> getBrandByPage(@RequestParam(required = false) EProductType productType,
                                              @RequestParam(required = false) Long brandId,
                                              @RequestParam(required = false) Long modelId,
                                              @RequestParam(required = false) Long carTypeId,
                                              Pageable pageable) {

        return carService.getCarTypeByPage(productType, brandId, modelId,carTypeId, pageable);
    }

    @PostMapping(value="/car-type", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    @ApiOperation(value = "api for admin register car type by file upload")
    @ResponseStatus(HttpStatus.CREATED)
    public void register(@RequestParam MultipartFile file) throws IOException {

        carService.registerCarType(file);
    }

    @PutMapping("/car-type")
    @ApiOperation(value = "api for admin update a car type")
    @ResponseStatus(HttpStatus.OK)
    public FileInfo update(@Valid @RequestBody CarTypeRegistration dto) {

        return carService.updateCarType(dto);
    }

    @DeleteMapping("/car-type/{id}")
    @ApiOperation(value = "api for admin delete a brand")
    @ResponseStatus(HttpStatus.OK)
    public void deleteCarType(@PathVariable long id) {

        carService.deleteCarType(id);
    }
}
