package com.mintpot.carcloth.entity;

import com.mintpot.carcloth.constant.SNSType;
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
    private long id;

    private String snsId;

    private SNSType type;

    private String token;

    @OneToOne
    @MapsId
    @JoinColumn(name = "member_id", foreignKey = @ForeignKey(name = "FK_sns_info_member"))
    private Member member;

    public SNSInfo(String snsId, SNSType snsType) {
        this.snsId = snsId;
        this.type = snsType;
    }
}
