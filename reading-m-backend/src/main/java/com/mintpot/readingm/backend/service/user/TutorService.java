package com.mintpot.readingm.backend.service.user;

public interface TutorService extends UserService {
    Double getAverageRating(long tutorId, String type);
}
