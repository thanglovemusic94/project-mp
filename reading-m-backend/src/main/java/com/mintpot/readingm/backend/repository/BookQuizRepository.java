package com.mintpot.readingm.backend.repository;

import com.mintpot.readingm.backend.entity.BookQuiz;
import org.springframework.stereotype.Repository;

@Repository
public interface BookQuizRepository extends ExtendedRepository<BookQuiz, String> {
}
