package com.mintpot.carcloth.entity;

import com.mintpot.carcloth.constant.ShowStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "user_review",
        uniqueConstraints = {@UniqueConstraint(
                name = "USER_REVIEW_UK",
                columnNames = {"quotation_id"}
        )}
)
@Getter
@Setter
@NoArgsConstructor
public class ConstructionReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(columnDefinition = "tinyint(1)")
    private int quality;

    @Column(columnDefinition = "tinyint(1)")
    private int kindness;

    @Column(columnDefinition = "tinyint(1)")
    private int productExplain;

    @Column(nullable = false)
    private String content;

    private ShowStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "writer_id", nullable = false, foreignKey = @ForeignKey(name = "FK_review_writer"))
    private Member writer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false, foreignKey = @ForeignKey(name = "FK_review_company"))
    private Company company;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quotation_id", foreignKey = @ForeignKey(name = "FK_review_quotation"))
    private CompanyQuote quotation;

    @Column(updatable = false)
    @CreationTimestamp
    private LocalDateTime createdOn;

    @UpdateTimestamp
    private LocalDateTime updatedOn;
}