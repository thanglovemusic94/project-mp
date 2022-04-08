package com.mintpot.readingm.backend.repository;

import com.mintpot.readingm.backend.entity.user.Student;
import com.mintpot.readingm.backend.user.UserStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Long> {

    @Query(value = "select student From Student student where (" +
            ":signupFrom is null or student.createdOn >= :signupFrom) and (" +
            ":signupTo is null or student.createdOn <= :signupTo) and (" +
            ":term is null or student.memberId like %:term% or student.name like %:term% or " +
            "student.phone like %:term% or student.email like %:term% or str(student.grade) like %:term%)")
    Page<Student> getMemberList(Date signupFrom, Date signupTo, String term, Pageable page);

    @Query("select std from Student std where std.parent.id = :parentId and " +
            "std.status = " + UserStatus.Constant.ACTIVATED_VALUE)
    List<Student> findByParent_Id(long parentId);

    boolean existsByIdAndParent_Id(long id, long parentId);
}
