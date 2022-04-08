package com.mintpot.carcloth.entity.car;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Model {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(length = 40)
    private String modelName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="brand_id", nullable = false, foreignKey = @ForeignKey(name = "FK_model_brand"))
    @NotNull
    private Brand modelBrand;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "model")
    private Set<CarType> carTypes;

    @Column(updatable = false)
    @CreationTimestamp
    private LocalDateTime createdOn;
}
