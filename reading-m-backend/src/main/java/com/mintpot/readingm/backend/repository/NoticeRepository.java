package com.mintpot.readingm.backend.repository;


import com.mintpot.readingm.backend.dto.admin.AdNoticeView;
import com.mintpot.readingm.backend.entity.constant.ShowStatus;
import com.mintpot.readingm.backend.entity.notification.Notice;
import com.mintpot.readingm.backend.user.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface NoticeRepository extends ExtendedRepository<Notice, Long>, JpaSpecificationExecutor<Notice> {

    @Query(value = "select n from Notice n where n.role is null or n.role=:role")
    Page<Notice> getNoticesListByRoleAndStatus(Role role, Pageable page);

    @Query(value = "select n from Notice n" +
        " where (:role is null or n.role = :role)" +
        "   and (:query is null or n.title like %:query%)")
    Page<AdNoticeView> findByQuery(Role role, String query, Pageable page);

}
