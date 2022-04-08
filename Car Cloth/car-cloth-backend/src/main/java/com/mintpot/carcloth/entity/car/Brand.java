package com.mintpot.carcloth.entity.car;

import com.mintpot.carcloth.entity.embeddable.FileInfo;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Brand {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="category_id", nullable = false, foreignKey = @ForeignKey(name = "FK_brand_category"))
    private Category category;

    @OneToMany(mappedBy = "modelBrand")
    private Set<Model> models;

    @OneToMany(mappedBy = "brand")
    private Set<CarType> carTypes;

    @Column(length = 40)
    @NotBlank
    private String brandName;

    @NotBlank
    private String connectionURL;

    @Embedded
    @NotNull
    private FileInfo attachFile;

    @Column(length = 6000)
    private String introduction;

    @Column(updatable = false)
    @CreationTimestamp
    private LocalDateTime createdOn;

    @Column(length = 1, columnDefinition = "tinyint(1) default 0")
    private boolean deleteFlg;
}
