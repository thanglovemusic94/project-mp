package com.mintpot.pii.entity;
import org.hibernate.annotations.Where;
import org.hibernate.annotations.SQLDelete;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Setter
@Entity
@NoArgsConstructor
@SQLDelete(sql="UPDATE seq_product_code SET crud_status = 1 WHERE id = ?")
@Where(clause = "crud_status = 0")
public class SeqProductCode extends EntityBase { 

    @Id
    @Column(name = "branch_id")
    private long id;

    @Column(nullable = false)
    private int nextSeq;

    public SeqProductCode(long id) {
        this.id = id;
        this.nextSeq = 1;
    }
}
