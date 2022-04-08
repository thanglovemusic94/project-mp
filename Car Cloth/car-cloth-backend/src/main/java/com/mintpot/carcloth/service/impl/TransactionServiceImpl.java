package com.mintpot.carcloth.service.impl;

import com.mintpot.carcloth.constant.TransactionStatus;
import com.mintpot.carcloth.constant.enums.ENoticeType;
import com.mintpot.carcloth.constant.enums.EQuoteStatus;
import com.mintpot.carcloth.dto.quote.*;
import com.mintpot.carcloth.entity.CompanyQuote;
import com.mintpot.carcloth.entity.transaction.*;
import com.mintpot.carcloth.exception.CommonException;
import com.mintpot.carcloth.exception.ErrorCode;
import com.mintpot.carcloth.repository.CompanyQuoteRepository;
import com.mintpot.carcloth.repository.TransactionRepository;
import com.mintpot.carcloth.security.AuthenticationFacade;
import com.mintpot.carcloth.service.NoticeService;
import com.mintpot.carcloth.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {
    //TODO: add link to detail quote
    private static final String NOTICE_APPLY = "고객님이 예약 신청을 하였습니다.";
    private static final String NOTICE_CANCEL = "고객님이 예약을 취소 하였습니다.";

    private final TransactionRepository transactionRepo;
    private final CompanyQuoteRepository companyQuoteRepo;
    private final AuthenticationFacade authenticationFacade;
    private final NoticeService noticeService;
    private final ModelMapper mapper;

    @Override
    public String getConstructionType(Transaction transaction) {
        return transaction.getClass().getSimpleName();
    }

    @Override
    public List<String> getConstructionPart(Transaction transaction) throws IllegalAccessException {
        var clazz = transaction.getClass();
        var carTypeList = new ArrayList<String>();

        for (var field : clazz.getDeclaredFields()) {
            if (field.getGenericType().getTypeName().equals("boolean")) {
                field.setAccessible(true);
                if ((boolean) field.get(transaction)) {
                    carTypeList.add(field.getName());
                }
            }
        }
        return carTypeList;
    }

    @Override
    public Page<TransactionList> getAllByCurrentUser(Pageable pageable) {

        long userId = authenticationFacade.getAuthentication().getUserId();

        return transactionRepo.getAllByMember(userId, pageable);
    }

    @Override
    public TransactionRequest getTransactionDetail(long id) {

        var transaction = transactionRepo.findById(id)
                .orElseThrow(() -> new CommonException(ErrorCode.TRANSACTION_NOT_FOUND));

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
    public QuotationList getQuotations(long id) {

        var transaction = transactionRepo.findById(id)
                .orElseThrow(() -> new CommonException(ErrorCode.TRANSACTION_NOT_FOUND));

        var quotes = companyQuoteRepo.findByTransaction_IdAndDeleteFlg(id, false);

        return new QuotationList(transaction.getStatus().getCode(), quotes);
    }

    @Override
    public CompanyQuoteDetail getQuotationDetail(long id) {

        return companyQuoteRepo.getQuotationDetailById(id);
    }

    @Override
    public boolean isPermission(long transactionId) {
        long userId = authenticationFacade.getAuthentication().getUserId();

        var check = transactionRepo.getByIdAndRequestedUser(transactionId, userId);
        if(check.isPresent()) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    @Transactional
    public void applyReservation(long quoteId, LocalDateTime reservationDate) {

        var companyQuote = companyQuoteRepo.findById(quoteId)
                .orElseThrow(() -> new CommonException(ErrorCode.QUOTATION_NOT_FOUND));

        var transaction = companyQuote.getTransaction();

        //check transaction exist reservation or constructing or complete
        TransactionStatus status = transaction.getStatus();
        if(!isAllowedApplyReservation(transaction.getQuotation()) ||
                status != TransactionStatus.COMPARE) {
            throw new CommonException(ErrorCode.ACTION_INVALID);
        }

        //check permission current user
        if(!isPermission(transaction.getId())) {
            throw new CommonException(ErrorCode.NO_PERMISSION);
        }

        companyQuote.setReservationDate(reservationDate);
        transaction.setReservationDate(reservationDate);
        companyQuote.setStatus(EQuoteStatus.APPLY);
        transaction.setStatus(TransactionStatus.RESERVATION);

        companyQuoteRepo.save(companyQuote);

        //Push notice to company
        var companyUser = companyQuote.getCompany().getRequestUser();
        if(companyUser.getNoticeSetting().isQuoteNotice()) {
            noticeService.createNotice(ENoticeType.APPLIED_RESERVATION,
                    companyUser, NOTICE_APPLY, companyQuote.getId());
        }
    }

    @Override
    @Transactional
    public void cancelReservation(long quoteId, String reason) {
        var companyQuote = companyQuoteRepo.findById(quoteId)
                .orElseThrow(() -> new CommonException(ErrorCode.QUOTATION_NOT_FOUND));

        //check status of quote just has apply or confirm
        if(!(companyQuote.getStatus() == EQuoteStatus.APPLY ||
                companyQuote.getStatus() == EQuoteStatus.CONFIRM)) {
            throw new CommonException(ErrorCode.ACTION_INVALID);
        }

        var transaction = companyQuote.getTransaction();

        //check permission current user
        if(!isPermission(transaction.getId())) {
            throw new CommonException(ErrorCode.NO_PERMISSION);
        }

        //Reset transaction to compare
        transaction.setStatus(TransactionStatus.COMPARE);
        transaction.setReservationDate(null);
        //Change quote
        companyQuote.setStatus(EQuoteStatus.CANCEL);
        companyQuote.setReason(reason);

        companyQuoteRepo.save(companyQuote);

        //Push notice to company
        var companyUser = companyQuote.getCompany().getRequestUser();
        if(companyUser.getNoticeSetting().isQuoteNotice()) {
            noticeService.createNotice(ENoticeType.CANCELED_RESERVATION,
                    companyUser, NOTICE_CANCEL, companyQuote.getId());
        }
    }

    @Override
    public void deleteReservation(long quoteId) {
        var companyQuote = companyQuoteRepo.findById(quoteId)
                .orElseThrow(() -> new CommonException(ErrorCode.QUOTATION_NOT_FOUND));

        //check status of quote just has cancel
        if(companyQuote.getStatus() != EQuoteStatus.CANCEL) {
            throw new CommonException(ErrorCode.ACTION_INVALID);
        }

        var transaction = companyQuote.getTransaction();

        //check permission current user
        if(!isPermission(transaction.getId())) {
            throw new CommonException(ErrorCode.NO_PERMISSION);
        }

        companyQuoteRepo.delete(quoteId);
    }

    @Override
    public boolean checkAllowedApplyReservation(long quoteId) {
        var companyQuote = companyQuoteRepo.findById(quoteId)
                .orElseThrow(() -> new CommonException(ErrorCode.QUOTATION_NOT_FOUND));

        var transaction = companyQuote.getTransaction();

        return isAllowedApplyReservation(transaction.getQuotation()) &&
                transaction.getStatus() == TransactionStatus.COMPARE;
    }

    @Override
    public ReservationHistory reservationHistory(long quoteId) {
        var companyQuote = companyQuoteRepo.findById(quoteId)
                .orElseThrow(() -> new CommonException(ErrorCode.QUOTATION_NOT_FOUND));

        return mapper.map(companyQuote, ReservationHistory.class);
    }

    private boolean isAllowedApplyReservation(Set<CompanyQuote> quotes) {
        if(quotes == null) return true;

        for (var q : quotes) {
            if(q.getStatus() == EQuoteStatus.APPLY ||
                    q.getStatus() == EQuoteStatus.CONFIRM ||
                    q.getStatus() == EQuoteStatus.CONSTRUCTING ||
                    q.getStatus() == EQuoteStatus.COMPLETE) {
                return false;
            }
        }

        return true;
    }
}
