package com.mintpot.busking.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.mintpot.busking.model.constant.Status;
import lombok.*;
import org.locationtech.jts.geom.Point;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "busking_land")
public class BuskingLand extends BaseModel{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private Double lat;

    @Column(nullable = false)
    private Double lng;

    @Column(columnDefinition = "Point")
    private Point location;

    private String video;

    private Status status = Status.ACTIVATED;

    @ManyToOne
    @JoinColumn(name = "city_id", foreignKey = @ForeignKey(name = "FK_busking_land_city"))
    private City city;

    @OneToMany(mappedBy = "buskingLand", cascade = {CascadeType.ALL})
    @JsonBackReference
    private List<Restaurant> restaurants;

    public BuskingLand(int id) {
        this.id = id;
    }
}
