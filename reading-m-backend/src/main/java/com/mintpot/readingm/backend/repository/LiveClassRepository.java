package com.mintpot.readingm.backend.repository;


import com.mintpot.readingm.backend.dto.admin.AdClassView;
import com.mintpot.readingm.backend.entity.clazz.LiveClass;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LiveClassRepository extends ExtendedRepository<LiveClass, Long>,
    JpaSpecificationExecutor<LiveClass> {

    @Query("select c from LiveClass c join c.students std where c.id = :id and std.id = :studentId")
    Optional<LiveClass> findByClassIdAndStudentId(long id, long studentId);

    @Query("select c from LiveClass c join c.tutor t where c.id = :id and t.id = :tutorId")
    Optional<LiveClass> findByClassIdAndTutorId(long id, long tutorId);

    @Query("select c from LiveClass c join c.students std where std.id = :studentId")
    List<LiveClass> findByStudentId(long studentId);

    List<LiveClass> findByTutor_Id(long tutorId);

    List<LiveClass> findBySettled(boolean settled);

    @Query("select lc from LiveClass lc" +
        " where (:classType is null or lc.type = :classType)" +
        "    and (:className is null or lc.name like %:className%)" +
        "    and (:tutorName is null or lc.tutor.name like %:tutorName%)" +
        "    and (:tuitionFee is null or CONVERT(lc.tuitionFee,char) like %:tuitionFee%)" +
        "    and (:term is null or ( lc.name like %:term%" +
        "                        or  lc.tutor.name like %:term%" +
        "                        or  CONVERT(lc.tuitionFee,char) like %:term%))")
    Page<AdClassView> search(String classType, String className, String tutorName,
                             String tuitionFee, String term, Pageable page);
}
