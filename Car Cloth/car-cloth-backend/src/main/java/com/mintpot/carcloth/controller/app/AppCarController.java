package com.mintpot.carcloth.controller.app;

import com.mintpot.carcloth.dto.car.*;
import com.mintpot.carcloth.service.CarService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/app/car")
@Api(tags = {"App Car"})
@RequiredArgsConstructor
public class AppCarController {

    private final CarService carService;

    @GetMapping("/category")
    @ApiOperation(value = "api for app get all category registered")
    @ResponseStatus(HttpStatus.OK)
    public List<CategoryDetail> getAllCategory() {

        return carService.getAllCategory();
    }

    @GetMapping("/brand")
    @ApiOperation(value = "api for app get page brands registered")
    @ResponseStatus(HttpStatus.OK)
    public Page<BrandInfo> getAllBrands(Pageable pageable) {

        return carService.getAllBrand(pageable);
    }

    @GetMapping("/{categoryId}/brand")
    @ApiOperation(value = "api for app get page brands registered by category id")
    @ResponseStatus(HttpStatus.OK)
    public Page<BrandInfo> getAllBrandsByCategoryId(@PathVariable long categoryId, Pageable pageable) {

        return carService.getAllBrandsByCategoryId(categoryId, pageable);
    }

    @GetMapping("/brand/{id}")
    @ApiOperation(value = "api for app get brand detail")
    @ResponseStatus(HttpStatus.OK)
    public BrandDetail getBrandDetail(@PathVariable long id) {

        return carService.getBrandDetail(id);
    }

    @GetMapping("/{brandId}/model")
    @ApiOperation(value = "api for app get page models by brand id")
    @ResponseStatus(HttpStatus.OK)
    public Page<ModelInfo> getAllModelByBrandId(@PathVariable long brandId, Pageable pageable) {

        return carService.getAllModelByBrandId(brandId, pageable);
    }

    @GetMapping("/model")
    @ApiOperation(value = "api for app search page models by brand name")
    @ResponseStatus(HttpStatus.OK)
    public Page<ModelInfo> searchModelsByName(@RequestParam String term, Pageable pageable) {

        return carService.searchModelsByName(term, pageable);
    }

    @GetMapping("/{modelId}/detail-model")
    @ApiOperation(value = "api for app get page detail models by model id")
    @ResponseStatus(HttpStatus.OK)
    public Page<CarTypeInfo> getAllModelByModelId(@PathVariable long modelId, Pageable pageable) {

        return carService.getAllCarTypeByModelId(modelId, pageable);
    }

    @PostMapping("/my-car")
    @ApiOperation(value = "api for app register my car")
    @ResponseStatus(HttpStatus.CREATED)
    public void registerMyCar(@Valid @RequestBody MyCarRegistration dto) {

        carService.registerMyCar(dto);
    }
}
