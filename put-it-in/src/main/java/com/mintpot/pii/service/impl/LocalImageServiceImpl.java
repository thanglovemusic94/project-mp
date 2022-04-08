package com.mintpot.pii.service.impl;

import com.mintpot.pii.s3.dto.PresignedImagesInfoDto;
import com.mintpot.pii.service.ImageService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.ArrayList;
import java.util.List;

public class LocalImageServiceImpl implements ImageService {

    @Override
    public List<String> generateAbsolutePhotoUrls(List<String> urls) {
        var requestURL
                = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest().getRequestURL();
        final String rootPath = requestURL.substring(0, StringUtils.ordinalIndexOf(requestURL, "/", 3));
        var abPaths = new ArrayList<String>();
        urls.forEach(photoUrl -> {
            abPaths.add(rootPath + photoUrl);
        });

        if (abPaths.size() > 0) {
            return abPaths;
        } else {
            return urls;
        }
    }

    @Override
    public String generateAbsolutePhotoUrl(String url) {

        var requestURL
                = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest().getRequestURL();
        final String rootPath = requestURL.substring(0, StringUtils.ordinalIndexOf(requestURL, "/", 3));
        if (url == null) {
            return rootPath + "/default-image.jpg";
        }
        return (!url.contains(rootPath)) ? rootPath + url : url;
    }

    @Override
    public void copyObject(String sourceKey, String desKey) {

    }

    @Override
    public PresignedImagesInfoDto getProductPhotoPresignedUrl(String companyCode, String branchCode, String productCode) {
        return null;
    }

    @Override
    public PresignedImagesInfoDto getBranchPhotoPresignedUrl(String companyCode, String branchCode) {
        return null;
    }

    @Override
    public PresignedImagesInfoDto getPresignedUrls(List<String> objKeys) {
        return null;
    }

    private final String S3_OBJ_KEY_PATTERN_COMPANY = "companies/{companyCode}/";
    private final String S3_OBJ_KEY_PATTERN_BRANCH = S3_OBJ_KEY_PATTERN_COMPANY + "branches/{branchCode}/";
    private final String S3_OBJ_KEY_PATTERN_PRODUCT = S3_OBJ_KEY_PATTERN_BRANCH + "products/{productCode}/";

    @Override
    public List<String> generateBranchSubPhotoUrls(String companyCode, String branchCode, int numImg) {
        String branchObjKey = S3_OBJ_KEY_PATTERN_BRANCH.replace("companyCode", companyCode).replace("branchCode",
                branchCode) + companyCode + branchCode;
        var objKeys = new ArrayList<String>();
        for (var i = 0; i <= numImg; i++) {
            objKeys.add(branchObjKey + i);
        }
        return objKeys;
    }

    @Override
    public List<String> generateProductSubPhotoUrls(String companyCode, String branchCode, String productCode, int numImg) {
        String productObjKey = S3_OBJ_KEY_PATTERN_PRODUCT
                .replace("companyCode", companyCode)
                .replace("branchCode", branchCode)
                .replace("productCode", productCode);
        var objKeys = new ArrayList<String>();
        objKeys.add(productObjKey + "main");
        for (var i = 0; i <= numImg; i++) {
            objKeys.add(productObjKey + i);
        }
        return objKeys;
    }
}
