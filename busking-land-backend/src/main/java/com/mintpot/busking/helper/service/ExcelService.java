package com.mintpot.busking.helper.service;


import com.mintpot.busking.helper.ExcelHelper;
import com.mintpot.busking.model.BankWithdraw;
import com.mintpot.busking.repository.BankWithdrawRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.util.List;

@Service
public class ExcelService {
    @Autowired
    BankWithdrawRepository repository;

    public ByteArrayInputStream load() {
        List<BankWithdraw> withdraws = repository.findAllCompletedWithdraw();

        ByteArrayInputStream in = ExcelHelper.withdrawsToExcel(withdraws);
        return in;
    }
}
