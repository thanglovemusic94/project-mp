package com.mintpot.pii.service.impl;

import com.mintpot.pii.facade.AuthenticationFacade;
import com.mintpot.pii.s3.dto.PresignedImagesInfoDto;
import com.mintpot.pii.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.CopyObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PresignedPutObjectRequest;

import javax.annotation.PostConstruct;
import java.net.URL;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

public class S3ImageServiceImpl implements ImageService {

    @Value("${amazonProperties.accessKey}")
    private String s3AccessKey;

    @Value("${amazonProperties.secretKey}")
    private String s3SecretKey;

    @Value("${amazonProperties.bucket}")
    private String bucket;

    @Value("${amazonProperties.region}")
    private String region;

    private final String S3_OBJ_KEY_PATTERN_COMPANY = "companies/{companyCode}/";
    private final String S3_OBJ_KEY_PATTERN_BRANCH = S3_OBJ_KEY_PATTERN_COMPANY + "branches/{branchCode}/";
    private final String S3_OBJ_KEY_PATTERN_PRODUCT = S3_OBJ_KEY_PATTERN_BRANCH + "products/{productCode}/";

    private S3Presigner s3Presigner;

    private S3Client s3Client;

    @Autowired
    private AuthenticationFacade authFacade;

    @PostConstruct
    private void initialize() {
        s3Presigner = S3Presigner.builder().region(Region.of(region))
                .credentialsProvider(StaticCredentialsProvider.create(AwsBasicCredentials
                        .create(s3AccessKey, s3SecretKey))).build();

        s3Client = S3Client.builder().region(Region.of(region))
                .credentialsProvider(StaticCredentialsProvider.create(AwsBasicCredentials
                        .create(s3AccessKey, s3SecretKey))).build();
    }

/*
    @Override
    public String uploadSingle(Image) {

    }*/

    @Override
    public List<String> generateAbsolutePhotoUrls(List<String> urls) {
        final String rootPath = String.format("https://%s.s3.%s.amazonaws.com/", bucket, region);
        var abPaths = new ArrayList<String>();
        urls.forEach(photoUrl -> {
            abPaths.add(rootPath + photoUrl);
        });

        if (abPaths.size() > 0)
            return abPaths;
        else return urls;
    }

    @Override
    public String generateAbsolutePhotoUrl(String url) {
        final String rootPath = String.format("https://%s.s3.%s.amazonaws.com/", bucket, region);
        return rootPath + url;
    }

    /*@Override
    public void deleteImagesByKeys(List<String> objectsKeys) {
        Assert.state(objectsKeys.size() > 0, "objectsKeys size must be greater than 0");
        Set<ObjectIdentifier> objectIds = new HashSet<>();
        for (String objectKey : objectsKeys) {
            objectIds.add(ObjectIdentifier.builder().key(objectKey).build());
        }
        Delete delete = Delete.builder().objects(objectIds).build();
        DeleteObjectsRequest req = DeleteObjectsRequest.builder().bucket(bucket).delete(delete).build();
        DeleteObjectsResponse response = s3Client.deleteObjects(req);
    }*/

    @Override
    public void copyObject(String sourceKey, String desKey) {
        CopyObjectRequest req =
                CopyObjectRequest.builder().destinationBucket(bucket).copySource(sourceKey).destinationKey(desKey).build();
        s3Client.copyObject(req);
    }

    @Override
    public PresignedImagesInfoDto getProductPhotoPresignedUrl(String companyCode, String branchCode, String productCode) {
        String productObjKey = S3_OBJ_KEY_PATTERN_PRODUCT.replace("companyCode", companyCode).replace("branchCode",
                branchCode).replace("productCode", productCode);
        var objKeys = new ArrayList<String>();
        objKeys.add(productObjKey + "main");
        for(var i = 0; i <= 5; i++) {
            objKeys.add(productObjKey + i);
        }
        return getPresignedUrls(objKeys);
    }

    @Override
    public PresignedImagesInfoDto getBranchPhotoPresignedUrl(String companyCode, String branchCode) {
        String branchObjKey = S3_OBJ_KEY_PATTERN_BRANCH.replace("companyCode", companyCode).replace("branchCode",
                branchCode) + companyCode + branchCode;
        var objKeys = new ArrayList<String>();
        for(var i = 0; i <= 5; i++) {
            objKeys.add(branchObjKey + i);
        }
        return getPresignedUrls(objKeys);
//        return getPresignedUrls(generateBranchSubPhotoUrls(companyCode, branchCode));
    }
    
    @Override   // use only for create Branch
    public List<String> generateBranchSubPhotoUrls(String companyCode, String branchCode, int numImg) {
        String branchObjKey = S3_OBJ_KEY_PATTERN_BRANCH.replace("companyCode", companyCode).replace("branchCode",
                branchCode) + companyCode + branchCode;
        var objKeys = new ArrayList<String>();
        for(var i = 0; i <= numImg; i++) {
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
        for(var i = 0; i <= numImg; i++) {
            objKeys.add(productObjKey + i);
        }
        return objKeys;
    }
    
    @Override
    public PresignedImagesInfoDto getPresignedUrls(List<String> objKeys) {
        PresignedImagesInfoDto res = new PresignedImagesInfoDto();
        List<URL> urls = new ArrayList<>();
        objKeys.forEach(objKey -> {
            PresignedPutObjectRequest req =
                    s3Presigner.presignPutObject(r -> r.signatureDuration(Duration.ofMinutes(10))
                            .putObjectRequest(por -> por.bucket(bucket).key(objKey)));
            urls.add(req.url());
        });

        res.setUrls(urls);
        return res;
    }

  
}
