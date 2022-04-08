package com.mintpot.carcloth.entity.car;

import com.mintpot.carcloth.constant.enums.EProductType;
import com.mintpot.carcloth.entity.embeddable.FileInfo;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CarType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private EProductType productType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="brand_id", nullable = false, foreignKey = @ForeignKey(name = "FK_car_type_brand"))
    private Brand brand;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="model_id", foreignKey = @ForeignKey(name = "FK_car_type_model"))
    private Model model;

    @Column(length = 40)
    private String name;

    @Embedded
    @NotNull
    private FileInfo attachFile;

    @Column(updatable = false)
    @CreationTimestamp
    private LocalDateTime createdOn;

    @Column(length = 1, columnDefinition = "tinyint(1) default 0")
    private boolean deleteFlg;

    public String getCarInfo() {
        final String brandName = this.brand.getBrandName() + " ";
        final String modelName = this.model != null ? this.model.getModelName() + " " : "";
        return brandName + modelName + this.name;
    }

    public String getBrandName() {
        return this.brand.getBrandName();
    }

    public String getModelName() {
        return this.model != null ? this.model.getModelName() : "";
    }
}
