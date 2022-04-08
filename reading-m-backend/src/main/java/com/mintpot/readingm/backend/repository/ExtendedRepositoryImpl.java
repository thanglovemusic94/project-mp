package com.mintpot.readingm.backend.repository;

import com.mintpot.readingm.backend.exception.ConfigurationException;
import org.springframework.context.annotation.DependsOn;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.query.QueryUtils;
import org.springframework.data.jpa.repository.support.JpaEntityInformation;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.data.mapping.PropertyPath;
import org.springframework.data.projection.ProjectionFactory;
import org.springframework.data.projection.SpelAwareProxyProjectionFactory;

import javax.persistence.EntityManager;
import javax.persistence.Tuple;
import javax.persistence.TupleElement;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import java.beans.PropertyDescriptor;
import java.io.Serializable;
import java.lang.reflect.Method;
import java.util.*;

@DependsOn("projectionFactory")
public class ExtendedRepositoryImpl<T, ID extends Serializable> extends SimpleJpaRepository<T, ID> implements ExtendedRepository<T, ID> {

    private ProjectionFactory projectionFactory;

    private final EntityManager entityManager;

    public ExtendedRepositoryImpl(JpaEntityInformation<T, ?> entityInformation, EntityManager entityManager) {
        super(entityInformation, entityManager);
        this.entityManager = entityManager;
    }

    @Override
    public <P> Page<P> find(Specification<T> spec, Pageable page, Class<P> projectionClass) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Tuple> tupleQuery = criteriaBuilder.createTupleQuery();
        var root = tupleQuery.from(getDomainClass());

        // Gathering selections from the projection class
        // `toExpressionRecursively` would be imported from QueryUtils
        Set<Selection<?>> selections = new HashSet<>();
        projectionFactory = new SpelAwareProxyProjectionFactory();
        List<PropertyDescriptor> inputProperties = projectionFactory.getProjectionInformation(projectionClass)
                                                                    .getInputProperties();
        for (PropertyDescriptor propertyDescriptor : inputProperties) {
            String property = propertyDescriptor.getName();
            PropertyPath path = PropertyPath.from(property, getDomainClass());
            selections.add(toExpressionRecursively(root, path).alias(property));
        }

        // Select, restrict and order
        tupleQuery.multiselect(new ArrayList<>(selections));

        if (spec != null) {
            tupleQuery.where(spec.toPredicate(root, tupleQuery, criteriaBuilder));
        }

        if (page.getSort() != null) {
            tupleQuery.orderBy(QueryUtils.toOrders(page.getSort(), root, criteriaBuilder));
        }

        TypedQuery<Tuple> query = entityManager.createQuery(tupleQuery);
        query.setFirstResult((int) page.getOffset());
        query.setMaxResults(page.getPageSize());
        List<Tuple> results = query.getResultList();


        // Create maps for each result tuple
        List<P> projectedResults = new ArrayList<>(results.size());
        for (Tuple tuple : results) {
            Map<String, Object> mappedResult = new HashMap<>(tuple.getElements().size());
            for (TupleElement<?> element : tuple.getElements()) {
                String name = element.getAlias();
                mappedResult.put(name, tuple.get(name));
            }

            projectedResults.add(projectionFactory.createProjection(projectionClass, mappedResult));
        }

        // Query to get total number of records
        CriteriaBuilder cntCb = entityManager.getCriteriaBuilder();
        var countQuery = cntCb.createQuery(Long.class);
        var cntRoot = countQuery.from(getDomainClass());
        countQuery.select(cntCb.count(cntRoot));

        if (spec != null)
            countQuery.where(spec.toPredicate(cntRoot, countQuery, cntCb));

        Long count = entityManager.createQuery(countQuery).getSingleResult();

        return new PageImpl<>(projectedResults, page, count);
    }

    @Override
    public void deleteAllById(Iterable<ID> ids) {
        for (ID id : ids) {
            this.deleteById(id);
        }
    }

    private Expression toExpressionRecursively(From from, PropertyPath path) {
        try {
            Method m = QueryUtils.class.getDeclaredMethod("toExpressionRecursively",
                                                          From.class,
                                                          PropertyPath.class);
            m.setAccessible(true);
            return (Expression) m.invoke(null, from, path);
        } catch (Exception ex) {
            throw new ConfigurationException(ex);
        }
    }
}
