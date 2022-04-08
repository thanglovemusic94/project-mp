package com.mintpot.busking.utils.search;

import com.mintpot.busking.model.Busking;
import com.mintpot.busking.model.BuskingLand;
import com.mintpot.busking.model.BuskingLand_;
import com.mintpot.busking.model.Busking_;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.internal.engine.groups.Group;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BuskingSpecification implements Specification<Busking> {

    private SearchCriteria criteria;

    private Object castToRequiredType(Class fieldType, String value) {
        if(fieldType.isAssignableFrom(Double.class)){
            return Double.valueOf(value);
        }else if(fieldType.isAssignableFrom(Integer.class)){
            return Integer.valueOf(value);
        }else if(Enum.class.isAssignableFrom(fieldType)){
            return Enum.valueOf(fieldType, value);
        }
        return null;
    }

    private Object castToRequiredType(Class fieldType, List<String> value) {
        List<Object> lists = new ArrayList<>();
        for (String s : value) {
            lists.add(castToRequiredType(fieldType, s));
        }
        return lists;
    }


    @Override
    public Predicate toPredicate(Root<Busking> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder builder) {

        switch (criteria.getOperation()) {
            case EQUALITY:
                return builder.equal(root.get(criteria.getKey()), criteria.getValue());
            case NEGATION:
                return builder.notEqual(root.get(criteria.getKey()), criteria.getValue());
            case GREATER_THAN:
                return builder.greaterThan(root.<String>get(criteria.getKey()), criteria.getValue().toString());
            case LESS_THAN:
                return builder.lessThan(root.<String>get(criteria.getKey()), criteria.getValue().toString());
            case LIKE:
                return builder.like(root.<String>get(criteria.getKey()), criteria.getValue().toString());
            case STARTS_WITH:
                return builder.like(root.<String>get(criteria.getKey()), criteria.getValue() + "%");
            case ENDS_WITH:
                return builder.like(root.<String>get(criteria.getKey()), "%" + criteria.getValue());
            case CONTAINS:
                return builder.like(root.<String>get(criteria.getKey()), "%" + criteria.getValue() + "%");
            case IN:
                return  builder.in(root.get(criteria.getKey())).value(castToRequiredType(root.get(criteria.getKey()).getJavaType(),criteria.getValues()));
            default:
                return null;
        }

    }


}
