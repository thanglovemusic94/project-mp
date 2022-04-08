package com.mintpot.busking.repository;

import com.mintpot.busking.model.BuskingLike;
import com.mintpot.busking.model.BuskingViewer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BuskingLikeRepository extends JpaRepository<BuskingLike, Integer> {
}
