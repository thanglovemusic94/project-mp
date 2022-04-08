package com.mintpot.readingm.backend.entity;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mintpot.readingm.backend.converter.ImageUrlSerializer;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "magazine")
@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class Magazine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected long id;

    private String title;

    @JsonSerialize(using = ImageUrlSerializer.class)
    private String imagePc;

    @JsonSerialize(using = ImageUrlSerializer.class)
    private String imageMb;

    @JsonSerialize(using = ImageUrlSerializer.class)
    private String file;

    @Column(updatable = false)
    @CreationTimestamp
    protected Date createdAt;

    @UpdateTimestamp
    protected Date updateAt;
}
