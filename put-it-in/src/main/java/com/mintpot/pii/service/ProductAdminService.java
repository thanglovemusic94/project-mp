package com.mintpot.pii.service;

import com.mintpot.pii.dto.ProductDto;
import com.mintpot.pii.dto.ProductRpDto;
import com.mintpot.pii.s3.dto.PresignedImagesInfoDto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

/* @author LinhNC */
public interface ProductAdminService {

    public Slice<ProductRpDto> listProduct(Pageable pageable);
    public PresignedImagesInfoDto createProduct(ProductDto productDto);
    public Slice<ProductRpDto> searchProduct(String term, Pageable pageable);
    public void updateProduct(ProductDto productDto);
}
