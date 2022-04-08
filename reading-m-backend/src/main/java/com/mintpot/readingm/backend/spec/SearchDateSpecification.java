package com.mintpot.readingm.backend.spec;

import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class SearchDateSpecification {

    public static Specification startToEnd(Long startDate, Long endDate, String filedName) {

        return (root, criteriaQuery, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (startDate != null && endDate == null) {
                Predicate preStart = criteriaBuilder.greaterThan(root.get(filedName), new Date(startDate));
                predicates.add(preStart);
            }
            if (startDate == null && endDate != null) {
                Predicate preEnd = criteriaBuilder.lessThan(root.get(filedName), new Date(new Date(endDate).getTime() + 1000 * 60 * 60 * 24));
                predicates.add(preEnd);
            }
            if (startDate != null && endDate != null) {
                Predicate preStart = criteriaBuilder.greaterThan(root.get(filedName), new Date(startDate));
                Predicate preEnd = criteriaBuilder.lessThan(root.get(filedName), new Date(new Date(endDate).getTime() + 1000 * 60 * 60 * 24));
                predicates.add(preStart);
                predicates.add(preEnd);
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
        };
    }
}