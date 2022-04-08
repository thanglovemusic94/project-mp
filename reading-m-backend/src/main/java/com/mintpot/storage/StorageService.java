package com.mintpot.storage;

import org.springframework.web.multipart.MultipartFile;

import java.net.URL;
import java.util.List;

public interface StorageService {

    List<String> generateAbsolutePhotoUrls(List<String> urls);

    String generateAbsolutePhotoUrl(String url);

    void copyObject(String sourceKey, String desKey);

    PresignedImagesInfoDto getPresignedUrls(List<String> objKeys);

    URL getPresignedUrl(String objKey);

    void deleteObjectKeys(List<String> objectKeys);

    String uploadFile(MultipartFile file, String prefixPath);

    byte[] downloadFile(String fileName);

    String getObjectKeyFromUrl(String url);
}
