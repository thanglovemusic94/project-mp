package com.mintpot.readingm.backend.dto.admin;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mintpot.readingm.backend.converter.ImageUrlSerializer;
import com.mintpot.readingm.backend.user.Role;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class NoticeDetailView {

    private long id;

    private String title;

    private String content;

    @JsonSerialize(using = ImageUrlSerializer.class)
    private String fileUrl;

    private String fileName;

    private Role role;

    private Date createdOn;

}