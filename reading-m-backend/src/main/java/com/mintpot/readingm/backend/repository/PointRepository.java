package com.mintpot.readingm.backend.repository;

import com.mintpot.readingm.backend.entity.Point;
import com.mintpot.readingm.backend.entity.constant.IssuingMode;
import com.mintpot.readingm.backend.entity.constant.PointType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PointRepository extends JpaRepository<Point, Long> {

    @Query("select p from Point p where (:type is null or p.type = :type) " +
        "and (:pointName is null or p.name like %:pointName%) " +
        "and (:point is null or str(p.amount) like %:point%) " +
        "and (:term is null or (str(p.amount) like %:term% or p.name like %:term%" +
        "  or DATE_FORMAT(p.startValidDate, '%Y.%m.%d') like %:term%" +
        "  or DATE_FORMAT(p.endValidDate, '%Y.%m.%d') like %:term%))")
    Page<Point> find(PointType type, String pointName, String point, String term, Pageable page);

    @Query("select p from Point p left join p.members m where p.issuingMode = :mode or" +
            " m.id = :ownerId" )
    Page<Point> getByOwnerOrMode(long ownerId, IssuingMode mode, Pageable page);

    @Query(value ="select provided.type as type, provided.amount - ifnull(used.amount, 0) as amount from " +
            " (select p.type, sum(p.amount) amount from point p" +
            " left join point_member m on p.id = m.point_id" +
            " where (p.issuing_mode = " + IssuingMode.Constant.ALL_VALUE +
            " or m.owner_id = :ownerId) and p.start_valid_date <= current_date()" +
            " and p.end_valid_date >= current_date()" +
            " group by p.type) provided left join " +
            " (select type,  sum(amount) as amount from point_used where parent_id = :ownerId" +
            " group by type) used on provided.type = used.type ", nativeQuery = true)
    <T> List<T> summaryPointRemained(long ownerId, Class<T> resultType);
}
