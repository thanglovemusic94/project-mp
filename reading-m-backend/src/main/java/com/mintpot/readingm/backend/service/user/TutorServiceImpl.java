package com.mintpot.readingm.backend.service.user;


import com.mintpot.readingm.backend.entity.clazz.Class;
import com.mintpot.readingm.backend.repository.ClassReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service("tutorService")
@RequiredArgsConstructor
public class TutorServiceImpl implements TutorService {
    private final ClassReviewRepository classReviewRepo;

    @Override
    public Double getAverageRating(long tutorId, String type) {
        var rate = classReviewRepo.getRateByTutorAndType(tutorId, type);
        return rate.map(r -> Double.valueOf(String.format("%.1f", r))).orElse(null);
    }

    @Override
    public Page<Class> getClassByUserId(long userId, String classType, Pageable page) {
        return null;
    }
}
