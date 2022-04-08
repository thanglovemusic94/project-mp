package com.mintpot.carcloth.dto.admin;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mintpot.carcloth.constant.ShowStatus;
import com.mintpot.carcloth.dto.converters.AbsoluteUrlsSerializer;
import com.mintpot.carcloth.entity.embeddable.FileInfo;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
public class ConstructionExampleDetail {
    private ShowStatus status;

    private QuotationDto quotation;

    private String content;

    private MemberDto writer;

    private LocalDateTime createdOn;

    private LocalDateTime updatedOn;

    @JsonSerialize(using = AbsoluteUrlsSerializer.class)
    private Set<FileInfo> images;

    @Getter
    @Setter
    static class QuotationDto {
        private CompanyDto company;
        private TransactionDto transaction;
    }

    @Getter
    @Setter
    static class CompanyDto {
        private String companyName;
    }

    @Getter
    @Setter
    static class MemberDto {
        private String memberId;
        private String name;
    }

    @Getter
    @Setter
    static class TransactionDto {
        private long id;
    }
}
