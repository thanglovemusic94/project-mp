package com.mintpot.busking.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.mintpot.busking.model.constant.Status;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.Set;

@Entity
@Setter
@Getter
@Table(name = "mst_province")
@NoArgsConstructor
public class Province {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int provinceId;

    @Column(nullable = false)
    private String provinceName;

    @OneToMany(mappedBy = "province")
    @JsonBackReference
    private Set<City> cities;

    private Status status = Status.ACTIVATED;

    public Province(String provinceName) {
        this.provinceName = provinceName;
    }
}
