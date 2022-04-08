package com.mintpot.readingm.backend.repository;

import com.mintpot.readingm.backend.entity.LiveBookEditWeekHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface LiveBookEditWeekHistoryRepository extends JpaRepository<LiveBookEditWeekHistory, Long> {

    @Query(value = "select his.id as id, his.createdOn as createdOn, " +
        " his.reason as reason, c.name as className, c.type as classType, u.name as tutorName" +
        " from LiveBookEditWeekHistory his " +
        " join Class c on his.classId = c.id " +
        " join User u on his.tutorId = u.id" +
        " where (:className is null or c.name like %:className% )" +
        "   and (:classType is null or c.type  = :classType )" +
        "   and (:tutorName is null or u.name like %:tutorName% )" +
        "   and (:reason is null or his.reason like %:reason% )" +
        "   and (:term is null or c.name like %:term% " +
        "       or u.name like %:term% or his.reason like %:term%)")
    <T> Page<T> findWithTerm(String className, String classType, String tutorName, String reason,
                             String term, Pageable page, Class<T> resultType);
}
