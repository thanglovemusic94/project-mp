package com.mintpot.readingm.backend.repository;

import com.mintpot.readingm.backend.dto.clazz.ClassAvailableReview;
import com.mintpot.readingm.backend.entity.clazz.ClassReview;
import com.mintpot.readingm.backend.entity.constant.PaymentStatus;
import com.mintpot.readingm.backend.entity.constant.ShowStatus;
import com.mintpot.readingm.backend.entity.id.UserClassId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface ClassReviewRepository extends ExtendedRepository<ClassReview, UserClassId> {

    <T> Page<T> findByClassInfo_Id(long classId, Pageable page, java.lang.Class<T> resultType);

    @Query("select avg(r.rating) from ClassReview r where r.classInfo.tutor.id = :tutorId and r.classInfo.type = :type")
    Optional<Double> getRateByTutorAndType(long tutorId, String type);

    @Query("select avg(r.rating) from ClassReview r where r.classInfo.id = :classId")
    Optional<Double> getRateByClass(long classId);

    @Query("select r from ClassReview r join LiveClass c on r.classInfo.id = c.id" +
            " where c.tutor.id = :tutorId and c.type = :classType")
    <T> Page<T> findByTutorIdAndClassType(long tutorId, String classType, Pageable page, java.lang.Class<T> resultType);

    @Query("select r from ClassReview r where r.id.userId = :userId")
    <T> Page<T> findByStudent(long userId, Pageable page, java.lang.Class<T> resultType);

    <T> Page<T> findByWriter_Id(long studentId, Pageable page, java.lang.Class<T> resultType);

    @Query("select r from ClassReview r" +
            " where (:status is null or r.status = :status)" +
            "    and (:classType is null or r.classInfo.type = :classType)" +
            "    and (:content is null or r.content like %:content%)" +
            "    and (:reviewer is null or r.writer.name like %:reviewer%)" +
            "    and (:term is null or ( r.content like %:term%" +
            "                        or  r.writer.name like %:term%" +
            "                        or  DATE_FORMAT(r.createdOn, '%Y-%m-%d') like %:term%))")
    <T> Page<T> search(ShowStatus status, String classType, String content, String reviewer, String term, Pageable page);

    @Query(value = "select tb.id as id, tb.name as name, tb.profile_image_url as profileImageUrl, tb.type as classType from (" +
            "  select sum(r.rating) rating, u.id, u.name, t.profile_image_url, c.type from user_review r " +
            " join class c on r.class_id = c.id " +
            " join user u on c.tutor_id = u.id" +
            " join user_tutor t on u.id = t.id" +
            " where c.type = :classType " +
            " and r.created_on >= :startTime and r.created_on <= :endTime " +
            " group by u.id, u.name, t.profile_image_url) tb " +
            " order by tb.rating desc",
            
            countQuery = "select count(*) from (" +
                    "  select sum(r.rating), u.id from user_review r " +
                    "  join class c on r.class_id = c.id  " +
                    "  join user u on c.tutor_id = u.id " +
                    "  join user_tutor t on u.id = t.id " +
                    "  where c.type = :classType " +
                    "  and r.created_on >= :startTime and r.created_on <= :endTime " +
                    "  group by u.id) tb",
            nativeQuery = true)
    <T> Page<T> findTutorsHasHighestRate(String classType, LocalDateTime startTime, LocalDateTime endTime,
            Pageable page, java.lang.Class<T> resultType);

    @Query(value = "select c.id as classId, c.type as classType, c.name as className," +
        "  u.id as tutorId, u.member_id as memberId, u.name as tutorName, u.phone as tutorPhone " +
        "from class c " +
        "left join user u on c.tutor_id = u.id " +
        "left join payment p on p.student_id = :studentId " +
        "where p.status = " + PaymentStatus.Constant.COMPLETED +
        "  and not exists (select id from refund r where r.payment_id = p.id) " +
        "  and not exists (select ur.class_id from user_review ur where ur.writer_id = :studentId and ur.class_id = c.id) " +
        "group BY c.id " +
        "order by c.open_date desc",
        countQuery = "select count(distinct c.id) from class c " +
            "left join payment p on p.student_id = :studentId " +
            "where p.status =  " + PaymentStatus.Constant.COMPLETED +
            "  and not exists (select r.id from refund r where r.payment_id = p.id) " +
            "  and not exists (select ur.class_id from user_review ur where ur.writer_id = :studentId and ur.class_id = c.id) " +
            "order by p.created_on desc",
        nativeQuery = true)
    Page<ClassAvailableReview> findClassAvailableReviewByUserId(Long studentId, Pageable page);
}
