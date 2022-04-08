package com.mintpot.pii.repository;

import com.mintpot.pii.entity.BranchReview;
import com.mintpot.pii.entity.id.UserBranchId;
import com.mintpot.pii.repository.projection.ReviewPrj;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BranchReviewRepository extends JpaRepository<BranchReview, UserBranchId> {

    @Query("select count(br) as reviewsNo, (case when count(br) > 0 then avg(br.rating) else 0 end) as avgRating from" +
            " BranchReview br where br.branch.id = :branchId")
    ReviewPrj getCountAndAvgByBranchId(@Param("branchId") long branchId);
}
