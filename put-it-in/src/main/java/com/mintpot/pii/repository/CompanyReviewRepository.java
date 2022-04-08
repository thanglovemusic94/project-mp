package com.mintpot.pii.repository;

import com.mintpot.pii.entity.BranchReview;
import com.mintpot.pii.entity.id.UserBranchId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyReviewRepository extends JpaRepository<BranchReview, UserBranchId> {


}
