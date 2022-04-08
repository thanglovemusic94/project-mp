package com.mintpot.carcloth.controller.app;

import com.mintpot.carcloth.dto.company.QuoteIdsByStatus;
import com.mintpot.carcloth.dto.company.CompanyQuoteRegistration;
import com.mintpot.carcloth.dto.company.QuoteActionReq;
import com.mintpot.carcloth.dto.company.QuoteList;
import com.mintpot.carcloth.dto.enums.EQuoteStatusFilter;
import com.mintpot.carcloth.dto.quote.TransactionRequest;
import com.mintpot.carcloth.repository.TransactionRepository;
import com.mintpot.carcloth.service.QuoteService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/app/quote")
@Api(tags = {"Quotation"})
@RequiredArgsConstructor
public class AppQuoteController {

    private final QuoteService quoteService;
    private final TransactionRepository transactionRepo;

    @GetMapping("/check-new-notice")
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "api for app quote ids by status")
    public QuoteIdsByStatus getQuotesByStatus() {

        return quoteService.getQuotesByStatus();
    }

    @PutMapping("/confirm-request/{id}")
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "api for app confirm new request quote")
    public void confirmRequest(@PathVariable long id) {

        quoteService.confirmRequest(id);
    }

    @GetMapping("/get-all")
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "api for app to get all quotes by status")
    public Page<QuoteList> getAllQuotesByStatus(@RequestParam EQuoteStatusFilter statusFilter,
                                                Pageable pageable) {

        return quoteService.getAllQuotesByStatus(statusFilter, pageable);
    }

    @GetMapping("/by-transaction/{id}")
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "api for app to get all quote ids by transaction id")
    public List<Long> getAllQuotesByTransactionId(@PathVariable long id) {

        return quoteService.getAllQuotesByTransactionId(id);
    }

    @GetMapping("/{id}/request")
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "api for app to get request quote detail")
    public TransactionRequest quoteRequestDetail(@PathVariable long id) {

        return quoteService.quoteRequestDetail(id);
    }

    @PostMapping("/deliver")
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "api for app to company deliver a quote")
    public void deliver(@Valid @RequestBody CompanyQuoteRegistration dto) {

        quoteService.deliver(dto);
    }

    @GetMapping("/{id}/delivered")
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "api for app to company get delivered quote info")
    public CompanyQuoteRegistration deliveredQuote(@PathVariable long id) {

        return quoteService.deliveredQuote(id);
    }

    @PutMapping("/{id}/process")
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "api for app to company change status of quote")
    public void process(@PathVariable long id, @Valid @RequestBody QuoteActionReq req) {

        quoteService.changeStatus(id, req);
    }
}
