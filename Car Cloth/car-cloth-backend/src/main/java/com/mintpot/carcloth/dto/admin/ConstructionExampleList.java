package com.mintpot.carcloth.dto.admin;

import com.mintpot.carcloth.constant.ShowStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ConstructionExampleList {
    private long id;

    private ShowStatus status;

    private QuotationDto quotation;

    private String content;

    private MemberDto writer;

    private LocalDateTime createdOn;

    @Getter
    @Setter
    static class QuotationDto {
        private CompanyDto company;
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
}
