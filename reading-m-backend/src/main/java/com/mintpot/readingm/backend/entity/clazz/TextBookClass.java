package com.mintpot.readingm.backend.entity.clazz;

import com.mintpot.readingm.backend.entity.constant.SchoolGrade;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.OrderColumn;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
public class TextBookClass extends LiveClass {

    @ElementCollection
    @Cascade(CascadeType.ALL)
    @OrderColumn(name = "curriculum_index")
    private List<TextBookCurriculum> curriculum;

    private String revisionReason;

    private SchoolGrade targetStudentGrade;

    // TODO to be revised after view RAMS API docs
//    private long bookId;
}
