package com.mintpot.carcloth.repository;

import com.mintpot.carcloth.constant.ShowStatus;
import com.mintpot.carcloth.entity.ConstructionExample;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ConstructionExampleRepository extends JpaRepository<ConstructionExample, Long> {

    @Query("select ex from ConstructionExample ex where (:status is null or ex.status = :status)" +
            " and (:companyName is null or ex.quotation.company.companyName like %:companyName%)" +
            " and (:writerId is null or ex.writer.memberId like %:writerId%)" +
            " and (:writerName is null or ex.writer.name like %:writerName%)")
    Page<ConstructionExample> findConstructionEx(ShowStatus status, String companyName, String writerId, String writerName, Pageable page);

    Page<ConstructionExample> findByWriter_Id(long writerId, Pageable page);

    @Query(value = "select * from construction_example ex where ex.quotation_id = :quotationId limit 1", nativeQuery = true)
    Optional<ConstructionExample> findByQuotation(long quotationId);
}
