package com.mintpot.storage;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.CopyObjectRequest;
import software.amazon.awssdk.services.s3.model.DeleteBucketRequest;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PresignedPutObjectRequest;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Slf4j
public class S3StorageService implements StorageService {

    private static final String UNDERSCORE = "_";

    @Value("${amazonProperties.accessKey}")
    private String s3AccessKey;

    @Value("${amazonProperties.secretKey}")
    private String s3SecretKey;

    @Value("${amazonProperties.bucket}")
    private String bucket;

    @Value("${amazonProperties.region}")
    private String region;

    private S3Presigner s3Presigner;

    private S3Client s3Client;

    @PostConstruct
    private void initialize() {
        s3Presigner = S3Presigner.builder()
                                 .region(Region.of(region))
                                 .credentialsProvider(StaticCredentialsProvider.create(
                                         AwsBasicCredentials.create(s3AccessKey, s3SecretKey)))
                                 .build();

        s3Client = S3Client.builder().region(Region.of(region))
                           .credentialsProvider(StaticCredentialsProvider.create(AwsBasicCredentials
                                                                                         .create(s3AccessKey,
                                                                                                 s3SecretKey))).build();
    }

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
        CopyObjectRequest req = CopyObjectRequest.builder()
                                 .destinationBucket(bucket)
                                 .copySource(sourceKey)
                                 .destinationKey(desKey)
                                 .build();
        s3Client.copyObject(req);
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

    @Override
    public URL getPresignedUrl(String objKey) {
        return s3Presigner.presignPutObject(r -> r.signatureDuration(Duration.ofMinutes(10))
                                                  .putObjectRequest(por -> por.bucket(bucket).key(objKey))).url();

    }

    @Override
    public void deleteObjectKeys(List<String> objectKeys) {
        if(objectKeys == null || objectKeys.isEmpty()) {
            return;
        }

        objectKeys.forEach(ob -> {
            try {
                s3Client.deleteObject(DeleteObjectRequest.builder()
                    .bucket(bucket)
                    .key(ob)
                    .build());
            } catch (Exception e) {
                log.error("delete file: {}, error: {}", ob, e.getMessage());
            }
        });
    }

    public String uploadFile(MultipartFile file, String prefixPath) {
        File fileObj = convertMultiPartFileToFile(file);
        String key = prefixPath + fileObj.getName();

        s3Client.putObject(PutObjectRequest.builder()
                .bucket(bucket)
                .key(key)
                .build(),
                fileObj.toPath());

        fileObj.delete();

        return key;
    }
    public byte[] downloadFile(String fileName) {
        //NguPQ add later
        return null;
    }

    public String getObjectKeyFromUrl(String url) {
        if(url== null || url.trim().length() == 0) {
            return "";
        }

        final String rootPath = String.format("https://%s.s3.%s.amazonaws.com/", bucket, region);

        return url.substring(rootPath.length());
    }

    private File convertMultiPartFileToFile(MultipartFile file) {
        File convertedFile = new File(System.currentTimeMillis() +
                UNDERSCORE + file.getOriginalFilename());
        try (FileOutputStream fos = new FileOutputStream(convertedFile)) {
            fos.write(file.getBytes());
        } catch (IOException e) {
            log.error("Error converting multipartFile to file", e);
        }
        return convertedFile;
    }

}
