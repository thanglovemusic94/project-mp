package com.mintpot.busking.utils.search;

import com.mintpot.busking.model.BankWithdraw;
import com.mintpot.busking.model.PointHistory;
import org.springframework.stereotype.Component;

/**
 * @author Admin
 * @date 2021-02-22 16:16 PM
 */
@Component
public class BankWithdrawSpecification extends AbstractSpecification<BankWithdraw>{
    public BankWithdrawSpecification() {
    }

    public BankWithdrawSpecification(SearchCriteria criteria) {
        super(criteria);
    }
}
