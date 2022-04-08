package com.mintpot.busking.model;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "user_refresh_token")
public class RefreshToken {

    @Id
    private int id;

    @Column(unique = true)
    private String refreshToken;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id", foreignKey = @ForeignKey(name = "FK_refresh_token_user"))
    private User user;

    @Column(nullable = false)
    private Date expiredOn;

    @Builder
    public RefreshToken(String refreshToken, User user, Date expiredOn) {
        this.refreshToken = refreshToken;
        this.user = user;
        this.expiredOn = expiredOn;
    }
}
