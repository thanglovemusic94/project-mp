package com.mintpot.readingm.backend.repository;


import com.mintpot.readingm.backend.entity.clazz.Class;
import com.mintpot.readingm.backend.entity.constant.PaymentStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClassRepository extends ExtendedRepository<Class, Long>, JpaSpecificationExecutor<Class> {

    @Query("select c from Class c join c.tutor t where c.id = :id and t.id = :tutorId")
    Optional<Class> findByClassIdAndTutorId(long id, long tutorId);

    @Query(value = "select c from Class as c ", nativeQuery = false)
    Page<Class> findAll(Pageable pageable, @Nullable Specification<Class> spec);

    @Query(value = "select c.id, c.name, t.id as tutorId, t.name as tutorName from class c left join user_tutor t on c.id = t.class_id where c.type = :classType", nativeQuery = true)
    Page<?> findByUserIdAndType(String classType, Pageable page);

    @Query("select count(*) from Class c join c.students" +
            " where c.id = :classId")
    int getNumberOfLearners(long classId);

    @Query("select c.type from Class c where c.id = :classId")
    Optional<String> getTypeById(long classId);
}
