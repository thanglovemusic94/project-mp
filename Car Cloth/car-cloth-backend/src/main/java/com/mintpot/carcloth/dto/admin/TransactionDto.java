package com.mintpot.carcloth.dto.admin;

import com.mintpot.carcloth.constant.TransactionStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class TransactionDto {
    private long id;

    private TransactionStatus status;

    private MemberDto requester;

    private String constructionType;

    private LocalDateTime createdOn;

    @Getter
    @Setter
    static class MemberDto {
        private String memberId;
        private String name;
    }
}
