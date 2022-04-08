package com.mintpot.pii.repository;

import com.mintpot.pii.entity.Product;
import com.mintpot.pii.entity.constant.CrudStatus;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.Modifying;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @EntityGraph(attributePaths = {"branch", "periodDiscounts"}, type = EntityGraph.EntityGraphType.LOAD)
    Optional<Product> findDetailsById(Long productId);

    @Query("select p from Product p where p.id = :productId")
    @EntityGraph(attributePaths = {"subPhotoUrls"})
    Optional<Product> fetchSubPhotoUrls(@Param("productId") Long productId);

    @EntityGraph(attributePaths = {"periodDiscounts"})
    List<Product> findByBranchId(long branchId);
    
    public List<Product> findAllByBranchIdAndCrudStatus(long branchId, CrudStatus crudStatus);
    public List<Product> findAllByBranchIdInAndCrudStatus(List<Long> branchId, CrudStatus crudStatus);
    
    @Modifying
    @Query("update Product p set p.crudStatus = :crudStatus where p.branch.id = :branchId")
    public int markDeleteByBranchId(long branchId, CrudStatus crudStatus);
    @Modifying
    @Query("update Product p set p.crudStatus = :crudStatus where p.branch.id in(:branchId)")
    public int markDeleteByBranchIdIn(List<Long> branchId, CrudStatus crudStatus);
    
    @Query("SELECT p FROM Product p "
            + " WHERE "
            + " p.name LIKE %:term% "
            + " OR p.code LIKE %:term%  "
            + " OR p.branch.name LIKE %:term% "
            + " OR p.branch.company.brandName LIKE %:term% ")
    public Slice<Product> findAllByTerm(@Param("term") String term, Pageable pageable);
}
