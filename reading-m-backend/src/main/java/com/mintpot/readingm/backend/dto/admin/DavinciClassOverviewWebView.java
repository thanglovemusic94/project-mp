package com.mintpot.readingm.backend.dto.admin;

import com.mintpot.readingm.backend.entity.clazz.ClassReview;
import com.mintpot.readingm.backend.entity.constant.SchoolGrade;

import java.util.Set;

public interface DavinciClassOverviewWebView {

    int getId();

    String getName();

    String getImageUrl();

    String getIntro();

    SchoolGrade getGrade();

    String getPreparation();

    String getMaterials();

    long getTuitionFee();

    Set<VideoView> getVideos();

    Set<ClassReview> getReviews();

    interface VideoView{
        long getId();
        long getPrice();
        long getTime();
        String getTitle();
        String getVideoUrl();
    }
}
