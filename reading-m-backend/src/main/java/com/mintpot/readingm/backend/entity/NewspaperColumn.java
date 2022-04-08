package com.mintpot.readingm.backend.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class NewspaperColumn {

    @Id
    @JsonProperty("C_idx")
    private String cIdx;

    @JsonProperty("C_newsdate")
    private LocalDate cNewsdate;

    @JsonProperty("C_company")
    private String cCompany;

    @JsonProperty("C_subject")
    private String cSubject;

    @JsonProperty("C_title")
    private String cTitle;

    @JsonProperty("C_file")
    private String cFile;

    @JsonProperty("C_plan_file")
    private String cPlanFile;

    @Builder
    public NewspaperColumn(String cIdx,
                           LocalDate cNewsdate,
                           String cCompany,
                           String cSubject,
                           String cTitle,
                           String cFile, String cPlanFile) {
        this.cIdx = cIdx;
        this.cNewsdate = cNewsdate;
        this.cCompany = cCompany;
        this.cSubject = cSubject;
        this.cTitle = cTitle;
        this.cFile = cFile;
        this.cPlanFile = cPlanFile;
    }
}
