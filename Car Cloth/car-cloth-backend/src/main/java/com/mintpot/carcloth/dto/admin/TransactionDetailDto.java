package com.mintpot.carcloth.dto.admin;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mintpot.carcloth.constant.TransactionStatus;
import com.mintpot.carcloth.constant.enums.EQuoteStatus;
import com.mintpot.carcloth.dto.converters.AbsoluteUrlsSerializer;
import com.mintpot.carcloth.entity.embeddable.Address;
import com.mintpot.carcloth.entity.embeddable.FileInfo;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Getter
@Setter
public class TransactionDetailDto {
    private long id;

    private TransactionStatus status;

    private MemberDto requester;

    private LocalDate desiredDate;

    private Address address;

    private boolean insurance;

    private String constructionType;

    private List<String> constructionPart;

    private String otherRequest;

    @JsonSerialize(using = AbsoluteUrlsSerializer.class)
    private Set<FileInfo> attachImages;

    @JsonProperty("carType")
    private String carInfo;

    private Set<QuotationDto> quotation;

    public String getCarNumber() {
        return requester.getCarNumber();
    }

    @Getter
    @Setter
    static class MemberDto {
        private String memberId;
        private String name;

        @JsonIgnore
        private String carNumber;
    }

    @Getter
    @Setter
    static class QuotationDto {
        private long id;
        private EQuoteStatus status;
        private CompanyDto company;

        @Getter
        @Setter
        static class CompanyDto {
            private String companyName;
        }
    }
}
