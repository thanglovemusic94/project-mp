package com.mintpot.carcloth.utils;

import java.io.IOException;
import java.net.URL;
import java.util.List;
import java.util.Map;

public interface StorageService {

    URL generateAbsoluteUrl(String objectKey);

    Map<String, URL> generateAbsoluteUrls(List<String> objectKey);

    URL getPresignedUrl(String objectKey, boolean isPublic);

    Map<String, URL> getPresignedUrls(List<String> objectKeys, boolean isPublic);

    void upload(byte[] data, String objectKey, boolean isPublic) throws IOException, Exception;

    byte[] download(String objectKey) throws IOException;

    void remove(String objectKey);

    void remove(List<String> objectKeys);

    String generateAbsolutePhotoUrl(String url);
}
