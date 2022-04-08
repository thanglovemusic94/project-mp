package com.mintpot.readingm.backend.repository;

import com.mintpot.readingm.backend.dto.admin.banner.BannerView;
import com.mintpot.readingm.backend.entity.Banner;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BannerRepository extends ExtendedRepository<Banner, Long>, JpaSpecificationExecutor<Banner> {
    @Query(value = "select b from Banner b" +
        " where (:query is null or b.name like %:query%)")
    Page<BannerView> findByQuery(String query, Pageable page);
}
