package com.mintpot.storage;

import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.DependsOn;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RestController
@RequestMapping("/storages")
@RequiredArgsConstructor
@Api(tags = {"Storage"})
@DependsOn("storageService")
public class LocalStorageController {

    private final LocalStorageService storageService;

    @PutMapping(value = "/**")
    @ResponseStatus(HttpStatus.OK)
    void upload(@RequestBody byte[] file, HttpServletRequest request) throws IOException {
        final var filePath = request.getRequestURI().replace("/storages", "");

        storageService.uploadFile(file, filePath);
    }

    @GetMapping(value = "/**", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    byte[] getImage(HttpServletRequest request) throws IOException {
        final var filePath = request.getRequestURI().replace("/storages", "");

        return storageService.getFileByPath(filePath);
    }
}
