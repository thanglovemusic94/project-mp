package com.mintpot.busking.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.mintpot.busking.model.constant.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Max;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class AnnouncementDTO {

    private Integer id;

    @NotBlank()
    private String title;

    private String username;

    @Size(max = 2000)
    @NotBlank()
    private String content;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private Date createdOn;
}
