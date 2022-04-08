package com.mintpot.readingm.backend.entity.clazz;

import com.mintpot.readingm.backend.entity.embeddable.AttachedFile;
import com.vladmihalcea.hibernate.type.json.JsonStringType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import org.hibernate.annotations.TypeDefs;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(
    name = "curriculum_common_file",
    uniqueConstraints = {@UniqueConstraint(
        name = "CLASS_CURRICULUM",
        columnNames = {"curriculum_index", "class_id"}
    )}
)
@TypeDefs({
    @TypeDef(name = "json", typeClass = JsonStringType.class)
})
public class CurriculumCommonFile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "class_id", nullable = false, foreignKey = @ForeignKey(name = "FK_COMMON_FILE_CLASS"))
    private Class classInfo;

    @Column(name = "curriculum_index", nullable = false)
    private int curriculumIndex;

    @Column(columnDefinition = "json")
    @Type(type = "json")
    private List<AttachedFile> files;

    public CurriculumCommonFile(Class classInfo, int curriculumIndex) {
        this.classInfo = classInfo;
        this.curriculumIndex = curriculumIndex;
        this.files = new ArrayList<>();
    }
}
