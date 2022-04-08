package com.mintpot.pii.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.mintpot.pii.entity.constant.SettelementStatus;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

/* @author linhnc@mintpot.vn */
@Getter
@Setter
@NoArgsConstructor
@EntityListeners(BranchEntityListener.class)
@SQLDelete(sql="UPDATE branch SET crud_status = 1 WHERE id = ?")
@Where(clause = "crud_status = 0")
public class Settlement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    
    @ManyToOne
    @JoinColumn(name = "branch_id", foreignKey = @ForeignKey(name = "FK_settlement_branch"))
    private Branch branch;
    
    @ManyToOne
    @JoinColumn(name = "reservation_id", foreignKey = @ForeignKey(name = "FK_settlement_reservation"))
    private Reservation reservation;
   
    private SettelementStatus settlementStatus;
}


