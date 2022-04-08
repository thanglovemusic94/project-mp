package com.mintpot.busking.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.mintpot.busking.model.constant.Status;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "restaurant")
public class Restaurant extends BaseModel{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private String image;

    private String url;

    @ManyToOne
    @JoinColumn(name = "land_id", foreignKey = @ForeignKey(name = "FK_restaurant_busking_land"))
    @JsonManagedReference
    private BuskingLand buskingLand;

}
