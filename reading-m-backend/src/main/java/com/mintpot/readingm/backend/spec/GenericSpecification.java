package com.mintpot.readingm.backend.spec;

import lombok.SneakyThrows;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;
import java.lang.reflect.Field;

public class GenericSpecification<T> implements Specification<T> {

    private final SpecSearchCriteria criteria;

    public GenericSpecification(SpecSearchCriteria criteria) {
        this.criteria = criteria;
    }

    public static Field getField(Class<?> clazz, String name) {
        Field field = null;
        while (clazz != null && field == null) {
            try {
                field = clazz.getDeclaredField(name);
            } catch (Exception e) {
            }
            clazz = clazz.getSuperclass();
        }
        return field;
    }

    @SneakyThrows
    @Override
    public Predicate toPredicate(Root<T> root, CriteriaQuery<?> query, CriteriaBuilder builder) {

        Object val = criteria.getValue();
        var clazz = root.getJavaType();
        var field = getField(clazz, criteria.getKey());
        if (field != null && field.getType().isEnum()) {
            var enumVals = field.getType().getEnumConstants();
            for (Object enumVal : enumVals) {
                if (enumVal.toString().equalsIgnoreCase(criteria.getValue().toString())) {
                    val = enumVal;
                    break;
                }
            }
        }

        Expression<?> expression = null;
        if (criteria.getKey().contains(".")) {
            var nestedPath = criteria.getKey().split("\\.");
            for (var i = 0; i < nestedPath.length - 1; i++) {
                if (i == 0) {
                    expression = root.join(nestedPath[i]);
                } else {
                    expression = ((Join<?, ?>) expression).join(nestedPath[i]);
                }
            }

            if (expression != null)
                expression = ((Path) expression).get(nestedPath[nestedPath.length - 1]);
        } else {
            expression = root.get(criteria.getKey());
        }

        switch (criteria.getOperation()) {
            case EQUALITY:
                return builder.equal(expression, val);
            case NEGATION:
                return builder.notEqual(expression, val);
            case GREATER_THAN:
                return builder.greaterThan(root.get(criteria.getKey()), val.toString());
            case LESS_THAN:
                return builder.lessThan(root.get(criteria.getKey()), val.toString());
            case LIKE:
                return builder.like((Expression<String>) expression, val.toString());
            case STARTS_WITH:
                return builder.like((Expression<String>) expression, val + "%");
            case ENDS_WITH:
                return builder.like((Expression<String>) expression, "%" + val);
            case CONTAINS:
                return builder.like((Expression<String>) expression, "%" + val + "%");
            default:
                return null;
        }
    }
}
