package com.mintpot.readingm.backend.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mintpot.readingm.api.rams.book.School;
import com.mintpot.readingm.api.rams.book.Grade;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Book {

    @Id
    @JsonProperty("B_idx")
    private String idx;

    @JsonProperty("B_title")
    private String title;

    private int week;

    @JsonProperty("B_class")
    private School clazz;

    @JsonProperty("B_grade")
    private Grade grade;

    @JsonProperty("B_publisher")
    private String publisher;

    @JsonProperty("B_writer")
    private String writer;

    @JsonProperty("B_isbn")
    private String isbn;

    @JsonProperty("B_image")
    private String image;

    @JsonProperty("B_activitypaper_s1")
    private String activitypaperS1;

    @JsonProperty("B_activitypaper_s2")
    private String activitypaperS2;

    @JsonProperty("B_activitypaper_t1")
    private String activitypaperT1;

    @JsonProperty("B_activitypaper_t2")
    private String activitypaperT2;

    @Builder
    public Book(String idx,
                int week,
                String title,
                School clazz,
                Grade grade,
                String publisher,
                String writer,
                String bIsbn,
                String image,
                String activitypaperS1,
                String activitypaperS2,
                String activitypaperT1,
                String activitypaperT2) {
        this.idx = idx;
        this.title = title;
        this.week = week;
        this.clazz = clazz;
        this.grade = grade;
        this.publisher = publisher;
        this.writer = writer;
        this.isbn = bIsbn;
        this.image = image;
        this.activitypaperS1 = activitypaperS1;
        this.activitypaperS2 = activitypaperS2;
        this.activitypaperT1 = activitypaperT1;
        this.activitypaperT2 = activitypaperT2;
    }

}
