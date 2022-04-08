package com.mintpot.pii.service;

import com.mintpot.pii.dto.BranchReviewDto;
import com.mintpot.pii.entity.Reservation;
import org.springframework.web.multipart.MultipartFile;

public interface BranchReviewService {
    void createReview(BranchReviewDto branchReviewDto, MultipartFile photo);
}