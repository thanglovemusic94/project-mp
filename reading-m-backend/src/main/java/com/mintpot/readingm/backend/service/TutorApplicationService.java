package com.mintpot.readingm.backend.service;

import com.mintpot.readingm.backend.dto.tutorApplication.RegTutorAppDto;
import com.mintpot.readingm.backend.entity.tutorApplication.TutorApplication;

import java.io.IOException;
import java.util.Optional;

public interface TutorApplicationService {
    TutorApplication create(RegTutorAppDto reg) throws IOException;
    void update(RegTutorAppDto reg, Long id) throws IOException;
    Optional<TutorApplication> getById(long tutorId);
}
