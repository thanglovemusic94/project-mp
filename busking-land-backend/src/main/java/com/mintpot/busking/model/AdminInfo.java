package com.mintpot.busking.model;

import com.mintpot.busking.model.constant.AdminStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "user_admin_info")
public class AdminInfo {

    @Id
    private int id;

    private AdminStatus status;

    @OneToOne
    @JoinColumn(name = "user_id", foreignKey = @ForeignKey(name = "FK_admin_info_user"))
    private User user;

    public AdminInfo(AdminStatus status, User user) {
        this.id = user.getId();
        this.status = status;
        this.user = user;
    }
}
