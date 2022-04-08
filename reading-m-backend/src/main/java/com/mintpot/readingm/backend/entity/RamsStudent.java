package com.mintpot.readingm.backend.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mintpot.readingm.api.rams.book.Grade;
import com.mintpot.readingm.api.rams.book.School;
import com.mintpot.readingm.api.rams.teacher.Active;
import com.mintpot.readingm.api.rams.teacher.MClass;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Setter
@Entity
public class RamsStudent {

    @Id
    @JsonProperty("M_idx")
    private String mIdx;

    @JsonProperty("M_name")
    private String mName;

    @JsonProperty("M_parent_phone")
    private String mParentPhone;

    @JsonProperty("M_school")
    private String mSchool;

    @JsonProperty("M_class")
    private School mClass;

    @JsonProperty("M_grade")
    private Grade mGrade;

    @JsonProperty("M_branch")
    private String mBranch;

    @JsonProperty("M_id")
    private String mId;

    @JsonProperty("M_password")
    private String mPassword;

    @JsonProperty("M_active")
    private Active mActive;
}
