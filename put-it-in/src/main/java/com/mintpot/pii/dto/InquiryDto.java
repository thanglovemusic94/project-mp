package com.mintpot.pii.dto;

import com.mintpot.pii.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class InquiryDto {
    private String title;
    private String contents;
}
