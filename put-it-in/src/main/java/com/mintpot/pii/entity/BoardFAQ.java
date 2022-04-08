package com.mintpot.pii.entity;
import org.hibernate.annotations.Where;
import org.hibernate.annotations.SQLDelete;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@SQLDelete(sql="UPDATE board_f_a_q SET crud_status = 1 WHERE id = ?")
@Where(clause = "crud_status = 0")
public class BoardFAQ extends EntityBase { 

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String question;

    private String answer;

    @Column(updatable = false)
    @CreationTimestamp
    private Date createdOn;

    @Builder
    public BoardFAQ(String question, String answer) {
        this.question = question;
        this.answer = answer;
    }
}
