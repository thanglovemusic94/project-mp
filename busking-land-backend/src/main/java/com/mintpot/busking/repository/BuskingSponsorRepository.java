package com.mintpot.busking.repository;

import com.mintpot.busking.model.BuskingSponsor;
import com.mintpot.busking.model.BuskingViewer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BuskingSponsorRepository extends JpaRepository<BuskingSponsor, Integer> {
}
