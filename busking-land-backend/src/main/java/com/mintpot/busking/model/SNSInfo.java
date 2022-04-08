package com.mintpot.busking.model;

import com.mintpot.busking.model.constant.SNSType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "user_sns_info")
public class SNSInfo {

    @Id
    private int id;

    private String snsId;

    private SNSType type;

    private String token;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id", foreignKey = @ForeignKey(name = "FK_sns_info_user"))
    private User user;

    public SNSInfo(String snsId, SNSType snsType) {
        this.snsId = snsId;
        this.type = snsType;
    }
}
