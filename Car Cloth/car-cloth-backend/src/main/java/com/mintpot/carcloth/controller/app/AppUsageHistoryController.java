package com.mintpot.carcloth.controller.app;

import com.mintpot.carcloth.dto.CancelReservationReq;
import com.mintpot.carcloth.dto.quote.*;
import com.mintpot.carcloth.service.TransactionService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/app/usage-history")
@Api(tags = {"Usage History"})
@RequiredArgsConstructor
public class AppUsageHistoryController {

    private final TransactionService transactionService;

    @GetMapping("/transaction")
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "api for app to get all transactions")
    public Page<TransactionList> getAllTransactions(Pageable pageable) {

        return transactionService.getAllByCurrentUser(pageable);
    }

    @GetMapping("/transaction/{id}")
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "api for app get transaction detail by id")
    public TransactionRequest getTransactionDetail(@PathVariable long id) {

        return transactionService.getTransactionDetail(id);
    }

    @GetMapping("/transaction/{id}/quotations")
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "api for app get quotation list have status > delivery by transaction id")
    public QuotationList getQuotationList(@PathVariable long id) {

        return transactionService.getQuotations(id);
    }

    @GetMapping("/quotation/{id}")
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "api for app get quotation detail by quote id")
    public CompanyQuoteDetail getQuotationDetail(@PathVariable long id) {

        return transactionService.getQuotationDetail(id);
    }

    @GetMapping("/quotation/{quoteId}/check-apply")
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "api for app to check allowed apply reservation")
    public boolean checkApplyReservation(@PathVariable long quoteId) {

        return transactionService.checkAllowedApplyReservation(quoteId);
    }

    @PutMapping("/quotation/{quoteId}/apply")
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "api for app to apply reservation by company quote id")
    public void applyReservation(@PathVariable long quoteId,
                                 @RequestParam @DateTimeFormat(pattern = "yyyy.MM.dd HH:mm")
                                         LocalDateTime reservationDate) {

        transactionService.applyReservation(quoteId, reservationDate);
    }

    @PutMapping("/quotation/{quoteId}/cancel")
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "api for app to cancel reservation by company quote id")
    public void cancelReservation(@PathVariable long quoteId,
                                  @Valid @RequestBody CancelReservationReq reason) {

        transactionService.cancelReservation(quoteId, reason.getReason());
    }

    @DeleteMapping("/quotation/{quoteId}/delete")
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "api for app to delete a cancel reservation by company quote id")
    public void deleteReservation(@PathVariable long quoteId) {

        transactionService.deleteReservation(quoteId);
    }

    @GetMapping("/quotation/{quoteId}/reservation-history")
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "api for app to get info reservation history")
    public ReservationHistory reservationHistory(@PathVariable long quoteId) {

        return transactionService.reservationHistory(quoteId);
    }
}