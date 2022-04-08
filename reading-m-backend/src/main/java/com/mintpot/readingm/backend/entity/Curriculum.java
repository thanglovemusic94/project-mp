package com.mintpot.readingm.backend.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mintpot.readingm.api.rams.book.School;
import com.mintpot.readingm.api.rams.book.Grade;
import com.mintpot.readingm.backend.constant.Category;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Curriculum {

    @Id
    @JsonProperty("C_idx")
    private String cIdx;

    @JsonProperty("C_branch")
    private String cBranch;

    @JsonProperty("C_class")
    private School cClass;

    @JsonProperty("C_grade")
    private Grade cGrade;

    @JsonProperty("C_bookidx")
    private String cBookidx;

    @JsonProperty("C_category")
    private Category cCategory;

    @JsonProperty("C_yyyymm")
    private String CYyyymm;

    @JsonProperty("C_order")
    private String COrder;

    @Builder
    public Curriculum(String cIdx,
                      String cBranch,
                      School cClass,
                      Grade cGrade,
                      String cBookidx,
                      Category cCategory,
                      String CYyyymm,
                      String COrder) {
        this.cIdx = cIdx;
        this.cBranch = cBranch;
        this.cClass = cClass;
        this.cGrade = cGrade;
        this.cBookidx = cBookidx;
        this.cCategory = cCategory;
        this.CYyyymm = CYyyymm;
        this.COrder = COrder;
    }
}
