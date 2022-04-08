package com.mintpot.pii.repository;

import com.mintpot.pii.entity.Keyword;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface KeywordRepository extends JpaRepository<Keyword, String> {

    @Override
    List<Keyword> findAll();

    @Override
    Optional<Keyword> findById(String keywordId);

    boolean existsByName(String keywordId);
}
