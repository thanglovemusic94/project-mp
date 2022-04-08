package com.mintpot.storage;

import com.mintpot.readingm.backend.exception.CommonException;
import com.mintpot.readingm.backend.exception.ConfigurationException;
import com.mintpot.readingm.backend.exception.ErrorCode;
import io.jsonwebtoken.lang.Strings;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.SystemUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

@Service
@Slf4j
public class LocalStorageServiceImpl implements LocalStorageService {

    private final String TMP_DIR = SystemUtils.JAVA_IO_TMPDIR;
    private static final String  SLASH = "/";
    private static final String  UNDERSCORE = "_";

    @Value("${spring.application.name}")
    private String APP_NAME;

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

        return url.contains(rootPath) ? url : rootPath + "/storages" + (url.startsWith("/") ? url : "/" + url);
    }

    @Override
    public void copyObject(String sourceKey, String desKey) {

    }

    @Override
    public PresignedImagesInfoDto getPresignedUrls(List<String> objKeys) {
        var requestURL = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest()
                .getRequestURL();
        final String rootPath = requestURL.substring(0, StringUtils.ordinalIndexOf(requestURL, "/", 3));

        List<URL> urls = new ArrayList<>();
        for (String key : objKeys) {
            try {
                urls.add(new URL(rootPath + "/storages/" + key));
            } catch(MalformedURLException ex) {
                throw new CommonException(ErrorCode.INTERNAL_SERVER_ERROR, "Presigned URL construct failed by LocalStorageService");
            }
        }

        return new PresignedImagesInfoDto(urls);
    }

    @Override
    public URL getPresignedUrl(String objKey) {
        var requestURL = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest()
                                                                                                 .getRequestURL();
        final String rootPath = requestURL.substring(0, StringUtils.ordinalIndexOf(requestURL, "/", 3)) ;

        try {
            return new URL(rootPath + "/storages/" + objKey);
        } catch(MalformedURLException ex) {
            throw new CommonException(ErrorCode.INTERNAL_SERVER_ERROR, "Presigned URL construct failed by LocalStorageService");
        }
    }

    @Override
    public void deleteObjectKeys(List<String> objectKeys) {
        if(objectKeys == null || objectKeys.isEmpty()) {
            return;
        }
        final var absolutePath = TMP_DIR + "/" + APP_NAME;

        objectKeys.forEach(ob -> {
            try {
                Files.delete(Paths.get(absolutePath + ob));
            } catch (Exception e) {
                log.error("delete file: {}, error: {}", ob, e.getMessage());
            }
        });
    }

    @Override
    public void uploadFile(byte[] is, String filePath) {

        final var absolutePath = TMP_DIR + "/" + APP_NAME + filePath;

        try {
            File file = new File(absolutePath);
            file.getParentFile().mkdirs();
            file.createNewFile();
            var os = new FileOutputStream(file);
            os.write(is);
            os.close();
        } catch (IOException ex) {
            throw new ConfigurationException("Upload file to LocalStorage failed");
        }
    }

    @Override
    public byte[] getFileByPath(String filePath) throws IOException {
        final var absolutePath = TMP_DIR + "/" + APP_NAME + filePath;

        File file = new File(absolutePath);
        if (file.exists())
            return FileUtils.readFileToByteArray(file);
        else throw new CommonException(ErrorCode.OBJECT_NOT_FOUND);
    }

    public String uploadFile(MultipartFile file, String prefixPath) {

        String filePath =  prefixPath + System.currentTimeMillis() +
                UNDERSCORE + file.getOriginalFilename();
        String absolutePath = TMP_DIR + SLASH + APP_NAME + filePath;

        try {
            File f = new File(absolutePath);
            f.getParentFile().mkdirs();
            f.createNewFile();
            var os = new FileOutputStream(f);

            os.write(file.getBytes());
            os.close();
        } catch (IOException ex) {
            throw new ConfigurationException("Upload file to LocalStorage failed");
        }
        return filePath;
    }
    public byte[] downloadFile(String fileName) {
        //NguPQ add later
        return null;
    }

    public String getObjectKeyFromUrl(String url) {
        if(url== null || url.trim().length() == 0) {
            return "";
        }

        var requestURL = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest()
            .getRequestURL();

        final String rootPath = requestURL.substring(0, StringUtils.ordinalIndexOf(requestURL, "/", 3)) + "/storages/";

        return url.substring(rootPath.length());
    }
}
