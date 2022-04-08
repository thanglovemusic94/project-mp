package com.mintpot.busking.repository;

import com.mintpot.busking.model.BuskingViewer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BuskingViewerRepository extends JpaRepository<BuskingViewer, Integer> {

    @Query("from BuskingViewer bv where bv.user.id = :userId and bv.buskingInfo.id = :buskingId order by bv.id DESC ")
    List<BuskingViewer> getBuskingViewerByBuskingAndUser (int buskingId, int userId);

}
