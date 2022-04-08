package com.mintpot.readingm.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.io.Serializable;

@NoRepositoryBean
public interface ExtendedRepository<T, ID extends Serializable> extends JpaRepository<T, ID> {

    <P> Page<P> find(Specification<T> spec, Pageable pageable, Class<P> projectionClass);

    void deleteAllById(Iterable<ID> ids);
}
