package com.mintpot.readingm.backend.repository;

import com.mintpot.readingm.backend.entity.RamsStudent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RamsStudentRepository extends JpaRepository<RamsStudent, String> {
}
