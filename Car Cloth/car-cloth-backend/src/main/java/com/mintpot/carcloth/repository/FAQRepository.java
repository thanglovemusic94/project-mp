package com.mintpot.carcloth.repository;

import com.mintpot.carcloth.entity.FAQ;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FAQRepository extends JpaRepository<FAQ, Long> {
    Optional<FAQ> findFirstByOrderByPositionDesc();
}