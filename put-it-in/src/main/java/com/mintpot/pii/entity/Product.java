package com.mintpot.pii.entity;
import org.hibernate.annotations.Where;
import org.hibernate.annotations.SQLDelete;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.mintpot.pii.entity.constant.CrudStatus;
import com.mintpot.pii.entity.embeddable.PeriodDiscount;
import com.mintpot.pii.entity.embeddable.StorageSize;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(
        uniqueConstraints = @UniqueConstraint(name = "UK_product_code", columnNames = {"code", "branch_id"})
)
@Setter
@Getter
@NoArgsConstructor
@EntityListeners({ProductEntityListener.class})
@SQLDelete(sql="UPDATE product SET crud_status = 1 WHERE id = ?")
@Where(clause = "crud_status = 0")
public class Product extends EntityBase { 

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "product_id_generator")
    @SequenceGenerator(name = "product_id_generator", sequenceName = "product_seq")
    private long id;

    private String code;

    private String name;

    @Embedded
    private StorageSize size;

    private long price;

    private long deposit;   
    
    @ElementCollection
    private List<PeriodDiscount> periodDiscounts;

    @Column(columnDefinition = "tinyint(2)")
    private int quantity;

    @Column(columnDefinition = "tinyint(2)")
    private int purchaseLimit;

    private int availDays;

    @Column(columnDefinition = "tinyint(2)")
    private int minUsage;

    private String mainPhotoUrl;

    @ElementCollection(fetch = FetchType.LAZY)
    private List<String> subPhotoUrls;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id", foreignKey = @ForeignKey(name = "FK_product_branch"))
    @JsonManagedReference
    private Branch branch;

    @Builder
    public Product(String name, StorageSize size, long price, long deposit, List<PeriodDiscount> periodDiscounts,
                   int quantity, int purchaseLimit, int availDays, int minUsage, String mainPhotoUrl,
                   List<String> subPhotoUrls, Branch branch) {
        this.name = name;
        this.size = size;
        this.price = price;
        this.deposit = deposit;
        this.periodDiscounts = periodDiscounts;
        this.quantity = quantity;
        this.purchaseLimit = purchaseLimit;
        this.availDays = availDays;
        this.minUsage = minUsage;
        this.mainPhotoUrl = mainPhotoUrl;
        this.subPhotoUrls = subPhotoUrls;
        this.branch = branch;
    }

    public Product(long productId) {
        this.id = productId;
    }
}
