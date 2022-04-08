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
@SQLDelete(sql="UPDATE board_announcement SET crud_status = 1 WHERE id = ?")
@Where(clause = "crud_status = 0")
public class BoardAnnouncement extends EntityBase { 

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(length = 100)
    private String title;

    @Column(length = 5000)
    private String contents;

    @Column(updatable = false)
    @CreationTimestamp
    private Date createdOn;

    @Builder
    public BoardAnnouncement(long id, String title, String contents) {
        this.id = id;
        this.title = title;
        this.contents = contents;
    }
}
