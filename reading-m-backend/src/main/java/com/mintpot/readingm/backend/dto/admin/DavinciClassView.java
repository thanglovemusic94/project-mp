package com.mintpot.readingm.backend.dto.admin;

import com.mintpot.readingm.backend.entity.constant.SchoolGrade;

import java.util.Set;

public interface DavinciClassView {

    int getId();

    String getName();

    String getImageUrl();

    String getIntro();

    SchoolGrade getGrade();

    String getPreparation();

    long getTuitionFee();

    Set<VideoView> getVideos();

    interface VideoView{
        long getPrice();
        long getTime();
        String getTitle();
        String getVideoUrl();
    }
}
