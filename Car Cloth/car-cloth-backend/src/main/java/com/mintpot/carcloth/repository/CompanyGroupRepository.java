package com.mintpot.carcloth.repository;

import com.mintpot.carcloth.entity.CompanyGroup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CompanyGroupRepository extends JpaRepository<CompanyGroup, Long> {

    Optional<CompanyGroup> findByName(String name);
}
