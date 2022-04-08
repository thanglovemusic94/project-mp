package com.mintpot.busking.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.mintpot.busking.model.constant.Status;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "mst_city")
public class City{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cityId;

    @Column(nullable = false)
    private String cityName;

    @ManyToOne
    @JoinColumn(name = "province_id", foreignKey = @ForeignKey(name = "FK_city_province"))
    private Province province;

    @OneToMany(mappedBy = "city")
    @JsonManagedReference
    private Set<BuskingLand> buskingLands;

    private Status status;

    public City(int cityId) {
        this.cityId = cityId;
    }

    public City(String cityName, Province province) {
        this.cityName = cityName;
        this.province = province;
    }
}
