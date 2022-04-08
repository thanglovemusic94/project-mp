package com.mintpot.pii.controller.admin;

import com.mintpot.pii.dto.ProductDto;
import com.mintpot.pii.dto.ProductRpDto;
import com.mintpot.pii.repository.ProductRepository;
import com.mintpot.pii.s3.dto.PresignedImagesInfoDto;
import com.mintpot.pii.service.ProductAdminService;
import io.swagger.annotations.Api;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/* @author linhnc@mintpot.vn */

@Log4j2
@RestController
@RequestMapping("/api/admin/product")
@Api(tags = {"Admin-Product", "Product Management"})
//@PreAuthorize("hasAnyRole('ADMIN')")
@RequiredArgsConstructor
public class ProductAdminController {

    private final ProductAdminService productService;
    private final ProductRepository productRepo;

    @GetMapping
    public Slice<ProductRpDto> listProduct(Pageable pageable) {
        return productService.listProduct(pageable);
    }

    @GetMapping("/searchProduct")
    public Slice<ProductRpDto> searchProduct(@RequestParam String term, Pageable pageable) {
        return productService.searchProduct(term, pageable);
    }

    @DeleteMapping("/{productId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<?> deleteProduct(@PathVariable final long productId) {
        productRepo.deleteById(productId);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{productId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateProduct(@PathVariable long productId, @RequestBody ProductDto productDto) {
        productDto.setId(productId);
        productService.updateProduct(productDto);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PresignedImagesInfoDto createProduct(@RequestBody @Valid ProductDto productDto) {
        return productService.createProduct(productDto);
    }
}