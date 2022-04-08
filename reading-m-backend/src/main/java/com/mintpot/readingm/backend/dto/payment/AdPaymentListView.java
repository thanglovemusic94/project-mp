package com.mintpot.readingm.backend.dto.payment;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mintpot.readingm.backend.entity.constant.ClassType;
import com.mintpot.readingm.backend.entity.constant.PaymentMethod;
import com.mintpot.readingm.backend.entity.constant.PaymentStatus;

import java.time.LocalDateTime;

public interface AdPaymentListView {
    long getId();

    @JsonIgnore
    Integer getClassTypeCode();

    default String getClassType() {
        var type = ClassType.valueOf(getClassTypeCode());
        switch (type) {
            case LIVE_BOOK:
                return "TextBookClass";
            case LIVE_GOAL:
                return "GoalClass";
            case MATHEMATICS:
                return "DavinciClass";
        }
        return type.name();
    }

    String getClassName();

    LocalDateTime getPaymentTime();

    @JsonIgnore
    Integer getStatusCode();

    default String getStatus() {
        return PaymentStatus.valueOf(getStatusCode()).name();
    }

    @JsonIgnore
    Integer getMethodCode();

    default String getMethod() {
        return PaymentMethod.valueOf(getMethodCode()).name();
    }

    String getPayerName();

    String getTutorName();

    int getPayValue();
}
