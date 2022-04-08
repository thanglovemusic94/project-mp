package com.mintpot.pii.repository;

import com.mintpot.pii.entity.Manager;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/* @author linhnc@mintpot.vn */
public interface ManagerRepository extends JpaRepository<Manager, Long> {

    @Query("SELECT m FROM Manager m "
            + " WHERE "
            + " m.name LIKE %:term% "
            + " OR m.email LIKE %:term%  "
            + " OR m.phone LIKE %:term%  "
            + " OR m.company.code LIKE %:term% "
            + " OR m.company.brandName LIKE %:term% ")
    public Slice<Manager> findAllByTerm(@Param("term") String term, Pageable pageable);

}
