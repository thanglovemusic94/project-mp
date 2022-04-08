package com.mintpot.carcloth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.net.URL;

@Getter
@Setter
@AllArgsConstructor
public class FileInfoChat {

    private URL presignedUrl;

    private String objectKey;
}