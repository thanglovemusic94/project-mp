package com.mintpot.carcloth.repository;

import com.mintpot.carcloth.constant.enums.EQuoteStatus;
import com.mintpot.carcloth.dto.company.QuoteList;
import com.mintpot.carcloth.dto.company.SalesInfo;
import com.mintpot.carcloth.dto.quote.CompanyQuoteDetail;
import com.mintpot.carcloth.dto.quote.CompanyQuoteInfo;
import com.mintpot.carcloth.entity.Company;
import com.mintpot.carcloth.entity.CompanyQuote;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CompanyQuoteRepository extends JpaRepository<CompanyQuote, Long> {

    @Query(value = "select cq.id, t.type, cq.status, b.brand_name as brand, m.model_name as model, " +
            "ct.name as carType, cq.reservation_date as reservationDate, cq.confirmed, " +
            "cq.complete_date as completeDate, t.desired_date as desiredDate, ce.id as conExample " +
            "from company_quote cq " +
            "join transaction t on t.id = cq.transaction_id " +
            "join user u on u.id = t.user_id " +
            "join car_type ct on ct.id = u.car_type_id " +
            "join model m on m.id = ct.model_id " +
            "join brand b on b.id = ct.brand_id " +
            "left join construction_example ce on ce.quotation_id = cq.id " +
            "where cq.delete_flg = 0 and cq.company_id = :companyId and cq.status = :status",
            countQuery = "select cq.id " +
            "from company_quote cq " +
            "join transaction t on t.id = cq.transaction_id " +
            "join user u on u.id = t.user_id " +
            "join car_type ct on ct.id = u.car_type_id " +
            "join model m on m.id = ct.model_id " +
            "join brand b on b.id = ct.brand_id " +
            "where cq.delete_flg = 0 and cq.company_id = :companyId and cq.status = :status",
            nativeQuery = true)
    Page<QuoteList> getQuotesByCompanyAndStatus(long companyId, int status, Pageable pageable);

    @Query(value = "select cq.id, t.type, cq.status, b.brand_name as brand, m.model_name as model, " +
            "ct.name as carType, cq.reservation_date as reservationDate, cq.confirmed, " +
            "cq.complete_date as completeDate, t.desired_date as desiredDate, ce.id as conExample " +
            "from company_quote cq " +
            "join transaction t on t.id = cq.transaction_id " +
            "join user u on u.id = t.user_id " +
            "join car_type ct on ct.id = u.car_type_id " +
            "join model m on m.id = ct.model_id " +
            "join brand b on b.id = ct.brand_id " +
            "left join construction_example ce on ce.quotation_id = cq.id " +
            "where cq.delete_flg = 0" +
            " and cq.company_id = :companyId " +
            " and cq.status > " + EQuoteStatus.Constant.DELIVERED +
            " and cq.status < " + EQuoteStatus.Constant.COMPLETE,
            countQuery = "select cq.id " +
            "from company_quote cq " +
            "join transaction t on t.id = cq.transaction_id " +
            "join user u on u.id = t.user_id " +
            "join car_type ct on ct.id = u.car_type_id " +
            "join model m on m.id = ct.model_id " +
            "join brand b on b.id = ct.brand_id " +
            "where cq.delete_flg = 0" +
            " and cq.company_id = :companyId " +
            " and cq.status > " + EQuoteStatus.Constant.DELIVERED +
            " and cq.status < " + EQuoteStatus.Constant.COMPLETE,
            nativeQuery = true)
    Page<QuoteList> getQuoteReservation(long companyId, Pageable pageable);

    @Modifying
    @Transactional
    @Query("UPDATE CompanyQuote c SET c.deleteFlg = true WHERE c.id = :id")
    void delete(long id);

    @Query(value = "select cq.paymentAmount from CompanyQuote cq " +
            "where cq.deleteFlg = 0" +
            " and cq.completeDate >= :start" +
            " and cq.completeDate <= :end" +
            " and cq.company.id = :companyId" +
            " and cq.status = " + EQuoteStatus.Constant.COMPLETE)
    List<Integer> paymentAmountsByCompany(long companyId, LocalDateTime start, LocalDateTime end);

    @Query(value = "select b.brand_name as brand, m.model_name as model, ct.name as carType," +
            " cq.complete_date as completeDate, u.name as requestedName, cq.payment_amount as paymentAmount " +
            "from company_quote cq " +
            "join transaction t on t.id = cq.transaction_id " +
            "join user u on u.id = t.user_id " +
            "join car_type ct on ct.id = u.car_type_id " +
            "join model m on m.id = ct.model_id " +
            "join brand b on b.id = ct.brand_id " +
            "where cq.delete_flg = 0" +
            " and cq.complete_date >= :start" +
            " and cq.complete_date <= :end" +
            " and cq.company_id = :companyId" +
            " and cq.status = " + EQuoteStatus.Constant.COMPLETE,
            countQuery = "select cq.id from company_quote cq " +
            "where cq.delete_flg = 0" +
            " and cq.complete_date >= :start" +
            " and cq.complete_date <= :end" +
            " and cq.company_id = :companyId" +
            " and cq.status = " + EQuoteStatus.Constant.COMPLETE
            , nativeQuery = true)
    Page<SalesInfo> getSalesInfo(long companyId, LocalDateTime start, LocalDateTime end, Pageable pageable);

    @Query(value = "SELECT cq FROM CompanyQuote cq WHERE cq.id = :id")
    CompanyQuoteDetail getQuotationDetailById(long id);

    @Query(value = "SELECT COUNT(DISTINCT cq.transaction) FROM CompanyQuote cq " +
            "WHERE cq.status = :status AND cq.deleteFlg = false")
    int totalTransactionByStatus(EQuoteStatus status);

    @Query(value = "SELECT COUNT(cq.id) FROM CompanyQuote cq " +
            "WHERE (:company is null or cq.company = :company)" +
            " AND cq.status = " + EQuoteStatus.Constant.REQUESTED)
    int countNewRequest(Company company);

    @Query(value = "SELECT cq FROM CompanyQuote cq " +
            "WHERE cq.transaction.id = :transactionId" +
            "  AND cq.status <> " + EQuoteStatus.Constant.REQUESTED +
            "  AND cq.deleteFlg = :deleteFlg")
    List<CompanyQuoteInfo> findByTransaction_IdAndDeleteFlg(long transactionId, boolean deleteFlg);

    @Query(value = "select cq.id " +
            "from company_quote cq " +
            "where cq.delete_flg = 0" +
            " and cq.company_id = :companyId " +
            " and cq.status = :status", nativeQuery = true)
    List<Long> findByCompanyAndStatus(long companyId, int status);

    @Query(value = "select cq.id " +
            "from company_quote cq " +
            "where cq.delete_flg = 0" +
            " and cq.company_id = :companyId " +
            " and cq.status > " + EQuoteStatus.Constant.DELIVERED +
            " and cq.status < " + EQuoteStatus.Constant.COMPLETE, nativeQuery = true)
    List<Long> findQuoteReservationByCompany(long companyId);
}
