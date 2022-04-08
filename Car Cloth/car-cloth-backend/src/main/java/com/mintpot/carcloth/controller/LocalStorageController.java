package com.mintpot.carcloth.controller;

import com.mintpot.carcloth.utils.StorageService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RestController
@RequestMapping("/storages")
@Profile("dev")
@Api(tags = {"Local Storage"})
@RequiredArgsConstructor
public class LocalStorageController {

    private final StorageService storageService;

    @PutMapping(value = "/**")
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "api for upload file dev environment by presigned url")
    void upload(@RequestBody byte[] file, HttpServletRequest request) throws Exception {
        final var filePath = request.getRequestURI().replace("/storages", "");

        storageService.upload(file, filePath, true);
    }

    @GetMapping(value = "/**", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    @ApiOperation(value = "api for get file dev environment by presigned url")
    byte[] getFile(HttpServletRequest request) throws IOException {
        final var filePath = request.getRequestURI().replace("/storages", "");

        return storageService.download(filePath);
    }
}
