package com.mintpot.readingm.backend.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class BookQuiz {

    @Id
    private String bIdx;

    private String bTitle;

    private String bWriter;

    private String bPublisher;

    private String bQzCount;

    private String bQzGaCount;

    private String bQzJuCount;

    private String bTargetgrade;

    private String bClass;

    @ElementCollection
    private List<Prob> prob;

    @Builder
    public BookQuiz(String bIdx,
                    String bTitle,
                    String bWriter,
                    String bPublisher,
                    String bQzCount,
                    String bQzGaCount,
                    String bQzJuCount,
                    String bTargetgrade,
                    String bClass,
                    List<Prob> prob) {
        this.bIdx = bIdx;
        this.bTitle = bTitle;
        this.bWriter = bWriter;
        this.bPublisher = bPublisher;
        this.bQzCount = bQzCount;
        this.bQzGaCount = bQzGaCount;
        this.bQzJuCount = bQzJuCount;
        this.bTargetgrade = bTargetgrade;
        this.bClass = bClass;
        this.prob = prob;
    }
}
