package com.mintpot.carcloth.controller;

import com.mintpot.carcloth.utils.StorageService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.net.URL;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/storages")
@Api(tags = {"Storage"})
@RequiredArgsConstructor
public class StorageController {

    private final StorageService storageService;

    @GetMapping(value = "/presigned-urls")
    @ApiOperation(value = "api get list presigned url from list object key")
    Map<String, URL> getPresignedUrls(@RequestBody(required = true) List<String> objectKeys) {

        return storageService.getPresignedUrls(objectKeys, true);
    }

    @GetMapping(value = "/presigned-url")
    @ApiOperation(value = "api get presigned url from object key")
    URL getPresignedUrl(@RequestParam(required = true) String objectKey) {

        return storageService.getPresignedUrl(objectKey, true);
    }
}
