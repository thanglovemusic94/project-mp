package com.mintpot.readingm.backend.repository;

import com.mintpot.readingm.backend.entity.Branch;
import org.springframework.stereotype.Repository;

@Repository
public interface BranchRepository extends ExtendedRepository<Branch, String> {
}
