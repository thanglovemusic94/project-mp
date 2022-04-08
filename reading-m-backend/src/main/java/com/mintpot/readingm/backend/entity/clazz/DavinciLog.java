package com.mintpot.readingm.backend.entity.clazz;


import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DavinciLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank
    private String lectureName;

    @NotBlank
    private String lectureTitle;

//    @NotNull
//    private String grade;

    @NotNull
    private long studentId;

    @NotNull
    private long classId;

    @NotNull
    private String ip;

    @Column(updatable = false)
    @CreationTimestamp
    private LocalDateTime createdOn;

}
