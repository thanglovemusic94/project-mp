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
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(length = 40)
    @NotBlank
    private String title;

    @Column(unique = true)
    private int orderCategory;

    @Embedded
    @NotNull
    private FileInfo icon;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "category")
    private Set<Brand> brands;

    @Column(updatable = false)
    @CreationTimestamp
    private LocalDateTime createdOn;

    @Column(length = 1, columnDefinition = "tinyint(1) default 0")
    private boolean deleteFlg;
}
