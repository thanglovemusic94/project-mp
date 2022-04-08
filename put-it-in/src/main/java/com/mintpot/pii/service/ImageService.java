package com.mintpot.pii.service;

import com.mintpot.pii.s3.dto.PresignedImagesInfoDto;

import java.util.List;

public interface ImageService {
    List<String> generateAbsolutePhotoUrls(List<String> urls);

    String generateAbsolutePhotoUrl(String url);

    void copyObject(String sourceKey, String desKey);

    PresignedImagesInfoDto getProductPhotoPresignedUrl(String companyCode, String branchCode, String productCode);

    PresignedImagesInfoDto getBranchPhotoPresignedUrl(String companyCode, String branchCode);

    PresignedImagesInfoDto getPresignedUrls(List<String> objKeys);

    public List<String> generateBranchSubPhotoUrls(String companyCode, String branchCode, int numImg);
    
    //linhnc add for CRUD product 18-1-2021
    public List<String> generateProductSubPhotoUrls(String companyCode, String branchCode, String productCode, int numImg);
    
}
