package com.mintpot.readingm.backend.dto.clazz;

import com.mintpot.readingm.backend.dto.admin.ClassInfoView;
import com.mintpot.readingm.backend.dto.admin.UserNameView;
import com.mintpot.readingm.backend.entity.id.UserClassId;

import java.util.Date;

/**
 * View for class review
 *
 */
public interface ClassReviewView {

    UserClassId getId();

    int getRating();

    String getContent();

    ClassInfoView getClassInfo();

    UserNameView getWriter();

    Date getCreatedOn();
}
