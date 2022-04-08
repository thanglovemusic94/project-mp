package com.mintpot.readingm.backend.dto.admin;

import lombok.*;

import java.net.URL;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DavinciClassPresignView {

    private URL image;

    private List<URL> videos;

    //private List<URL> courses;
}
