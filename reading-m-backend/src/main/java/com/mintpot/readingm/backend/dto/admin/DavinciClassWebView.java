package com.mintpot.readingm.backend.dto.admin;

import com.mintpot.readingm.backend.entity.clazz.ClassReview;
import com.mintpot.readingm.backend.entity.constant.SchoolGrade;

import java.util.Set;

public interface DavinciClassWebView {

    int getId();

    String getName();

    String getImageUrl();

    Set<ClassReviewRating> getReviews();

    interface ClassReviewRating{
        int getRating();
    }

}
