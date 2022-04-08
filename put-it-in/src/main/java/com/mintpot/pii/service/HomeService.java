package com.mintpot.pii.service;

import com.mintpot.pii.entity.Branch;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

/* @author LinhNC */
public interface HomeService {
    public abstract Slice<Branch> searchOrderByPrice(String term, boolean ascending, Pageable cPage);

    Slice<Branch> searchOrderByDistance(String loc, String term, boolean ascending, PageRequest nPage);
}
