package com.mintpot.pii.entity;
import org.hibernate.annotations.Where;
import org.hibernate.annotations.SQLDelete;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@SQLDelete(sql="UPDATE tag SET crud_status = 1 WHERE id = ?")
@Where(clause = "crud_status = 0")
public class Tag extends EntityBase { 

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(columnDefinition = "nvarchar(20)", nullable = false)
    private String name;

    /*@ManyToMany(mappedBy = "tags")
    private Set<Branch> branches;*/
}
