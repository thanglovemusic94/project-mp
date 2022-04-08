package com.mintpot.pii.entity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import org.hibernate.annotations.Where;
import org.hibernate.annotations.SQLDelete;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.mintpot.pii.entity.constant.ReservationStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@Entity
@SQLDelete(sql="UPDATE reservation SET crud_status = 1 WHERE id = ?")
@Where(clause = "crud_status = 0")
public class Reservation extends EntityBase { 

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "reservation_generator")
    @SequenceGenerator(name = "reservation_generator", sequenceName = "reservation_id_seq")
    private long id;

    @ManyToOne
    @JoinColumn(
            name = "user_id",
            foreignKey = @ForeignKey(name = "FK_reservation_user")
    )
    private User user;

    @ManyToOne
    @JoinColumn(
            name = "product_id",
            foreignKey = @ForeignKey(name = "FK_reservation_product")
    )
    private Product product;

    @OneToMany(mappedBy = "reservation", orphanRemoval = true, cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @JsonManagedReference
    private Set<BranchReview> branchReviews;   

    private int quantity;

    private long paidAmount;

    private String orderId;

    private LocalDate startDate;

    private int usagePeriod;

    private ReservationStatus status;

    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    @Column(updatable = false)
    private Date createdOn;

    @Temporal(TemporalType.TIMESTAMP)
    @UpdateTimestamp
    private Date lastUpdatedOn;

    public Reservation(long reservationId) {
        this.id = reservationId;
    }
}
