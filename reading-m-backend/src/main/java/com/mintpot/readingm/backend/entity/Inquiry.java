package com.mintpot.readingm.backend.entity;

import com.mintpot.readingm.backend.entity.constant.InquiryStatus;
import com.mintpot.readingm.backend.entity.constant.InquiryType;
import com.mintpot.readingm.backend.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "user_inquiry")
@Getter
@Setter
@NoArgsConstructor
public class Inquiry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private InquiryType type;

    @Column(nullable = false)
    private String title;

    @ManyToOne
    @JoinColumn(name = "questioner_id", foreignKey = @ForeignKey(name = "FK_inquiry_questioner"))
    private User questioner;

    @Column(nullable = false)
    private InquiryStatus status;

    @Column(nullable = false)
    private String question;

    private String answer;

    @Column(updatable = false)
    @CreationTimestamp
    private Date createdOn;

    @UpdateTimestamp
    private Date updatedOn;

    @Builder
    public Inquiry(InquiryType type, String title, User questioner, InquiryStatus status, String question, String answer) {
        this.type = type;
        this.title = title;
        this.questioner = questioner;
        this.status = status;
        this.question = question;
        this.answer = answer;
    }
}
