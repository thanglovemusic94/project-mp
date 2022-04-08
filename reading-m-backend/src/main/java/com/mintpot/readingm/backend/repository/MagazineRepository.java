package com.mintpot.readingm.backend.repository;

import com.mintpot.readingm.backend.dto.admin.magazine.MagazineView;
import com.mintpot.readingm.backend.entity.Magazine;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MagazineRepository extends ExtendedRepository<Magazine, Long>, JpaSpecificationExecutor<Magazine> {
    @Query(value = "select m from Magazine m" +
        " where (:query is null or m.title like %:query%)")
    Page<MagazineView> findByQuery(String query, Pageable page);
}
