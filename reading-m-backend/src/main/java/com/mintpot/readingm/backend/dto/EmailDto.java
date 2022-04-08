package com.mintpot.readingm.backend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
@Builder
public class EmailDto {
    private String addressTo;

    private String subject;

    private String content;

    private Map<String, Object> props;
}
