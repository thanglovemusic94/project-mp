package com.mintpot.readingm.backend.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
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
public class Branch {

    @Id
    @JsonProperty("B_idx")
    private String bIdx;

    @JsonProperty("B_title")
    private String bTitle;

    @JsonProperty("B_tel")
    private String bTel;

    @Builder

    public Branch(String bIdx, String bTitle, String bTel) {
        this.bIdx = bIdx;
        this.bTitle = bTitle;
        this.bTel = bTel;
    }
}
