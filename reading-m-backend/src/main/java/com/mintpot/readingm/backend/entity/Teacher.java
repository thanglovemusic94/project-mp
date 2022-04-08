package com.mintpot.readingm.backend.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mintpot.readingm.api.rams.teacher.Active;
import com.mintpot.readingm.api.rams.teacher.MClass;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Setter
@Entity
public class Teacher {

    @JsonProperty("M_idx")
    @Id
    private String mIdx;

    @JsonProperty("M_name")
    private String mName;

    @JsonProperty("M_phone")
    private String mPhone;

    @JsonProperty("M_job")
    private String mJob;

    @JsonProperty("M_class")
    private MClass mClass;

    @JsonProperty("M_branch")
    private String mBranch;

    @JsonProperty("M_id")
    private String mId;

    @JsonProperty("M_password")
    private String mPassword;

    @JsonProperty("M_active")
    private Active mActive;
}
