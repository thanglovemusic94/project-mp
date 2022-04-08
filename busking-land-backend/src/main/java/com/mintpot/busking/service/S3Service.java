package com.mintpot.busking.service;


import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

public interface S3Service {

    void deleteImagesByKeys(List<String> objectsKeys);

    void copyObject(String sourceKey, String desKey);

    void createDefaultAvatar(int companionId);

    void deleteImageByKey(String objectsKey);

    File convertMultiPartToFile(MultipartFile file) throws IOException;

    String generateFileName(MultipartFile multiPart);

    String uploadFile(MultipartFile multipartFile, String folderName);
}
