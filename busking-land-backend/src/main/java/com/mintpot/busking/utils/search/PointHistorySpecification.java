package com.mintpot.busking.utils.search;

import com.mintpot.busking.model.PointHistory;
import org.springframework.stereotype.Component;

/**
 * @author Admin
 * @date 2021-02-17 15:51 PM
 */
@Component
public class PointHistorySpecification extends AbstractSpecification<PointHistory>{
    public PointHistorySpecification() {
    }

    public PointHistorySpecification(SearchCriteria criteria) {
        super(criteria);
    }
}