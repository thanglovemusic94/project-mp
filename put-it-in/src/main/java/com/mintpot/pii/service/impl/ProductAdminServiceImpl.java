package com.mintpot.pii.service.impl;
import com.mintpot.pii.dto.ProductDto;
import com.mintpot.pii.dto.ProductRpDto;
import com.mintpot.pii.entity.Product;
import com.mintpot.pii.entity.Branch;
import com.mintpot.pii.service.ProductAdminService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Service;
import com.mintpot.pii.repository.ProductRepository;
import com.mintpot.pii.s3.dto.PresignedImagesInfoDto;
import com.mintpot.pii.service.ImageService;

import java.util.List;
import java.util.stream.Collectors;

/* @author LinhNC */
@Service
@Log4j2
@RequiredArgsConstructor
public class ProductAdminServiceImpl implements ProductAdminService{

    private final ProductRepository productRepo;
    private final ImageService imageService;
    @Override
    public Slice<ProductRpDto> listProduct(Pageable pageable) {
        Slice<Product> product = productRepo.findAll(pageable);
        List<ProductRpDto> content = product.get().map(m-> new ProductRpDto(m)).collect(Collectors.toList());
        Slice<ProductRpDto> sProduct = new SliceImpl(content, product.getPageable(), product.hasNext());
        return sProduct;
    }
    
    @Override
    public Slice<ProductRpDto> searchProduct(String term, Pageable pageable) {
        Slice<Product> product = productRepo.findAllByTerm(term, pageable);
        List<ProductRpDto> content = product.get().map(item-> new ProductRpDto(item)).collect(Collectors.toList());
        Slice<ProductRpDto> productRP = new SliceImpl(content, product.getPageable(), product.hasNext());
        return productRP;
    }
    
    @Override
    public void updateProduct(ProductDto product) {
    Product productOld = productRepo.getOne(product.getId());
//        if (product.getCode() != null ) productOld.setCode(product.getCode()); //code is read only
        if (product.getName() != null ) productOld.setName(product.getName());
        if (product.getSize() != null ) productOld.setSize(product.getSize().toEntityEmbeded());
        if (product.getPrice() != null ) productOld.setPrice(product.getPrice());
        if (product.getDeposit() != null ) productOld.setDeposit(product.getDeposit());
        if (product.getPeriodDiscounts() != null ) productOld.setPeriodDiscounts(product.getPeriodDiscounts().stream().map(pdto->pdto.toEntityEmbeded()).collect(Collectors.toList()));
        if (product.getQuantity() != null ) productOld.setQuantity(product.getQuantity());
        if (product.getPurchaseLimit() != null ) productOld.setPurchaseLimit(product.getPurchaseLimit());
        if (product.getAvailDays() != null ) productOld.setAvailDays(product.getAvailDays());
        if (product.getMinUsage() != null ) productOld.setMinUsage(product.getMinUsage());
        if (product.getMainPhotoUrl() != null ) productOld.setMainPhotoUrl(product.getMainPhotoUrl());        
        if (product.getSubPhotoUrls() != null ) productOld.setSubPhotoUrls(product.getSubPhotoUrls());        
        if (product.getBranchId()!= null ) productOld.setBranch(new Branch(product.getBranchId()));
        productRepo.save(productOld);
    }
    
    @Override
    public PresignedImagesInfoDto createProduct(ProductDto productDto) {
        Product pEntity = productDto.toEntity();
        productRepo.save(pEntity);        
        // fetch from db after save
        Product pFetch = productRepo.getOne(pEntity.getId());
        Branch branch = pFetch.getBranch();
        List<String> productSubUrl = imageService.generateProductSubPhotoUrls(branch.getCompany().getCode(),branch.getCode(), pFetch.getCode(),productDto.getImageCount());
        pFetch.setSubPhotoUrls(productSubUrl);
        productRepo.save(pFetch);
        return imageService.getProductPhotoPresignedUrl(branch.getCompany().getCode(),branch.getCode(),pFetch.getCode());
    }
}
