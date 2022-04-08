package com.mintpot.busking.dto.web.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.Column;
import javax.validation.constraints.Max;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FAQWebDTO {
    private Integer id;

    @NotBlank()
    private String question;

    @NotBlank()
    @Size(max = 2000)
    private String answer;

    private String username;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private Date createdOn;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private Date updatedOn;
}
