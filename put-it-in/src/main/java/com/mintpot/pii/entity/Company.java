package com.mintpot.pii.entity;
import com.mintpot.pii.entity.embeddable.Representative;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

@Entity
@Getter
@Setter
@NoArgsConstructor
@EntityListeners({CompanyEntityListener.class})
@SQLDelete(sql="UPDATE company SET crud_status = 1 WHERE id = ?")
@Where(clause = "crud_status = 0")
public class Company extends EntityBase { 

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(unique = true)
    private String code;

    @Column(updatable = false)
    private String brandName;

    private String registrationName;

    private String registrationNumber;

    private String address;
    
    private String settlementCreditAccount;     // linhnc add SettlementCreditAccount    

    @Embedded
    private Representative representative;

    @OneToMany(mappedBy = "company", orphanRemoval = true, cascade = CascadeType.ALL)
    private Set<Branch> branches;
    @OneToMany(mappedBy = "company", orphanRemoval = true, cascade = CascadeType.ALL)
    private Set<Manager> managers;
    
    @Builder
    public Company(String brandName, String registrationName, String registrationNumber, String address, Representative representative) {
        this.brandName = brandName;
        this.registrationName = registrationName;
        this.registrationNumber = registrationNumber;
        this.address = address;
        this.representative = representative;
    }

    public Company(long id) {
        this.id = id;
    }

    public void addBranch(Branch branch) {
        if(this.branches == null)
            this.branches = new HashSet<>();
        this.branches.add(branch);
    }
}
