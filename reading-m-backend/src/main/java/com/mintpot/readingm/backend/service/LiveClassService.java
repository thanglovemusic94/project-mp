package com.mintpot.readingm.backend.service;

import com.mintpot.readingm.backend.entity.clazz.LiveClass;

public interface LiveClassService {
    boolean hasFull(long classId);

    String classTypeInKor(LiveClass liveClass);
}
