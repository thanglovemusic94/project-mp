package com.mintpot.readingm.backend.dto.admin;

import com.mintpot.readingm.backend.entity.constant.WithdrawalStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class WithdrawalDto {

    private long id;

    private String memberType;

    private String name;

    private String reason;

    private Date createdOn;

    private WithdrawalStatus status;

}
