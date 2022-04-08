package com.mintpot.carcloth.service;

import com.mintpot.carcloth.dto.admin.DashboardDto;
import com.mintpot.carcloth.dto.quote.TransactionRequest;
import com.mintpot.carcloth.entity.embeddable.FileInfo;

import java.util.Set;
import java.util.concurrent.ExecutionException;

public interface MainHomeService {

    DashboardDto dashboard();

    Set<FileInfo> requestQuote(TransactionRequest dto);

}
