package com.mintpot.carcloth.entity.transaction;

import com.mintpot.carcloth.constant.TransactionStatus;
import com.mintpot.carcloth.entity.CompanyQuote;
import com.mintpot.carcloth.entity.Member;
import com.mintpot.carcloth.entity.embeddable.Address;
import com.mintpot.carcloth.entity.embeddable.FileInfo;
import com.vladmihalcea.hibernate.type.json.JsonStringType;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import org.hibernate.annotations.TypeDefs;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Getter
@Setter
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type", discriminatorType = DiscriminatorType.STRING)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@TypeDefs({
        @TypeDef(name = "json", typeClass = JsonStringType.class)
})
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false,
            columnDefinition = "tinyint default " + TransactionStatus.Constant.COMPARE)
    private TransactionStatus status;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "transaction")
    private Set<CompanyQuote> quotation;

    private LocalDate desiredDate;

    private LocalDateTime reservationDate;

    private LocalDateTime completeDate;

    @NotNull
    private Address address;

    @Column(columnDefinition = "tinyint(1) default 1")
    private boolean insurance;

    @Size(max = 600)
    private String otherRequest;

    @NotNull
    @Size(min = 1, max = 4)
    @Column(columnDefinition = "json")
    @Type(type = "json")
    private Set<FileInfo> attachImages;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id", nullable = false, foreignKey = @ForeignKey(name = "FK_transaction_user"))
    private Member requester;

    @Column(updatable = false)
    @CreationTimestamp
    private LocalDateTime createdOn;

    @Transient
    private String carInfo;

    public String getCarInfo() {
        return this.requester.getCarInfo();
    }

    public void setCarInfo(String carInfo) {
        this.carInfo =carInfo;
    }
}
