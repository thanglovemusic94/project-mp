package com.mintpot.carcloth.entity;

import com.mintpot.carcloth.constant.enums.EActivateStatus;
import com.mintpot.carcloth.constant.enums.EQuoteStatus;
import com.mintpot.carcloth.constant.enums.ERegistrationStatus;
import com.mintpot.carcloth.constant.enums.EUsageStatus;
import com.mintpot.carcloth.entity.embeddable.Address;
import com.mintpot.carcloth.entity.embeddable.ConstructableType;
import com.mintpot.carcloth.entity.embeddable.EntryRoute;
import com.mintpot.carcloth.entity.embeddable.FileInfo;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(length = 1, nullable = false,
            columnDefinition = "tinyint(1) default " + EActivateStatus.Constant.ACTIVATE)
    private EActivateStatus activate;

    @Column(length = 40)
    private String companyName;

    @NotBlank
    private String companyId;

    @Embedded
    @NotNull
    private Address address;

    @Column(length = 200)
    private String workingTime;

    @Embedded
    @NotNull
    private ConstructableType constructableType;

    @NotBlank
    private String representativeName;

    @NotBlank
    private String contact;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "company")
    private Set<CompanyQuote> quotes;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "company")
    private Set<ConstructionReview> reviews;

    @NotNull
    private FileInfo attachFile;

    @Embedded
    private EntryRoute entryRoute;

    @Column(length = 2000)
    private String introduction;

    @Column(nullable = false,
            columnDefinition = "tinyint default " + ERegistrationStatus.Constant.WAITING)
    private ERegistrationStatus processingStatus;

    private String reason;

    @ManyToOne
    @JoinColumn(name="requester_id", nullable = false, foreignKey = @ForeignKey(name = "FK_company_requester"))
    private Member requestUser;

    private LocalDateTime entryDate;

    @Column(updatable = false)
    @CreationTimestamp
    private LocalDateTime registrationDate;

    private LocalDateTime expiredDateTime;

    private boolean autoExtend;

    public long getNumberDeliveredQuotes() {
        if(quotes == null || quotes.isEmpty()) return 0;

        return quotes.stream()
                .filter(q -> q.getStatus() == EQuoteStatus.COMPLETE ||
                        q.getStatus() == EQuoteStatus.DELIVERED ||
                        q.getStatus() == EQuoteStatus.CONSTRUCTING ||
                        q.getStatus() == EQuoteStatus.CONFIRM)
                .count();
    }

    public long getNumberConstructionCompleted() {
        if(quotes == null || quotes.isEmpty()) return 0;

        return quotes.stream()
                .filter(q -> q.getStatus() == EQuoteStatus.COMPLETE)
                .count();
    }

    public BigDecimal getTotalPaymentAmount() {
        if(quotes == null || quotes.isEmpty()) return BigDecimal.valueOf(0);

        return quotes.stream()
                .filter(q -> q.getStatus() == EQuoteStatus.COMPLETE)
                .map(q -> BigDecimal.valueOf(q.getPaymentAmount()))
                .reduce(BigDecimal.valueOf(0), BigDecimal::add);
    }

    public String getApplicantId() {
        if(this.requestUser != null) {
            return this.requestUser.getMemberId();
        } else {
            return "";
        }
    }

    public String getApplicantName() {
        if(this.requestUser != null) {
            return this.requestUser.getName();
        } else {
            return "";
        }
    }

    public String getUsageStatus() {
        String usageStatus = null;
        if(processingStatus == ERegistrationStatus.APPROVE) {
            usageStatus = EUsageStatus.USE.getDisplayValue();
        } else if(expiredDateTime != null && LocalDateTime.now().isBefore(expiredDateTime)){
            usageStatus = EUsageStatus.USE.getDisplayValue();
        } else {
            usageStatus = EUsageStatus.UNUSED.getDisplayValue();
        }

        return usageStatus;
    }

    public long getTotalReview() {
        if(reviews == null || reviews.isEmpty()) return 0L;

        return reviews.size();
    }

    public float getConstructionQuality() {
        if(reviews == null || reviews.isEmpty()) return 0;

        var total = reviews.stream()
                .map(r -> r.getQuality())
                .reduce(0, Integer::sum);

        return (float)Math.round(total * 10 / reviews.size()) / 10;
    }

    public float getKindness() {
        if(reviews == null || reviews.isEmpty()) return 0;

        var total = reviews.stream()
                .map(r -> r.getKindness())
                .reduce(0, Integer::sum);

        return (float)Math.round(total * 10 / reviews.size()) / 10;
    }

    public float getExplainProduct() {
        if(reviews == null || reviews.isEmpty()) return 0;

        var total = reviews.stream()
                .map(r -> r.getProductExplain())
                .reduce(0, Integer::sum);

        return (float)Math.round(total * 10 / reviews.size()) / 10;
    }

    public float getAverage() {
        if(reviews == null || reviews.isEmpty()) return 0;

        var total = reviews.stream()
                .map(r -> r.getQuality() + r.getKindness() + r.getProductExplain())
                .reduce(0, Integer::sum);

        return (float)Math.round(total * 10 / (reviews.size() * 3)) / 10;
    }
}
