package com.mintpot.busking.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "busking_sponsor")
public class BuskingSponsor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int coin;

    @ManyToOne
    @JoinColumn(name = "busking_id", foreignKey = @ForeignKey(name = "FK_busking_sponsor_busking"))
    private Busking buskingInfo;

    @ManyToOne
    @JoinColumn(name = "user_id", foreignKey = @ForeignKey(name = "FK_busking_sponsor_user"))
    private User user;

    public BuskingSponsor(int coin, int buskingId, int userId) {
        this.coin = coin;
        this.buskingInfo = new Busking(buskingId);
        this.user = new User(userId);
    }
}
