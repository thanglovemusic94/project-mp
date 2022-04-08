package com.mintpot.carcloth.utils;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.SystemUtils;
import org.springframework.beans.factory.annotation.Value;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.awscore.AwsRequestOverrideConfiguration;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;
import java.time.Duration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
public class S3StorageServiceImpl implements StorageService {

    private static final String TMP_DIR = SystemUtils.JAVA_IO_TMPDIR + File.separator;
    private static final String S3_FORMAT = "https://%s.s3.%s.amazonaws.com/";

    @Value("${amazonProperties.accessKey}")
    private String s3AccessKey;

    @Value("${amazonProperties.secretKey}")
    private String s3SecretKey;

    @Value("${amazonProperties.bucket}")
    private String bucket;

    @Value("${amazonProperties.region}")
    private String region;

    @Value("${amazonProperties.presigned.durationM}")
    private int duration;

    private S3Presigner s3Presigner;

    private S3Client s3Client;

    @PostConstruct
    private void initialize() {
        s3Presigner = S3Presigner.builder()
                .region(Region.of(region))
                .credentialsProvider(StaticCredentialsProvider.create(
                        AwsBasicCredentials.create(s3AccessKey, s3SecretKey)))
                .build();

        s3Client = S3Client.builder()
                .region(Region.of(region))
                .credentialsProvider(StaticCredentialsProvider.create(
                        AwsBasicCredentials.create(s3AccessKey, s3SecretKey)))
                .build();
    }

    @Override
    public URL generateAbsoluteUrl(String objectKey) {
        if(StringUtils.isBlank(objectKey)) {
            return null;
        }

        URL url = null;
        final String strURL = String.format(S3_FORMAT, bucket, region) + objectKey;

        try {
            url = new URL(strURL);
        } catch (Exception e) {
            log.error("generateAbsoluteUrl objectKey-{} error: {}", objectKey, e.getMessage());
        }

        return url;
    }

    @Override
    public Map<String, URL> generateAbsoluteUrls(List<String> objectKeys) {
        if (objectKeys == null || objectKeys.isEmpty()) {
            return null;
        }

        Map<String, URL> urls = new HashMap<>();

        for (var i = 0; i < objectKeys.size(); i++) {
            final String objectKey = objectKeys.get(i);
            final String strURL = String.format(S3_FORMAT, bucket, region) + objectKey;
            try {
                urls.put(objectKey, new URL(strURL));
            } catch (Exception e) {
                log.error("generateAbsoluteUrls objectKey-{} error: {}", objectKey, e.getMessage());
            }
        }

        return urls;
    }

    @Override
    public URL getPresignedUrl(String objectKey, boolean isPublic) {
        URL url = null;
        try {
            AwsRequestOverrideConfiguration override = AwsRequestOverrideConfiguration.builder()
                    .putRawQueryParameter("x-amz-acl", isPublic ? ObjectCannedACL.PUBLIC_READ.toString() : ObjectCannedACL.PRIVATE.toString())
                    .build();
            var objectPresigned = PutObjectPresignRequest.builder()
                    .signatureDuration(Duration.ofMinutes(duration))
                    .putObjectRequest(PutObjectRequest.builder()
                            .bucket(bucket)
                            .key(objectKey)
                            .overrideConfiguration(override)
                            .build())
                    .build();
            url = s3Presigner.presignPutObject(objectPresigned).url();
        } catch (Exception e) {
            log.error("getPresignedUrl objectKey-{} error: {}", objectKey, e.getMessage());
        }

        return url;
    }

    @Override
    public Map<String, URL> getPresignedUrls(List<String> objectKeys, boolean isPublic) {
        if (objectKeys == null || objectKeys.isEmpty()) {
            return null;
        }

        Map<String, URL> urls = new HashMap<>();

        AwsRequestOverrideConfiguration override = AwsRequestOverrideConfiguration.builder()
                .putRawQueryParameter("x-amz-acl", isPublic ? ObjectCannedACL.PUBLIC_READ.toString() : ObjectCannedACL.PRIVATE.toString())
                .build();
        for (var i = 0; i < objectKeys.size(); i++) {
            final String objectKey = objectKeys.get(i);
            try {
                var objectPresigned = PutObjectPresignRequest.builder()
                        .signatureDuration(Duration.ofMinutes(duration))
                        .putObjectRequest(PutObjectRequest.builder()
                                .bucket(bucket)
                                .key(objectKey)
                                .overrideConfiguration(override)
                                .build())
                        .build();
                urls.put(objectKey, s3Presigner.presignPutObject(objectPresigned).url());
            } catch (Exception e) {
                log.error("getPresignedUrls objectKey-{} error: {}", objectKey, e.getMessage());
            }
        }

        return urls;
    }

    @Override
    public void upload(byte[] data, String objectKey, boolean isPublic) throws IOException {
        File file = new File(TMP_DIR + objectKey);

        try (FileOutputStream fos = new FileOutputStream(file)) {
            fos.write(data);
            fos.close();

            s3Client.putObject(PutObjectRequest.builder()
                    .bucket(bucket)
                    .key(objectKey)
                    .acl(isPublic ? ObjectCannedACL.PUBLIC_READ : ObjectCannedACL.AUTHENTICATED_READ)
                    .build(), file.toPath());

        } catch (IOException e) {
            log.error("convertToFile objectKey-{} error: {}", objectKey, e.getMessage());
            throw e;
        } catch (Exception e) {
            log.error("upload objectKey-{} error: {}", objectKey, e.getMessage());
            throw e;
        } finally {
            file.delete();
        }
    }

    @Override
    public byte[] download(String objectKey) throws IOException {

        return s3Client.getObject(GetObjectRequest.builder()
                .bucket(bucket)
                .key(objectKey)
                .build()).readAllBytes();
    }

    @Override
    public void remove(String objectKey) {
        try {
            s3Client.deleteObject(DeleteObjectRequest.builder()
                    .bucket(bucket)
                    .key(objectKey)
                    .build());
        } catch (Exception e) {
            log.error("remove objectKey: {}, error: {}", objectKey, e.getMessage());
        }
    }

    @Override
    public void remove(List<String> objectKeys) {
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
                log.error("remove objectKey: {}, error: {}", ob, e.getMessage());
            }
        });
    }

    @Override
    public String generateAbsolutePhotoUrl(String url) {
        final String rootPath = String.format("https://%s.s3.%s.amazonaws.com/", bucket, region);
        return rootPath + url;
    }
}
