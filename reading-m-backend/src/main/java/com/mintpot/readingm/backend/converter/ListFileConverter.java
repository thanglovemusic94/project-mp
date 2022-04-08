package com.mintpot.readingm.backend.converter;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.util.StdConverter;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.mintpot.readingm.backend.dto.clazz.embedded.PresignedUrlDto;
import com.mintpot.readingm.backend.entity.embeddable.AttachedFile;
import com.mintpot.storage.StorageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;
import java.lang.reflect.Type;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

@Slf4j
public class ListFileConverter extends StdConverter<String, List<PresignedUrlDto>> {

    @Autowired
    private StorageService storageService;

    @Override
    public List<PresignedUrlDto> convert(String value) {
        List<PresignedUrlDto> presignedUrlDtos = new ArrayList<>();
        if(!value.isEmpty()) {
            try {
                final Gson gson = new Gson();
                final Type type = new TypeToken<List<AttachedFile>>(){}.getType();;
                List<AttachedFile> attachedFiles = gson.fromJson(value, type);

                for (AttachedFile file: attachedFiles) {
                    presignedUrlDtos.add(new PresignedUrlDto(
                        new URL(storageService.generateAbsolutePhotoUrl(file.getObjectKey())),
                        file.getFileName()));
                }
            } catch (IOException e) {
                log.error("convert list attached file error: " + e.getMessage());
            }
        }

        return presignedUrlDtos;
    }
}