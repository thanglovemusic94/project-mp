package com.mintpot.readingm.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TutorStudentClassId implements Serializable {

//    private long studentId;

//    private long tutorId;

    private long userId;

    private long classId;
}
