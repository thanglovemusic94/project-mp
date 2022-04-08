package com.mintpot.pii.entity;
import org.hibernate.annotations.Where;
import org.hibernate.annotations.SQLDelete;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/* @author linhnc@mintpot.vn */

@Entity
@Getter
@Setter
@NoArgsConstructor
@SQLDelete(sql="UPDATE manager SET crud_status = 1 WHERE id = ?")
@Where(clause = "crud_status = 0")
public class Manager extends EntityBase { 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id")
    private Company company;
    private String name;
    private String position;
    private String email;
    private String phone;
}
