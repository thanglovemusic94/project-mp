package com.mintpot.carcloth.service.impl;

import com.mintpot.carcloth.constant.Constants;
import com.mintpot.carcloth.constant.TransactionStatus;
import com.mintpot.carcloth.constant.enums.ENoticeType;
import com.mintpot.carcloth.constant.enums.EQuoteStatus;
import com.mintpot.carcloth.dto.company.*;
import com.mintpot.carcloth.dto.enums.EQuoteAction;
import com.mintpot.carcloth.dto.enums.EQuoteStatusFilter;
import com.mintpot.carcloth.dto.quote.*;
import com.mintpot.carcloth.entity.transaction.*;
import com.mintpot.carcloth.exception.CommonException;
import com.mintpot.carcloth.exception.ErrorCode;
import com.mintpot.carcloth.repository.CompanyGroupRepository;
import com.mintpot.carcloth.repository.CompanyQuoteRepository;
import com.mintpot.carcloth.repository.MemberRepository;
import com.mintpot.carcloth.repository.TransactionRepository;
import com.mintpot.carcloth.service.CompanyService;
import com.mintpot.carcloth.service.NoticeService;
import com.mintpot.carcloth.service.QuoteService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class QuoteServiceImpl implements QuoteService {

    private static final String NOTICE_DELIVER_QUOTE = "견적서가 도착했습니다.";
    private static final String NOTICE_CANCEL_QUOTE = "시공점이 예약을 취소 하였습니다.";
    private static final String NOTICE_CONFIRM_QUOTE = "예약이 확정되었습니다.";

    private final CompanyService companyService;
    private final CompanyQuoteRepository companyQuoteRepo;
    private final TransactionRepository transactionRepo;
    private final CompanyGroupRepository companyGroupRepo;
    private final MemberRepository memberRepo;
    private final NoticeService noticeService;
    private final ModelMapper mapper;

    @Override
    public Page<QuoteList> getAllQuotesByStatus(EQuoteStatusFilter statusFilter, Pageable pageable) {
        var company = companyService.getCurrentCompany();

        if(statusFilter != EQuoteStatusFilter.RESERVATION) {
            return companyQuoteRepo.getQuotesByCompanyAndStatus(company.getId(),
                    statusFilter.getCode(), pageable);
        } else {
            return companyQuoteRepo.getQuoteReservation(company.getId(), pageable);
        }
    }

    @Override
    public List<Long> getAllQuotesByTransactionId(long id) {
        var transaction = transactionRepo.findById(id)
                .orElseThrow(() -> new CommonException(ErrorCode.TRANSACTION_NOT_FOUND));

        List<Long> rs = null;
        if(transaction.getQuotation() != null) {
            rs = transaction.getQuotation().stream().map(q -> q.getId()).collect(Collectors.toList());
        }

        return rs;
    }

    @Override
    @Transactional
    public TransactionRequest quoteRequestDetail(long companyQuoteId) {
        var companyQuote = companyQuoteRepo.findById(companyQuoteId)
                .orElseThrow(() -> new CommonException(ErrorCode.QUOTATION_NOT_FOUND));

        //confirmed request when view detail
        var confirmed = companyQuote.isConfirmed();
        if(!confirmed) {
            companyQuote.setConfirmed(true);
            companyQuote = companyQuoteRepo.save(companyQuote);
        }

        var transaction = companyQuote.getTransaction();

        if(transaction instanceof BlackBox) {
            return mapper.map(transaction, BlackBoxDto.class);
        } else if(transaction instanceof GlassFilm) {
            return mapper.map(transaction, GlassFilmDto.class);
        } else if(transaction instanceof NewCarPackage) {
            return mapper.map(transaction, NewCarPackageDto.class);
        } else if(transaction instanceof Polish) {
            return mapper.map(transaction, PolishDto.class);
        } else if(transaction instanceof PPF) {
            return mapper.map(transaction, PPFDto.class);
        } else if(transaction instanceof Tinting) {
            return mapper.map(transaction, TintingDto.class);
        } else if(transaction instanceof Windshield) {
            return mapper.map(transaction, WindshieldDto.class);
        } else if(transaction instanceof Wrapping ) {
            return mapper.map(transaction, WrappingDto.class);
        } else {
            return mapper.map(transaction, TransactionRequest.class);
        }
    }

    @Override
    @Transactional
    public void deliver(CompanyQuoteRegistration dto) {
        var currentCompany = companyService.getCurrentCompany();

        var member = currentCompany.getRequestUser();

        var companyGroup = member.getGroup();
        if(companyGroup == null) {
            companyGroup = companyGroupRepo.findByName(Constants.GENERAL_GROUP)
                    .orElseThrow(() -> new CommonException(ErrorCode.COMPANY_GROUP_NOT_FOUND_GG));
        }

        //check have enough point
        long point = member.getPoint() - companyGroup.getDeliveryCost();
        if(point < 0) {
            throw new CommonException(ErrorCode.COMPANY_NOT_ENOUGH_POINT);
        }

        var companyQuote = companyQuoteRepo.findById(dto.getId())
                .orElseThrow(() -> new CommonException(ErrorCode.QUOTATION_NOT_FOUND));

        //Check the status to see if the quote is delivered
        if(companyQuote.getStatus() != EQuoteStatus.REQUESTED) {
            throw new CommonException(ErrorCode.QUOTATION_DELIVERED);
        }

        //check permission current user
        var company =  companyQuote.getCompany();
        if(company.getId() != currentCompany.getId()) {
            throw new CommonException(ErrorCode.NO_PERMISSION);
        }

        companyQuote.setStatus(EQuoteStatus.DELIVERED);
        companyQuote.setNotes(dto.getNotes());
        companyQuote.setEstConstructionPeriod(dto.getEstConstructionPeriod());
        companyQuote.setConstructionFee(dto.getConstructionFee());
        companyQuote.setPaymentAmount(dto.getPaymentAmount());

        companyQuoteRepo.save(companyQuote);

        //deduction point for deliver quote fee
        member.setPoint(point);
        memberRepo.save(member);

        //Push a notice to requester
        var companyUser = companyQuote.getTransaction().getRequester();
        if(companyUser.getNoticeSetting().isQuoteNotice()) {
            noticeService.createNotice(ENoticeType.DELIVERED_QUOTE,
                    companyUser, NOTICE_DELIVER_QUOTE, companyQuote.getId());
        }
    }

    @Override
    public CompanyQuoteRegistration deliveredQuote(long id) {
        var currentCompany = companyService.getCurrentCompany();

        var companyQuote = companyQuoteRepo.findById(id)
                .orElseThrow(() -> new CommonException(ErrorCode.QUOTATION_NOT_FOUND));

        var company =  companyQuote.getCompany();
        if(company.getId() != currentCompany.getId()) {
            throw new CommonException(ErrorCode.NO_PERMISSION);
        }

        return mapper.map(companyQuote, CompanyQuoteRegistration.class);
    }

    @Override
    @Transactional
    public void changeStatus(long id, QuoteActionReq req) {
        var currentCompany = companyService.getCurrentCompany();

        var companyQuote = companyQuoteRepo.findById(id)
                .orElseThrow(() -> new CommonException(ErrorCode.QUOTATION_NOT_FOUND));

        var transaction = companyQuote.getTransaction();

        var company =  companyQuote.getCompany();
        if(company.getId() != currentCompany.getId()) {
            throw new CommonException(ErrorCode.NO_PERMISSION);
        }

        var action = req.getAction();
        if (action == EQuoteAction.CONFIRM){
            if(companyQuote.getStatus() != EQuoteStatus.APPLY){
                throw new CommonException(ErrorCode.ACTION_INVALID);
            } else {
                companyQuote.setStatus(EQuoteStatus.CONFIRM);
                //Push a notice to requester
                var companyUser = transaction.getRequester();
                if(companyUser.getNoticeSetting().isQuoteNotice()) {
                    noticeService.createNotice(ENoticeType.CONFIRMED_RESERVATION,
                            companyUser, NOTICE_CONFIRM_QUOTE, companyQuote.getId());
                }
            }
        }

        if (action == EQuoteAction.CONSTRUCTING){
            if(companyQuote.getStatus() != EQuoteStatus.CONFIRM){
                throw new CommonException(ErrorCode.ACTION_INVALID);
            } else {
                companyQuote.setStatus(EQuoteStatus.CONSTRUCTING);
                transaction.setStatus(TransactionStatus.CONSTRUCTING);
            }
        }

        if (action == EQuoteAction.CANCEL){
            if(!(companyQuote.getStatus() == EQuoteStatus.APPLY ||
                    companyQuote.getStatus() == EQuoteStatus.CONFIRM )){
                throw new CommonException(ErrorCode.ACTION_INVALID);
            } else {
                companyQuote.setStatus(EQuoteStatus.CANCEL);
                companyQuote.setReason(req.getReason());
                transaction.setStatus(TransactionStatus.COMPARE);
                transaction.setReservationDate(null);
                //Push a notice to requester
                var companyUser = transaction.getRequester();
                if(companyUser.getNoticeSetting().isQuoteNotice()) {
                    noticeService.createNotice(ENoticeType.CANCELED_RESERVATION,
                            transaction.getRequester(), NOTICE_CANCEL_QUOTE, companyQuote.getId());
                }
            }
        }

        if (action == EQuoteAction.COMPLETE){
            if(companyQuote.getStatus() != EQuoteStatus.CONSTRUCTING){
                throw new CommonException(ErrorCode.ACTION_INVALID);
            } else {
                LocalDateTime timeNow = LocalDateTime.now();
                companyQuote.setStatus(EQuoteStatus.COMPLETE);
                companyQuote.setCompleteDate(timeNow);

                transaction.setStatus(TransactionStatus.COMPLETE);
                transaction.setCompleteDate(timeNow);
            }
        }

        if(action == EQuoteAction.DELETE){
            if(companyQuote.getStatus() != EQuoteStatus.CANCEL) {
                throw new CommonException(ErrorCode.ACTION_INVALID);
            } else {
                companyQuote.setDeleteFlg(true);
            }
        }

        companyQuoteRepo.save(companyQuote);
    }

    @Override
    public TotalSalesDto getTotalSales(LocalDate start, LocalDate end) {
        var company = companyService.getCurrentCompany();

        LocalDateTime startTime = LocalDateTime.of(start, LocalTime.of(0,0,0));
        LocalDateTime endTime = LocalDateTime.of(end, LocalTime.of(23,59,59));

        var amounts = companyQuoteRepo.paymentAmountsByCompany(company.getId(), startTime, endTime);
        BigDecimal totalAmount = amounts.stream()
                .map(a -> BigDecimal.valueOf(a))
                .reduce(BigDecimal.valueOf(0), BigDecimal::add);;

        return new TotalSalesDto(totalAmount);
    }

    @Override
    public Page<SalesInfo> getSalesInfo(LocalDate start, LocalDate end, Pageable pageable) {
        var company = companyService.getCurrentCompany();

        LocalDateTime startTime = LocalDateTime.of(start, LocalTime.of(0,0,0));
        LocalDateTime endTime = LocalDateTime.of(end, LocalTime.of(23,59,59));

        var rs = companyQuoteRepo.getSalesInfo(company.getId(), startTime, endTime, pageable);

        return rs;
    }

    @Override
    public QuoteIdsByStatus getQuotesByStatus() {
        var currentUser = companyService.getCurrentCompany();

        ExecutorService executor = Executors.newFixedThreadPool(2);

        Future<List<Long>> requestQuotes = executor.submit(() -> companyQuoteRepo.findByCompanyAndStatus(currentUser.getId(), EQuoteStatus.Constant.REQUESTED));
        Future<List<Long>> deliverQuotes = executor.submit(() -> companyQuoteRepo.findByCompanyAndStatus(currentUser.getId(), EQuoteStatus.Constant.DELIVERED));
        Future<List<Long>> reservationAndConstructingQuotes = executor.submit(() -> companyQuoteRepo.findQuoteReservationByCompany(currentUser.getId()));

        var rs = new QuoteIdsByStatus();
        try {
            rs.setRequestQuotes(requestQuotes.get());
            rs.setDeliverQuotes(deliverQuotes.get());
            rs.setReservationAndConstructionQuotes(reservationAndConstructingQuotes.get());
        } catch (Exception e) {
            log.error(e.getMessage());
        }

        return rs;
    }

    @Override
    public void confirmRequest(long id) {
        var companyQuote = companyQuoteRepo.findById(id)
                .orElseThrow(() -> new CommonException(ErrorCode.QUOTATION_NOT_FOUND));

        companyQuote.setConfirmed(true);
        companyQuoteRepo.save(companyQuote);
    }
}
