package com.mintpot.busking.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mintpot.busking.model.constant.PointChargeTypeEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Setter
@Getter
@NoArgsConstructor
@JsonIgnoreProperties({"createdOn", "updatedOn"})
@Table(name = "mst_point_charge_type")
public class PointChargeType {

    @Id
    @Column(length = 50)
    private String pointChargeTypeId;

    private int pointAmount;

    private long price;

    private long price_android;

    @CreationTimestamp
    @Column(updatable = false)
    private Date createdOn;

    @UpdateTimestamp
    private Date updatedOn;

}
