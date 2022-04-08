package com.mintpot.storage;

import lombok.*;

import java.net.URL;
import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class PresignedImagesInfoDto {

    long id;

    List<URL> urls;

    public PresignedImagesInfoDto(List<URL> urls) {
        this.urls = urls;
    }
}
