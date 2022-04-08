package com.mintpot.carcloth.entity;

import com.mintpot.carcloth.constant.ShowStatus;
import com.mintpot.carcloth.entity.car.CarType;
import com.mintpot.carcloth.entity.embeddable.FileInfo;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
public class ConstructionExample {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "writer_id", nullable = false, foreignKey = @ForeignKey(name = "FK_construction_ex_writer"))
    private Member writer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quotation_id", nullable = false, foreignKey = @ForeignKey(name = "FK_construction_ex_quotation"))
    private CompanyQuote quotation; // used to get transaction number

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "car_type_id", foreignKey = @ForeignKey(name = "FK_construction_ex_car_type"))
    private CarType carType;

    private LocalDateTime completedDate;

    @Lob
    private String content;

    private ShowStatus status;

    @ElementCollection
    private List<FileInfo> images;

    @CreationTimestamp
    private LocalDateTime createdOn;

    @UpdateTimestamp
    private LocalDateTime updatedOn;
}
