package com.mintpot.readingm.backend.dto.admin;

import com.mintpot.readingm.backend.entity.constant.Status;
import lombok.Data;
import java.util.Date;

@Data
public abstract class BaseDTO {
    protected Status status = Status.ACTIVATED;
    protected Date createdAt;
    protected Date updateAt;
}
