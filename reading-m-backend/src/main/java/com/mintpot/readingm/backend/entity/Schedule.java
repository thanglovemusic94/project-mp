package com.mintpot.readingm.backend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.mintpot.readingm.api.rams.book.Grade;
import com.mintpot.readingm.api.rams.book.School;
import com.mintpot.readingm.backend.constant.Category;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Schedule {

    @Id
    @JsonProperty("S_idx")
    private String sIdx;

    @JsonProperty("S_branch")
    private String sBranch;

    @JsonProperty("S_timeindex")
    private String sTimeindex;

    @JsonProperty("S_time")
    private String sTime;

    @JsonProperty("S_teacher")
    private String sTeacher;

    @JsonProperty("S_book")
    private String sBook;

    @JsonProperty("S_class")
    private School sClass;

    @JsonProperty("S_grade")
    private String sGrade;

    @JsonProperty("S_date")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate sDate;

    @JsonProperty("S_category")
    private Category sCategory;

    @JsonProperty("S_purposetitle")
    private String sPurposetitle;

    @Builder
    public Schedule(String sIdx,
                    String sBranch,
                    String sTimeindex,
                    String sTime,
                    String sTeacher,
                    String sBook,
                    School sClass,
                    String sGrade,
                    LocalDate sDate,
                    Category sCategory,
                    String sPurposetitle) {
        this.sIdx = sIdx;
        this.sBranch = sBranch;
        this.sTimeindex = sTimeindex;
        this.sTime = sTime;
        this.sTeacher = sTeacher;
        this.sBook = sBook;
        this.sClass = sClass;
        this.sGrade = sGrade;
        this.sDate = sDate;
        this.sCategory = sCategory;
        this.sPurposetitle = sPurposetitle;
    }
}
