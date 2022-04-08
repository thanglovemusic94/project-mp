package com.mintpot.carcloth.dto.review;

import com.mintpot.carcloth.constant.ShowStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class AdReviewDetail {
    private String content;

    private int quality;

    private int kindness;

    private int productExplain;

    private User writer;

    private Company company;

    private CompanyQuote quotation;

    private ShowStatus status;

    private LocalDateTime createdOn;

    private LocalDateTime updatedOn;

    @Getter
    @Setter
    static class User {
        private String memberId;

        private String name;
    }

    @Getter
    @Setter
    static class Company {
        private String companyName;
    }

    @Getter
    @Setter
    static class Transaction {
        private long id;
    }

    @Getter
    @Setter
    static class CompanyQuote {
        private Transaction transaction;
    }
}
