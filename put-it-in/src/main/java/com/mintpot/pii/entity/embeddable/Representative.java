package com.mintpot.pii.entity.embeddable;

import com.mintpot.pii.entity.constant.CardType;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.time.YearMonth;

@Embeddable
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
public class Representative {

    @Column(name = "representative_name")
    private String name;

    @Column(name = "representative_phone")
    private String phone;

    @Column(name = "representative_email")
    private String email;

    @Builder
    public Representative(String name, String phone, String email) {
        this.name = name;
        this.phone = phone;
        this.email = email;
    }
}
