package com.mintpot.carcloth.repository;

import com.mintpot.carcloth.constant.enums.ENoticeType;
import com.mintpot.carcloth.entity.AppNotice;
import com.mintpot.carcloth.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AppNoticeRepository extends JpaRepository<AppNotice, Long> {
    Page<AppNotice> findByRecipient_Id(long recipientId, Pageable page);

    @Modifying
    @Transactional
    @Query("delete from AppNotice n where n.createdOn < :date")
    void deleteNoticeOutDate(LocalDate date);

    Optional<AppNotice> findByIdAndRecipient_Id(long id, long recipientId);

    @Query("SELECT n from AppNotice n WHERE n.hasRead = :hasRead" +
            " AND (:recipient is null OR n.recipient = :recipient)" +
            " AND (:type is null OR n.type = :type)")
    List<AppNotice> getNoticeByRecipientAndType(Member recipient, ENoticeType type, boolean hasRead);

    @Query("UPDATE AppNotice n SET n.hasRead = true " +
            "WHERE n.hasRead = false" +
            " AND n.recipient = :recipient" +
            " AND n.type = :type")
    void confirmNotice(Member recipient, ENoticeType type);
}
