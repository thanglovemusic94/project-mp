package com.mintpot.carcloth.repository;

import com.mintpot.carcloth.entity.TermsPolicy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TermsPolicyRepository extends JpaRepository<TermsPolicy, Long> {
}
