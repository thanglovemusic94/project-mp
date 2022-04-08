package com.mintpot.carcloth.repository;

import com.mintpot.carcloth.entity.Company;
import com.mintpot.carcloth.entity.QuartzJob;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface QuartzJobRepository extends JpaRepository<QuartzJob, Long> {
    Optional<QuartzJob> findByCompany(Company company);
}
