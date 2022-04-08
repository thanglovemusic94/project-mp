package com.mintpot.readingm.backend.dto.admin;

import com.mintpot.readingm.backend.entity.constant.ClassType;
import com.mintpot.readingm.backend.entity.constant.ShowStatus;

import java.time.LocalDateTime;
import java.util.Date;

public interface PaidClassView {


    Date getPaymentCreatedOn();

    long getClassId();

    ClassType getClassType();

}
