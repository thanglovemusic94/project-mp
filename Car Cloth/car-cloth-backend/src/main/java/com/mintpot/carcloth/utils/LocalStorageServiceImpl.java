package com.mintpot.carcloth.utils;

import com.mintpot.carcloth.exception.CommonException;
import com.mintpot.carcloth.exception.ErrorCode;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.SystemUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
public class LocalStorageServiceImpl implements StorageService {

    //C:\Users\admin\AppData\Local\Temp
    private static final String TMP_DIR = SystemUtils.JAVA_IO_TMPDIR + File.separator;

    @Override
    public URL generateAbsoluteUrl(String objectKey) {
        if(StringUtils.isBlank(objectKey)) {
            return null;
        }

        URL url = null;
        try {

            var requestURL= ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes())
                    .getRequest().getRequestURL();

            final String rootPath = requestURL.substring(0,
                    StringUtils.ordinalIndexOf(requestURL, "/", 3));

            final String strURL =  objectKey.contains(rootPath)
                    ? objectKey
                    : rootPath + "/storages" + (objectKey.startsWith("/") ? objectKey : "/" + objectKey);

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

        var requestURL= ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes())
                .getRequest().getRequestURL();

        final String rootPath = requestURL.substring(0, StringUtils.ordinalIndexOf(requestURL, "/", 3));

        for (var i = 0; i < objectKeys.size(); i++) {
            final String objectKey = objectKeys.get(i);
            final String strURL =  objectKey.contains(rootPath)
                    ? objectKey
                    : rootPath + "/storages" + (objectKey.startsWith("/") ? objectKey : "/" + objectKey);

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
        var requestURL = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes())
                .getRequest().getRequestURL();

        final String rootPath = requestURL.substring(0, StringUtils.ordinalIndexOf(requestURL, "/", 3)) ;

        URL url = null;

        try {
            url = new URL(rootPath + "/storages/" + objectKey);
        } catch(MalformedURLException e) {
            log.error("generateAbsoluteUrl objectKey-{} error: {}", objectKey, e.getMessage());
        }

        return url;
    }

    @Override
    public Map<String, URL> getPresignedUrls(List<String> objectKeys, boolean isPublic) {
        if (objectKeys == null || objectKeys.isEmpty()) {
            return null;
        }

        Map<String, URL> urls = new HashMap<>();
        var requestURL = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes())
                .getRequest().getRequestURL();

        final String rootPath = requestURL.substring(0,
                StringUtils.ordinalIndexOf(requestURL, "/", 3)) ;

        for (var i = 0; i < objectKeys.size(); i++) {
            final String objectKey = objectKeys.get(i);
            try {
                urls.put(objectKey, new URL(rootPath + "/storages/" + objectKey));
            } catch (Exception e) {
                log.error("getPresignedUrls objectKey-{} error: {}", objectKey, e.getMessage());
            }
        }

        return urls;
    }

    @Override
    public void upload(byte[] data, String objectKey, boolean isPublic) throws IOException {
        final var absolutePath = TMP_DIR + objectKey;

        try {
            File file = new File(absolutePath);
            file.getParentFile().mkdirs();
            file.createNewFile();
            var os = new FileOutputStream(file);
            os.write(data);
            os.close();
        } catch (IOException e) {
            log.error("upload objectKey-{} error: {}", objectKey, e.getMessage());
            throw e;
        }
    }

    @Override
    public byte[] download(String objectKey) throws IOException {

        final var absolutePath = TMP_DIR + objectKey;

        File file = new File(absolutePath);
        if (file.exists()) {
            return FileUtils.readFileToByteArray(file);
        } else {
            throw new CommonException(ErrorCode.FILE_NOT_FOUND);
        }
    }

    @Override
    public void remove(String objectKey) {
        final var absolutePath = TMP_DIR + objectKey;

        try {
            Files.delete(Paths.get(absolutePath));
        } catch (Exception e) {
            log.error("delete file: {}, error: {}", objectKey, e.getMessage());
        }
    }

    @Override
    public void remove(List<String> objectKeys) {
        if(objectKeys == null || objectKeys.isEmpty()) {
            return;
        }

        objectKeys.forEach(ob -> {
            try {
                Files.delete(Paths.get(TMP_DIR + ob));
            } catch (Exception e) {
                log.error("delete file: {}, error: {}", ob, e.getMessage());
            }
        });
    }

    @Override
    public String generateAbsolutePhotoUrl(String url) {
        var requestURL
                = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest().getRequestURL();
        final String rootPath = requestURL.substring(0, StringUtils.ordinalIndexOf(requestURL, "/", 3));
        if (url == null) {
            return rootPath + "/default-image.jpg";
        }

        return url.contains(rootPath) ? url : rootPath + "/storages" + (url.startsWith("/") ? url : "/" + url);
    }
}
