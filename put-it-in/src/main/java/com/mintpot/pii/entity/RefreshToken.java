package com.mintpot.pii.entity;
import org.hibernate.annotations.Where;
import org.hibernate.annotations.SQLDelete;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "user_refresh_token")
@SQLDelete(sql="UPDATE refresh_token SET crud_status = 1 WHERE id = ?")
@Where(clause = "crud_status = 0")
public class RefreshToken extends EntityBase { 

    @Id
    private long id;

    @Column(unique = true)
    private String refreshToken;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id", foreignKey = @ForeignKey(name = "FK_user_refresh_token_user"))
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    private Date expiredOn;

    @Builder
    public RefreshToken(String refreshToken, User user, Date expiredOn) {
        this.refreshToken = refreshToken;
        this.user = user;
        this.expiredOn = expiredOn;
    }
}
