package com.mintpot.busking.service;

import com.mintpot.busking.dto.BankWithdrawSettlementInfoDto;
import com.mintpot.busking.dto.PageResponse;
import com.mintpot.busking.dto.web.response.BankWithdrawSettlementDTO;
import com.mintpot.busking.dto.web.response.Busker_BankWithDrawDTO;
import com.mintpot.busking.model.constant.PointTransactionType;
import org.springframework.data.domain.Pageable;

import java.util.Date;
import java.util.List;

/**
 * @author Admin
 * @date 2021-02-22 16:13 PM
 */
public interface BankWithDrawService {

    PageResponse<BankWithdrawSettlementDTO> findAll(String name, PointTransactionType pointType , Date start, Date end, Pageable pageable);

    PageResponse<Busker_BankWithDrawDTO> findAllBrankByBusker(Integer user_id, Pageable pageable);

    BankWithdrawSettlementDTO findById(Long id);
}
