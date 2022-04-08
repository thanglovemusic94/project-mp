package com.mintpot.readingm.backend.entity.clazz;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.OrderColumn;
import java.util.List;

@Entity
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
public abstract class VodClass extends Class {

    private String imageUrl;

    private String imageFileName;

    //@OneToMany(mappedBy = "vodClass", cascade = CascadeType.ALL)
    @ElementCollection
    @OrderColumn(name = "video_index")
    private List<Video> videos;

   // @ElementCollection
   // @OrderColumn(name = "course_index")
    //private List<Course> courses;

    private String grade;

    @Column(name = "delete_flg", columnDefinition = "boolean default false")
    private boolean deleteFlg;

}
