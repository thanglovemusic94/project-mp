package com.mintpot.readingm.backend.repository;

import com.mintpot.readingm.backend.entity.TossTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TossTransactionRepository extends JpaRepository<TossTransaction, Long> {
}
