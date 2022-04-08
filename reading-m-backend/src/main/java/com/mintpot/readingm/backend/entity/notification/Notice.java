package com.mintpot.readingm.backend.entity.notification;

import com.mintpot.readingm.backend.user.Role;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "board_notice")
@Getter
@Setter
@NoArgsConstructor
public class Notice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    @Lob
    private String content;

    private String fileUrl;

    private String fileName;

    private Role role;

    private boolean notAllowedDelete;

    @Column(updatable = false)
    @CreationTimestamp
    private Date createdOn;

    @UpdateTimestamp
    private Date updatedOn;

    @Builder
    public Notice(String title,
                  String content,
                  String fileUrl,
                  String fileName,
                  Role role,
                  boolean notAllowedDelete) {
        this.title = title;
        this.content = content;
        this.fileUrl = fileUrl;
        this.fileName = fileName;
        this.role = role;
        this.notAllowedDelete = notAllowedDelete;
    }
}
