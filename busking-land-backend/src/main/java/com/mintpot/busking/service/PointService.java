package com.mintpot.busking.service;

import com.mintpot.busking.api.apple.inapp.VerifyReceiptReq;
import com.mintpot.busking.api.google_inapp.dto.GoogleReceipt;
import com.mintpot.busking.dto.BankWithdrawSettlementInfoDto;
import com.mintpot.busking.dto.PageResponse;
import com.mintpot.busking.dto.SliceDto;
import com.mintpot.busking.dto.api.WithdrawRequestInfoDto;
import com.mintpot.busking.dto.web.response.PointHistoryResponseDTO;
import com.mintpot.busking.model.PointChargeType;
import com.mintpot.busking.model.PointHistory;
import com.mintpot.busking.model.constant.Period;
import com.mintpot.busking.model.constant.PointTransactionType;
import org.springframework.data.domain.Pageable;
import org.springframework.lang.Nullable;

import java.time.LocalDateTime;
import java.util.List;

public interface PointService {
    SliceDto<PointHistory> getByTypeAndPeriod(int userId, PointTransactionType type, Period period, Pageable page);

    Iterable<PointChargeType> getPointChargeTypeList();

    /**
     * Do transaction to add or deduct points of a user.
     *
     * @param pointAmount Amount of point in the transaction.
     * @param transType   Transaction type.
     * @param userId      ID of the user will receive point addition or deduction.
     * @param transactionId TransactionID taken from receipt, may be null if  it's an internal transaction.
     */
    Long doTransaction(int pointAmount, PointTransactionType transType, int userId, @Nullable String transactionId);

    void chargePointsIOS(VerifyReceiptReq receiptData);

    void chargePointsAndroid(GoogleReceipt googleReceipt);

    void withdrawRequest (WithdrawRequestInfoDto drawRequest);

    void withdrawAccept (int pointHistory);

    void withdrawReject (int pointHistory);

    List<BankWithdrawSettlementInfoDto> getSettlementNeedConfirm ();

    PageResponse<PointHistoryResponseDTO> findAll(String name, List<String> pointType ,Pageable pageable);

    PointHistoryResponseDTO findByID(Long id);
}
