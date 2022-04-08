package com.mintpot.readingm.backend.repository;

import com.mintpot.readingm.backend.entity.NewspaperColumn;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface NewspaperColumnRepository extends ExtendedRepository<NewspaperColumn, String> {
    @Query("select n from NewspaperColumn n where (:field is null or n.cSubject = :field) and" +
            " (:title is null or n.cTitle like %:title%)")
    Page<NewspaperColumn> find(String field, String title, Pageable page);

}
