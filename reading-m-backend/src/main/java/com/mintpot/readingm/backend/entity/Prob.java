package com.mintpot.readingm.backend.entity;

import com.mintpot.readingm.backend.constant.ProbType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Embeddable;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
public class Prob {

    private String pMunje;

    private String pBunho;

    private ProbType pType;

    private String pBogi1;

    private String pBogi2;

    private String pBogi3;

    private String pBogi4;

    private String pBogi5;

    private String pPageSt;

    private String pPageEn;

    private String pJungdab;

    private String pPuli;

    private String pHint;

    @Builder
    public Prob(String pMunje,
                String pBunho,
                ProbType pType,
                String pBogi1,
                String pBogi2,
                String pBogi3,
                String pBogi4,
                String pBogi5,
                String pPageSt,
                String pPageEn,
                String pJungdab,
                String pPuli,
                String pHint) {
        this.pMunje = pMunje;
        this.pBunho = pBunho;
        this.pType = pType;
        this.pBogi1 = pBogi1;
        this.pBogi2 = pBogi2;
        this.pBogi3 = pBogi3;
        this.pBogi4 = pBogi4;
        this.pBogi5 = pBogi5;
        this.pPageSt = pPageSt;
        this.pPageEn = pPageEn;
        this.pJungdab = pJungdab;
        this.pPuli = pPuli;
        this.pHint = pHint;
    }
}
