package com.mintpot.readingm.backend.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class VideoInPay {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank
    private String videoName;

    @NotNull
    private long time;

    @NotNull
    private long price;

    private String videoUrl;

    private long viewedAt;

    /*@OneToOne(mappedBy = "videoInPay" ))
    private ViewLecture viewLecture;*/


    @ManyToOne
    @JoinColumn(name="payment_id", nullable = false, foreignKey = @ForeignKey(name = "FK_payment_video"))
    private Payment payment;

}
