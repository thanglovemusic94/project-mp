package com.mintpot.pii.controller;

import com.mintpot.pii.entity.Product;
import com.mintpot.pii.exception.BusinessException;
import com.mintpot.pii.exception.error.ErrorCode;
import com.mintpot.pii.repository.ProductRepository;
import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/products")
@Api("Product")
public class ProductController {

    private final ProductRepository productRepo;

    public ProductController(ProductRepository productRepo) {
        this.productRepo = productRepo;
    }

    @GetMapping("/{productId}")
    Product getById(@PathVariable long productId) {
        var prdDetails = productRepo.findDetailsById(productId)
                .orElseThrow(() -> new BusinessException(ErrorCode.ENTITY_NOT_FOUND));
        prdDetails.setSubPhotoUrls(productRepo.fetchSubPhotoUrls(productId).orElseThrow(() -> new BusinessException(ErrorCode.ENTITY_NOT_FOUND)).getSubPhotoUrls());
        return prdDetails;
    }
}
