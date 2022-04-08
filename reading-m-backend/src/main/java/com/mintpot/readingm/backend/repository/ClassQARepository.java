package com.mintpot.readingm.backend.repository;

import com.mintpot.readingm.backend.dto.clazz.ClassQAView;
import com.mintpot.readingm.backend.dto.student.StudentQAView;
import com.mintpot.readingm.backend.entity.clazz.Class;
import com.mintpot.readingm.backend.entity.clazz.ClassQA;
import com.mintpot.readingm.backend.entity.user.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface ClassQARepository extends ExtendedRepository<ClassQA, Long>, JpaSpecificationExecutor<ClassQA> {

    @Query("select c from ClassQA c where c.classInfo.id = :classId and " +
            " (c.isSecret is false or " +
            " c.questioner.id= :viewerId or c.classInfo.tutor.id = :viewerId)")
    Page<ClassQAView> findByClassId(long classId,  long viewerId, Pageable page);

    @Query(value = "select c from ClassQA c where c.classInfo.tutor.id= :tutorId order by c.createdOn desc")
    Page<ClassQAView> findByTutorId(long tutorId, Pageable page);

    @Query(value = "select c from ClassQA c where c.questioner.id= :viewerId")
    Page<StudentQAView> getClassQAByStudent(long viewerId, Pageable page);

    @Query(value = "update ClassQA q set q.answer = :answer, q.updatedOn= current_timestamp where q.id = :classQAId")
    @Modifying
    @Transactional
    void replyQA(long classQAId, String answer);


}
