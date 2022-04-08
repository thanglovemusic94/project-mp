package com.mintpot.pii.entity;
import org.hibernate.annotations.Where;
import org.hibernate.annotations.SQLDelete;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
@SQLDelete(sql="UPDATE seq_branch_code SET crud_status = 1 WHERE id = ?")
@Where(clause = "crud_status = 0")
public class SeqBranchCode extends EntityBase { 

    @Id
    @Column(name = "company_id")
    private long id;

    @Column(nullable = false)
    private int nextSeq;

    public SeqBranchCode(long id) {
        this.id = id;
        this.nextSeq = 1;
    }
}
