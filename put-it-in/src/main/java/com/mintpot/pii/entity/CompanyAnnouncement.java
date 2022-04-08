package com.mintpot.pii.entity;
import org.hibernate.annotations.Where;
import org.hibernate.annotations.SQLDelete;

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
@SQLDelete(sql="UPDATE company_announcement SET crud_status = 1 WHERE id = ?")
@Where(clause = "crud_status = 0")
public class CompanyAnnouncement extends EntityBase { 

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String contents;

    @Column(updatable = false)
    @CreationTimestamp
    private Date createdOn;
}
