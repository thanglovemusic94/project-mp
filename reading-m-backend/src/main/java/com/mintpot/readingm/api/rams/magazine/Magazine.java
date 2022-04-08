package com.mintpot.readingm.api.rams.magazine;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Magazine {

    private String mIdx;

    private String mTitle;

    private String mFile;

    private String mImage;

    @Builder
    public Magazine(String mIdx, String mTitle, String mFile, String mImage) {
        this.mIdx = mIdx;
        this.mTitle = mTitle;
        this.mFile = mFile;
        this.mImage = mImage;
    }
}
