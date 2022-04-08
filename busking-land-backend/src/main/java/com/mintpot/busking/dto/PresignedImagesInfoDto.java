package com.mintpot.busking.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.net.URL;
import java.util.List;

@Getter
@Setter
@ToString
public class PresignedImagesInfoDto {

    List<URL>  urls;
}
