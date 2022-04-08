package com.mintpot.carcloth.dto.review;

import com.mintpot.carcloth.constant.ShowStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
public class AdReviewList {
    private long id;

    private String content;

    private ShowStatus status;

    private Company company;

    private LocalDateTime createdOn;

    private User writer;

    @Getter
    @Setter
    static class Company {
        private String companyName;
    }

    @Getter
    @Setter
    static class User {
        private String memberId;

        private String name;
    }
}