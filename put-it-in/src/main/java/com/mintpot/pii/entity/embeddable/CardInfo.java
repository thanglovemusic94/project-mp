package com.mintpot.pii.entity.embeddable;

import com.mintpot.pii.entity.constant.CardType;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.time.YearMonth;

@Embeddable
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
public class CardInfo {

    @Column(nullable = false)
    private String cardNumber;

    @Column(nullable = false)
    private YearMonth expDate;

    @Column(nullable = false)
    private CardType type;

    @Column(columnDefinition = "nvarchar(10)")
    private String dateOfBirth;

    public CardInfo(String cardNumber, YearMonth expDate, CardType type) {
        this.cardNumber = cardNumber;
        this.expDate = expDate;
        this.type = type;
    }
}
