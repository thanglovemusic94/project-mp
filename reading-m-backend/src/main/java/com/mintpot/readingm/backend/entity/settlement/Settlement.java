package com.mintpot.readingm.backend.entity.settlement;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.mintpot.readingm.backend.entity.clazz.Class;
import com.mintpot.readingm.backend.entity.clazz.LiveClass;
import com.mintpot.readingm.backend.entity.constant.SettlementStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Set;

@Table(name = "settlement")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Settlement{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private long fee;

    private long tax;

    private long pgFee;

    private long amount;

    private int payerNumber;

    private SettlementStatus status;

    @ManyToOne
    @JoinColumn(name = "class_id", foreignKey = @ForeignKey(name="FK_settlement_class"))
    private LiveClass liveClass;

    @CreationTimestamp
    private LocalDateTime createdOn;

    @Column
    private LocalDateTime settledDate;

    @OneToMany
    private Set<AttendClass> attendClass;

}
