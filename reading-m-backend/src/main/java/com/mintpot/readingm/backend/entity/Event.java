package com.mintpot.readingm.backend.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "event")
@Getter
@Setter
@NoArgsConstructor
public class Event  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected long id;

    private String imagePC;

    private String imageMB;

    @Column(updatable = false)
    @CreationTimestamp
    protected Date createdAt;

    @UpdateTimestamp
    protected Date updateAt;
}
