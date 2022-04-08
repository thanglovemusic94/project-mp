package com.mintpot.readingm.backend.repository;

import com.mintpot.readingm.backend.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RamsTeacherRepository extends JpaRepository<Teacher, String> {
}
