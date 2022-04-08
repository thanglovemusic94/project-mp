package com.mintpot.pii.entity;
import org.hibernate.annotations.Where;
import org.hibernate.annotations.SQLDelete;

import java.util.HashSet;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Objects;
import java.util.Set;
import lombok.NoArgsConstructor;

@Getter
@Setter
@Entity
@NoArgsConstructor
@SQLDelete(sql="UPDATE keyword SET crud_status = 1 WHERE id = ?")
@Where(clause = "crud_status = 0")
public class Keyword extends EntityBase { 

    @Id
    @Column(columnDefinition = "nvarchar(20)")
    private String name;

    @ManyToMany(mappedBy = "keywords")
    private Set<Branch> branches;

    @Builder
    public Keyword(String name) {
        this.name = name;
    }

    public Keyword(String name, Branch branchFetch) {
        this.name = name;
        branches = new HashSet<>(10);
        branches.add(branchFetch);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Keyword keyword = (Keyword) o;
        return name.equals(keyword.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name);
    }
}
