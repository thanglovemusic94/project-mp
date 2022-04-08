package com.mintpot.readingm.backend.service;

import com.mintpot.readingm.backend.entity.clazz.LiveClass;
import com.mintpot.readingm.backend.entity.clazz.TextBookClass;
import com.mintpot.readingm.backend.entity.constant.ClassType;
import com.mintpot.readingm.backend.exception.CommonException;
import com.mintpot.readingm.backend.exception.ErrorCode;
import com.mintpot.readingm.backend.repository.ClassRepository;
import com.mintpot.readingm.backend.repository.LiveClassRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LiveClassServiceImpl implements LiveClassService {

    private final ClassRepository classRepo;

    private final LiveClassRepository liveClassRepo;

    @Override
    public boolean hasFull(long classId) {
        var liveClass = liveClassRepo.findById(classId).orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));
        return liveClass.getStdNo() == classRepo.getNumberOfLearners(classId);
    }

    @Override
    public String classTypeInKor(LiveClass liveClass) {
        if (liveClass instanceof TextBookClass) {
            return ClassType.LIVE_BOOK.getKoreanLabel();
        }

        return ClassType.LIVE_GOAL.getKoreanLabel();
    }
}
