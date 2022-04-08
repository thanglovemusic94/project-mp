package com.mintpot.readingm.backend.entity.clazz;


import com.mintpot.readingm.backend.entity.embeddable.AttachedFile;
import com.vladmihalcea.hibernate.type.json.JsonStringType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import org.hibernate.annotations.TypeDefs;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "curriculum_attach_file")
@TypeDefs({
    @TypeDef(name = "json", typeClass = JsonStringType.class)
})
public class CurriculumAttachedFile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "class_id", nullable = false, foreignKey = @ForeignKey(name = "FK_ATTACHED_FILE_CLASS"))
    private Class classInfo;

    @Column(name = "curriculum_index", nullable = false)
    private int curriculumIndex;

    @Column(name = "recipient_id")
    private Long recipientId;

    @Column(name = "sender_id", nullable = false)
    private Long senderId;

    @Column(columnDefinition = "json")
    @Type(type = "json")
    private List<AttachedFile> files;

    @CreationTimestamp
    private LocalDateTime createdOn;

    public CurriculumAttachedFile(int curriculumIndex, Class classInfo, Long recipientId, Long senderId) {
        this.classInfo = classInfo;
        this.curriculumIndex = curriculumIndex;
        this.recipientId = recipientId;
        this.senderId = senderId;
        this.files = new ArrayList<>();
    }
}
