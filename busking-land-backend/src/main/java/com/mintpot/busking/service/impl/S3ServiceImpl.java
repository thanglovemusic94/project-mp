package com.mintpot.busking.service.impl;

import com.mintpot.busking.dto.PresignedImagesInfoDto;
import com.mintpot.busking.facade.AuthenticationFacade;
import com.mintpot.busking.service.S3Service;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PresignedPutObjectRequest;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;
import java.time.Duration;
import java.util.*;



@Service
@Log4j2
public class S3ServiceImpl implements S3Service {

    @Value("${amazonProperties.accessKey}")
    private String s3AccessKey;

    @Value("${amazonProperties.secretKey}")
    private String s3SecretKey;

    @Value("${amazonProperties.bucketName}")
    private String bucket;

    @Value("${amazonProperties.regionName}")
    private String regionName;

    private S3Presigner s3Presigner;

    private S3Client s3Client;

    private final AuthenticationFacade authFacade;

    private final String OBJECT_PATTERN_FAMILY_IMG = "users/{userId}/family/{imgId}";

    public S3ServiceImpl(AuthenticationFacade authFacade) {
        this.authFacade = authFacade;
    }

    @PostConstruct
    private void initialize() {
        Region region = Region.of(regionName);
        s3Presigner = S3Presigner.builder().region(region)
                .credentialsProvider(StaticCredentialsProvider.create(AwsBasicCredentials
                        .create(s3AccessKey, s3SecretKey))).build();

        s3Client = S3Client.builder().region(region)
                .credentialsProvider(StaticCredentialsProvider.create(AwsBasicCredentials
                        .create(s3AccessKey, s3SecretKey))).build();
    }

    @Override
    public void deleteImagesByKeys(List<String> objectsKeys) {
        Assert.state(objectsKeys.size() > 0, "objectsKeys size must be greater than 0");
        Set<ObjectIdentifier> objectIds = new HashSet<>();
        for (String objectKey : objectsKeys) {
            objectIds.add(ObjectIdentifier.builder().key(objectKey).build());
        }
        Delete delete = Delete.builder().objects(objectIds).build();
        DeleteObjectsRequest req = DeleteObjectsRequest.builder().bucket(bucket).delete(delete).build();
        DeleteObjectsResponse response = s3Client.deleteObjects(req);
    }

    private PresignedImagesInfoDto getPresignedUrls(List<String> keys) {
        PresignedImagesInfoDto res = new PresignedImagesInfoDto();
        List<URL> urls = new ArrayList<>();
        for(String key: keys) {
            PresignedPutObjectRequest req = s3Presigner.presignPutObject(r -> r.signatureDuration(Duration.ofMinutes(5))
                    .putObjectRequest(por -> por.bucket(bucket).key(key)));
            urls.add(req.url());
        }
        res.setUrls(urls);

        return res;
    }

    @Override
    public void copyObject(String sourceKey, String desKey) {
        CopyObjectRequest req =
                CopyObjectRequest.builder().destinationBucket(bucket).copySource(sourceKey).destinationKey(desKey).build();
        s3Client.copyObject(req);
    }

    @Override
    public void createDefaultAvatar(int companionId) {

    }

    @Override
    public void deleteImageByKey(String objectsKey) {
        DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                .bucket(bucket)
                .key(objectsKey)
                .build();
        s3Client.deleteObject(deleteObjectRequest);
    }

    private void uploadFileTos3bucket(String fileName, File file, String folder) {
//        s3Client.putObject(new PutObjectRequest(bucket+"/healthy_line", fileName, file)
//                .withCannedAcl(CannedAccessControlList.PublicRead));
        PutObjectRequest objectRequest = PutObjectRequest.builder()
                .bucket(bucket)
                .key(folder+"/"+fileName)
                .build();
        s3Client.putObject(objectRequest, RequestBody.fromFile(file));
    }

    @Override
    public File convertMultiPartToFile(MultipartFile file) throws IOException {
        File convFile = new File(file.getOriginalFilename());
        FileOutputStream fos = new FileOutputStream(convFile);
        fos.write(file.getBytes());
        fos.close();
        return convFile;
    }

    @Override
    public String generateFileName(MultipartFile multiPart) {
        return new Date().getTime() + "-" + multiPart.getOriginalFilename().replace(" ", "_");
    }

    @Override
    public String uploadFile(MultipartFile multipartFile, String folder) {

        String fileUrl = "";
        String url = "";
        try {
            File file = convertMultiPartToFile(multipartFile);
            String fileName = generateFileName(multipartFile);
            fileUrl = "https://"+ bucket +".s3."+regionName+".amazonaws.com/"+folder +"/"+ fileName;
            url = folder +"/"+ fileName;

            uploadFileTos3bucket(fileName, file, folder);
            file.delete();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return url;
    }
}
