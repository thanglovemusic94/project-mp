package com.mintpot.busking.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "busking_like")
public class BuskingLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "busking_id", foreignKey = @ForeignKey(name = "FK_busking_like_busking"))
    private Busking buskingInfo;

    @ManyToOne
    @JoinColumn(name = "user_id", foreignKey = @ForeignKey(name = "FK_busking_like_user"))
    private User user;

    public BuskingLike(int buskingId, int userId) {
        this.buskingInfo = new Busking(buskingId);
        this.user = new User(userId);
    }
}
