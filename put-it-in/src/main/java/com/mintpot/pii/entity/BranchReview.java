package com.mintpot.pii.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.mintpot.pii.entity.constant.CrudStatus;
import com.mintpot.pii.entity.id.UserBranchId;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

@Entity
@Getter
@Setter
@NoArgsConstructor
@SQLDelete(sql="UPDATE branch_review SET crud_status = 1 WHERE id = ?")
@Where(clause = "crud_status = 0")
public class BranchReview extends EntityBase { 

    @EmbeddedId
    private UserBranchId id;
    private CrudStatus crudStatus = CrudStatus.CREATED;
    private byte rating;

    private String contents;

    private String photoUrl;

    @ManyToOne(optional = false)
    @MapsId("branchId")
    @JoinColumn(name = "branch_id", foreignKey = @ForeignKey(name = "FK_branch_review_branch"))
    @JsonBackReference
    private Branch branch;

    @ManyToOne
    @JoinColumn(name = "user_id", foreignKey = @ForeignKey(name = "FK_branch_review_user"))
    @MapsId("userId")
    @JsonBackReference
    private User user;

    @ManyToOne
    @JoinColumn(name = "reservation_id", foreignKey = @ForeignKey(name = "FK_branch_review_reservation"))
    @MapsId("reservationId")
    @JsonBackReference
    private Reservation reservation;

    @Builder
    public BranchReview(String contents, byte rating, long branchId, long userId, long reservationId) {
        this.id = new UserBranchId(userId, branchId, reservationId);
        this.contents = contents;
        this.rating = rating;
        this.user = new User(userId);
        this.branch = new Branch(branchId);
        this.reservation = new Reservation(reservationId);
    }
}
