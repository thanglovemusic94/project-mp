package com.mintpot.pii.entity;
import org.hibernate.annotations.Where;
import org.hibernate.annotations.SQLDelete;

import com.mintpot.pii.entity.constant.ConfigId;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@DynamicUpdate
@Table(name = "mst_config")
@SQLDelete(sql="UPDATE config SET crud_status = 1 WHERE id = ?")
@Where(clause = "crud_status = 0")
public class Config extends EntityBase { 

    @Id
    @Enumerated(EnumType.STRING)
    private ConfigId id;

    private String value;
}
