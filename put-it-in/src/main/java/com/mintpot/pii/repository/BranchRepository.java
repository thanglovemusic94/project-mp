package com.mintpot.pii.repository;

import com.mintpot.pii.dto.ProductTwoDto;
import com.mintpot.pii.entity.Branch;
import com.mintpot.pii.entity.constant.CrudStatus;
import java.math.BigInteger;
import org.locationtech.jts.geom.Point;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

public interface BranchRepository extends JpaRepository<Branch, Long> {

    @EntityGraph(attributePaths = {"products", "subPhotoUrls", "keywords"}, type = EntityGraph.EntityGraphType.LOAD)
    @Query("select b from Branch b where b.id in :listIds order by st_distance(:loc, b.location)")
    List<Branch> findAllByIdInOrderByDistance(@Param("listIds") List<Long> listIds, @Param("loc") Point loc);

    @Query("select b.id from Branch b left join b.keywords k where b.name like %:term% or k.name like %:term% group by b.id order by st_distance(:loc, b.location)")
    Slice<Long> getIdBySearchTermOrderByDistance(@Param("term") String term, @Param("loc") Point loc, Pageable page);

    @Query("select b from Branch b where b.id in :listIds")
    List<Branch> findAllByIdIn(@Param("listIds") List<Long> listIds, Sort sort);

    @Query("select b.id from Branch b left join b.keywords k where b.name like %:term% or k.name like %:term%")
    Slice<Long> getIdBySearchTerm(@Param("term") String term, Pageable page);

    // linhnc
    @Query(value = " SELECT last.id"
            + " FROM "
            + " (SELECT b.id "
            + " FROM branch b, product p, branch_keyword bk"
            + " ,(SELECT product_id, min(discount_percentage) discount, month_amount"
            + " FROM product_period_discounts"
            + " GROUP BY product_id ) pd"
            + " WHERE 1=1"
            + " AND "
            + " ("
            + " b.name LIKE %:term%"
            + " OR "
            + " b.id = bk.branch_id AND bk.keyword_id LIKE %:term% "
            + " )"
            + " AND b.id = p.branch_id"
            + " AND p.id = pd.product_id"
            + " GROUP BY b.id"
            + " ORDER BY "
            + " CASE WHEN :sortDir = 'asc'  THEN (p.price* (100-pd.discount)/100)  END ASC ,"
            + " CASE WHEN :sortDir = 'desc' THEN (p.price* (100-pd.discount)/100)  END DESC"
            + " ) last ",
            nativeQuery = true)
    Slice<BigInteger> getIdSearchTermOrderByPrice(@Param("term") String term, @Param("sortDir") String sortDir, Pageable page);

    @Query(" SELECT b "
            + " FROM Branch b "
            + " WHERE b.id IN :listIds "
            + " ORDER BY FIELD(b.id, :listIds )")
    List<Branch> findAllByIdInOrder(@Param("listIds") List<Long> listIds);

//    @Modifying(clearAutomatically = true)
    @Transactional
    @Query(value = " CREATE OR REPLACE VIEW search_product_price "
            + "	AS  "
            + "	SELECT p.id, p.price, (p.price* (100-pd.discount)/100) price_discount , b.id branch_id "
            + "	FROM product p, branch b "
            + " ,(SELECT product_id, min(discount_percentage) discount, month_amount "
            + "	FROM product_period_discounts "
            + "	GROUP BY product_id ) pd "
            + "	WHERE 1=1 "
            + "	AND b.id IN (:branchIds) "
            + "	AND p.branch_id = b.id "
            + " AND p.id = pd.product_id "
            + " ORDER BY FIELD (b.id, :branchIds) ",
            nativeQuery = true)
    public void createViewProductPrice(@Param("branchIds") List<Long> branchIds);

    @Query(value = " SELECT id, price, price_discount AS priceDiscount, branch_id AS branchId "
            + " FROM "
            + " (   SELECT  "
            + "        id,  "
            + "        price, "
            + "        price_discount,  "
            + "        branch_id, "
            + "        @rn \\:= IF(@prev = branch_id, @rn + 1, 1) AS rn, "
            + "        @prev \\:= branch_id "
            + "     FROM search_product_price "
            + "     JOIN (SELECT @prev \\:= NULL, @rn \\:= 0) AS vars "
            + "     ORDER BY "
            + "     CASE WHEN :sortDir = 'desc' THEN branch_id END DESC, "
            + "     CASE WHEN :sortDir = 'desc' THEN price END DESC, "
            + "     CASE WHEN :sortDir = 'asc'  THEN branch_id END ASC,"
            + "     CASE WHEN :sortDir = 'asc'  THEN price END ASC "
            + " ) AS T1 "
            + "WHERE rn <= 2",
            nativeQuery = true)
    public List<ProductTwoDto> listTwoProductByBranchId(@Param("sortDir") String sortDir);

    @Query("SELECT b FROM Branch b  "            
            + " WHERE b.crudStatus = :crudStatus "
            + " AND("
            + " b.code LIKE %:term%  "
            + " OR b.name LIKE %:term% "
            + " OR b.company.brandName LIKE %:term% "
            + " )")
    public Slice<Branch> findAllByTerm(@Param("term") String term,@Param("crudStatus") CrudStatus status, Pageable pageable);

    public Slice<Branch> findAllByCrudStatus(CrudStatus crudStatus, Pageable pageable);

    public List<Branch> findAllByCompanyIdAndCrudStatus(long companyId, CrudStatus crudStatus);

    @Modifying
    @Query("update Branch b set b.crudStatus = :crudStatus where b.company.id = :id")
    public int markDeleteByCompanyId(@Param("id")long companyId, CrudStatus crudStatus);

    @Modifying
    @Query("update Branch b set b.crudStatus = :crudStatus where b.id = :id")
    public void markDeleteById(@Param("id")long branchId, CrudStatus crudStatus);

}
