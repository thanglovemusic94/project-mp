package com.mintpot.busking.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@Table(name = "user_fcm_token")
public class FcmToken {

    @Id
    private int fcmTokenId;

    @OneToOne
    @JoinColumn(name = "user_id", foreignKey = @ForeignKey(name = "FK_fcm_token_user"))
    private User user;

    private String token;

    public FcmToken(User user) {
        this.fcmTokenId = user.getId();
        this.user = user;
    }
}
