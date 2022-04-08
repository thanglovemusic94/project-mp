package com.mintpot.carcloth.entity.embeddable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NoticeSetting {
    @Column(columnDefinition = "tinyint(1)")
    private boolean quoteNotice = true;

    @Column(columnDefinition = "tinyint(1)")
    private boolean chattingNotice = true;

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean eventBenefitNotice;
}
