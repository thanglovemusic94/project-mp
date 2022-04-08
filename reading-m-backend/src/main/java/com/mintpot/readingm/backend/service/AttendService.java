package com.mintpot.readingm.backend.service;

import com.mintpot.readingm.backend.dto.settlement.AttendClassDto;
import com.mintpot.readingm.backend.entity.clazz.LiveClass;
import com.mintpot.readingm.backend.entity.settlement.AttendClass;

import java.util.List;

public interface AttendService {
    List<AttendClassDto> groupAttendByClassTime(List<AttendClass> attendClassList);

    List<AttendClassDto> groupAttendByClass(LiveClass liveClass);
}
