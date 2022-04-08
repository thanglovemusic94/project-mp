package com.mintpot.readingm.backend.controller;

import com.mintpot.storage.StorageService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URL;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/storages")
@RequiredArgsConstructor
@Api(tags = {"Storage"})
public class StorageController {

    private final StorageService storageService;

    @PostMapping(value = "/presigned-url")
    Map<String, URL> getPresignedUrls(@RequestBody(required = true) List<String> files) {
        Map<String, URL> urls = new HashMap<>();

        for (String f : files) {
            urls.put(f, storageService.getPresignedUrl(f));
        }

        return urls;
    }
}
