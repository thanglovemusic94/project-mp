package com.mintpot.readingm.backend.entity;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mintpot.readingm.backend.entity.constant.ShowStatus;
import com.mintpot.readingm.backend.converter.ImageUrlSerializer;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "board_banner")
@Getter
@Setter
@NoArgsConstructor
public class Banner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected long id;

    private String name;

    @JsonSerialize(using = ImageUrlSerializer.class)
    private String imagePc;

    @JsonSerialize(using = ImageUrlSerializer.class)
    private String imageMb;

    private int orderBanner;

    @Column(columnDefinition = "tinyint(1) default " + ShowStatus.Constant.SHOW_VALUE)
    private ShowStatus showStatus = ShowStatus.SHOW;

    @Builder
    public Banner(String name, String imagePc, String imageMb, int orderBanner) {
        this.name = name;
        this.imagePc = imagePc;
        this.imageMb = imageMb;
        this.orderBanner = orderBanner;
    }

    @Column(updatable = false)
    @CreationTimestamp
    protected Date createdAt;

    @UpdateTimestamp
    protected Date updateAt;
}
