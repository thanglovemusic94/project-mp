package com.mintpot.readingm.backend.entity.clazz;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;


@Getter
@Setter
@Embeddable
public class Video  {
    @NotBlank
    private String name;

    @NotNull
    private long time;

    @NotNull
    private long fee;

    private String videoUrl;

    private String fileName;

    @Column(updatable = false)
    @CreationTimestamp
    private Date createdOn;

    @UpdateTimestamp
    private Date updatedOn;
}
