package com.mintpot.pii.repository;

import com.mintpot.pii.entity.Company;
import com.mintpot.pii.entity.constant.CrudStatus;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CompanyRepository extends JpaRepository<Company, Long> {

    @Query("SELECT c FROM Company c  "
            + " WHERE c.crudStatus = :crudStatus"
            + " AND("
            + " c.code LIKE %:term%  "
            + " OR c.brandName LIKE %:term% "
            + " OR c.registrationName LIKE %:term% "
            + " OR c.registrationNumber LIKE %:term% "
            + " OR c.representative.name LIKE %:term%"
            + " )")
    public Slice<Company> findAllByTerm(@Param("term") String term,@Param("crudStatus") CrudStatus status, Pageable pageable);
    
   @Query("SELECT c FROM Company c  "
            + " WHERE c.crudStatus = :crudStatus"
            + " AND("
            + " c.code LIKE %:term%  "
            + " OR c.brandName LIKE %:term% "
           + " )")
    public Slice<Company> findAllByCodeOrName(@Param("term") String codeOrName, @Param("crudStatus")CrudStatus crudStatus, Pageable pageable);

    public Slice<Company> findAllByCrudStatus(@Param("crudStatus")CrudStatus crudStatus, Pageable pageable);
    
    @Modifying
    @Query("update Company c set c.crudStatus = :crudStatus where c.id = :id")
    public int markDeleteById(@Param("id")long companyId, CrudStatus crudStatus);
}
