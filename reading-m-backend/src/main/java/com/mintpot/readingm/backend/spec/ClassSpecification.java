package com.mintpot.readingm.backend.spec;

import com.mintpot.readingm.backend.entity.clazz.Class;
import com.mintpot.readingm.backend.entity.clazz.LiveClass;
import com.mintpot.readingm.backend.entity.user.Student;
import com.mintpot.readingm.backend.entity.user.Tutor;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;
import java.util.Set;

public class ClassSpecification {

    public static <E extends Class> Specification<E> hasType(String classType) {

        return (root, query, builder) -> builder.equal(root.get("type"), classType);
    }

    /*public static <E extends Class> Specification<E> byUserId(final long userId) {
        return (root, query, builder) -> {
            query.distinct(true);
            final var liveClassRoot = builder.treat(root, LiveClass.class);
            Join<LiveClass, Tutor> jCT = liveClassRoot.join("tutor", JoinType.LEFT);

            final Subquery<Student> subquery = query.subquery(Student.class);
            final Root<Student> student = subquery.from(Student.class);
            Expression<Set<Class>> studentClasses = student.get("classes");
            subquery.select(student);
            subquery.where(builder.equal(student.get("id"), userId), builder.isMember(root, studentClasses));

            return builder.or(builder.equal(jCT.get("id"), userId), builder.exists(subquery));
        };
    }*/

    public static <E extends Class> Specification<E> byStudentId(final long studentId) {
        return (root, query, builder) -> {

            final Subquery<Student> subquery = query.subquery(Student.class);
            final Root<Student> student = subquery.from(Student.class);
            Expression<Set<E>> studentClasses = student.get("classes");
            subquery.select(student);

            subquery.where(builder.equal(student.get("id"), studentId), builder.isMember(root, studentClasses));

            return builder.exists(subquery);
        };
    }

    public static <E extends LiveClass> Specification<E> byTutorId(final long tutorId) {
        return (root, query, builder) -> {
            query.distinct(true);
            Join<LiveClass, Tutor> jCT = root.join("tutor", JoinType.LEFT);

            return builder.equal(jCT.get("id"), tutorId);
        };
    }
}