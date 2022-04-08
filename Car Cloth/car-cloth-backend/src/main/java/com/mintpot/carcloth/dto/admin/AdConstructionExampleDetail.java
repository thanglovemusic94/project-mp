package com.mintpot.carcloth.dto.admin;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class AdConstructionExampleDetail {

    private String content;

    private LocalDate createdOn;

    private LocalDate updatedOn;

    private User user;

    private Company company;

    private Transaction transaction;

    @Getter
    @Setter
    static class User {
        private String memberId;

        private String name;
    }

    @Getter
    @Setter
    static class Company {
        private String name;
    }

    @Getter
    @Setter
    static class Transaction {
        private long id;
    }
}