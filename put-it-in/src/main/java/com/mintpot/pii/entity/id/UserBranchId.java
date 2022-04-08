package com.mintpot.pii.entity.id;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Data
@NoArgsConstructor
public class UserBranchId implements Serializable {

    private long userId;

    private long branchId;

    private long reservationId;

    @Builder
    public UserBranchId(long userId, long branchId, long reservationId) {
        this.userId = userId;
        this.branchId = branchId;
        this.reservationId = reservationId;
    }
}
