package com.mintpot.pii.entity;
import org.hibernate.annotations.Where;
import org.hibernate.annotations.SQLDelete;

import com.mintpot.pii.entity.id.UserBranchId;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@SQLDelete(sql="UPDATE bookmark SET crud_status = 1 WHERE id = ?")
@Where(clause = "crud_status = 0")
public class Bookmark extends EntityBase { 

    @EmbeddedId
    private UserBranchId id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @MapsId("userId")
    @JoinColumn(name = "user_id", foreignKey = @ForeignKey(name = "FK_bookmark_user"))
    private User user;

    @ManyToOne(optional = false)
    @JoinColumn(name = "branch_id", foreignKey = @ForeignKey(name = "FK_bookmark_branch"))
    @MapsId("branchId")
    private Branch branch;

    @Column(updatable = false)
    @CreationTimestamp
    private Date createdOn;

    @Builder
    public Bookmark(long userId, long branchId) {
        this.id = new UserBranchId();
        this.user = new User(userId);
        this.branch = new Branch(branchId);
    }
}
