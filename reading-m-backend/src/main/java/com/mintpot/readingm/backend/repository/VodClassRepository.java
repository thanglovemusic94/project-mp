package com.mintpot.readingm.backend.repository;

import com.mintpot.readingm.backend.dto.admin.AdVodClassView;
import com.mintpot.readingm.backend.entity.clazz.VodClass;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface VodClassRepository extends ExtendedRepository<VodClass, Long> {

    @Query("select vc from VodClass vc where (:deleteFlg is null or vc.deleteFlg = :deleteFlg) " +
        " and (:name is null or vc.name like %:name%)")
    Page<AdVodClassView> findByNameAndDeleteFlg(String name, boolean deleteFlg, Pageable pageable);
}
