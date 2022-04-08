package com.mintpot.pii.entity;
import org.hibernate.annotations.Where;
import org.hibernate.annotations.SQLDelete;

import com.mintpot.pii.entity.constant.CardType;
import com.mintpot.pii.entity.embeddable.CardInfo;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.YearMonth;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(
        uniqueConstraints = @UniqueConstraint(
                name = "UK_card_number_type",
                columnNames = {"cardNumber", "type", "expDate"}
        )
)
@SQLDelete(sql="UPDATE user_card SET crud_status = 1 WHERE id = ?")
@Where(clause = "crud_status = 0")
public class UserCard extends EntityBase { 

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Embedded
    private CardInfo cardInfo;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", foreignKey = @ForeignKey(name = "FK_user_card_info_user"))
    private User user;

    @Builder
    public UserCard(String cardNumber, YearMonth expDate, CardType type, User user) {
        this.cardInfo = new CardInfo(cardNumber, expDate, type);
        this.user = user;
    }
}
