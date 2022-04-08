package com.mintpot.busking.dto.web;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.mintpot.busking.model.constant.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.Date;

@SuperBuilder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BaseDTO {
    private Status status;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private Date createdAt;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private Date updateAt;
}
