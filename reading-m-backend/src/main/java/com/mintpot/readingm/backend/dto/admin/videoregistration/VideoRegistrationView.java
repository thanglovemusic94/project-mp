package com.mintpot.readingm.backend.dto.admin.videoregistration;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import java.util.Date;

@JsonPropertyOrder(value = {"videoUrl", "createdAt"})
public interface VideoRegistrationView {
    Long getId();

    String getVideoUrl();

    Date getCreatedAt();

}
