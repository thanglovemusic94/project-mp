package com.mintpot.carcloth.service.impl;

import com.mintpot.carcloth.constant.TransactionStatus;
import com.mintpot.carcloth.constant.enums.ENoticeType;
import com.mintpot.carcloth.constant.enums.EQuoteStatus;
import com.mintpot.carcloth.dto.admin.DashboardDto;
import com.mintpot.carcloth.dto.quote.*;
import com.mintpot.carcloth.entity.CompanyQuote;
import com.mintpot.carcloth.entity.embeddable.FileInfo;
import com.mintpot.carcloth.entity.transaction.*;
import com.mintpot.carcloth.exception.CommonException;
import com.mintpot.carcloth.exception.ErrorCode;
import com.mintpot.carcloth.repository.CompanyQuoteRepository;
import com.mintpot.carcloth.repository.CompanyRepository;
import com.mintpot.carcloth.repository.MemberRepository;
import com.mintpot.carcloth.repository.TransactionRepository;
import com.mintpot.carcloth.security.AuthenticationFacade;
import com.mintpot.carcloth.service.MainHomeService;
import com.mintpot.carcloth.service.NoticeService;
import com.mintpot.carcloth.utils.Map;
import com.mintpot.carcloth.utils.StorageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

@Service
@RequiredArgsConstructor
@Slf4j
public class MainHomeServiceImpl implements MainHomeService {

    private static final String STORAGE_PATH = "user/%d/quote/";
    private static final String NOTICE_REQUEST_QUOTE = "견적서가 도착했습니다.";

    private final AuthenticationFacade authenticationFacade;
    private final StorageService storageService;
    private final TransactionRepository transactionRepo;
    private final MemberRepository memberRepo;
    private final CompanyRepository companyRepo;
    private final CompanyQuoteRepository companyQuoteRepo;
    private final NoticeService noticeService;
    private final ModelMapper mapper;

    @Override
    public DashboardDto dashboard() {
        ExecutorService executor = Executors.newFixedThreadPool(2);

        Future<Integer> totalMembers = executor.submit(memberRepo::totalMembers);
        String nowDay = LocalDate.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy"));
        Future<Integer> totalLogin = executor.submit(() ->
                memberRepo.totalLogin(nowDay));
        Future<Integer> totalCompare = executor.submit(() ->
                transactionRepo.totalTransactionByStatus(TransactionStatus.COMPARE));
        Future<Integer> totalReservation = executor.submit(() ->
                transactionRepo.totalTransactionByStatus(TransactionStatus.RESERVATION));
        Future<Integer> totalConfirm = executor.submit(() ->
                companyQuoteRepo.totalTransactionByStatus(EQuoteStatus.CONFIRM));
        Future<Integer> totalConstructing = executor.submit(() ->
                transactionRepo.totalTransactionByStatus(TransactionStatus.CONSTRUCTING));
        Future<Integer> totalComplete = executor.submit(() ->
                transactionRepo.totalTransactionByStatus(TransactionStatus.COMPLETE));

        DashboardDto dto = new DashboardDto();
        try {
            dto.setTotalMembers(totalMembers.get());
            dto.setNumberLogin(totalLogin.get());
            dto.setCompare(totalCompare.get());
            dto.setConfirm(totalConfirm.get());
            dto.setApply(totalReservation.get() - dto.getConfirm());
            dto.setConstructing(totalConstructing.get());
            dto.setComplete(totalComplete.get());
        } catch (Exception e) {
            log.error(e.getMessage());
        }

        return dto;
    }

    @Override
    @Transactional
    public Set<FileInfo> requestQuote(TransactionRequest dto) {
        Transaction transaction = null;
        if (dto instanceof BlackBoxDto) {
            transaction = mapper.map(dto, BlackBox.class);
        } else if (dto instanceof GlassFilmDto) {
            transaction = mapper.map(dto, GlassFilm.class);
        } else if (dto instanceof NewCarPackageDto) {
            transaction = mapper.map(dto, NewCarPackage.class);
        } else if (dto instanceof PolishDto) {
            transaction = mapper.map(dto, Polish.class);
        } else if (dto instanceof PPFDto) {
            transaction = mapper.map(dto, PPF.class);
        } else if (dto instanceof TintingDto) {
            transaction = mapper.map(dto, Tinting.class);
        } else if (dto instanceof WindshieldDto) {
            transaction = mapper.map(dto, Windshield.class);
        } else if (dto instanceof WrappingDto) {
            transaction = mapper.map(dto, Wrapping.class);
        }

        //User request
        var userDetail = authenticationFacade.getAuthentication();
        var user = memberRepo.findById(userDetail.getUserId())
                .orElseThrow(() -> new CommonException(ErrorCode.USER_NOT_FOUND));

        transaction.setRequester(user);

        //Generate presigned url for client
        var files = dto.getAttachImages();
        var attachImages = new HashSet<FileInfo>();
        final String path = String.format(STORAGE_PATH, user.getId());
        for (var f : files) {
            final String objectKey = path + System.currentTimeMillis() + "_" + f.getFileName();
            f.setObjectKey(storageService.getPresignedUrl(objectKey, true).toString());
            attachImages.add(new FileInfo(f.getFileName(), objectKey));
        }

        transaction.setAttachImages(attachImages);
        transaction.setStatus(TransactionStatus.COMPARE);

        Transaction finalTransaction = transactionRepo.save(transaction);

        //Create request quote to company in 2km radius
        var companies = companyRepo.getCompaniesSendRequest();
        double lat = transaction.getAddress().getLat();
        double lon = transaction.getAddress().getLon();

        if(companies != null && !companies.isEmpty()) {
            for (var i = 0; i < companies.size(); i ++) {
                var c = companies.get(i);
                var cUser = c.getRequestUser();
                double distance = Map.distance(lat, c.getAddress().getLat(), lon, c.getAddress().getLon());
                if(distance <= 25 && cUser.getId() != user.getId()) {
                    var companyQuote = CompanyQuote.builder()
                            .company(c)
                            .status(EQuoteStatus.REQUESTED)
                            .deleteFlg(false)
                            .transaction(finalTransaction)
                            .confirmed(false)
                            .build();

                    companyQuote = companyQuoteRepo.save(companyQuote);
                    //Push a notice to company
                    if(cUser.getNoticeSetting().isQuoteNotice()) {
                        noticeService.createNotice(ENoticeType.REQUESTED_QUOTE,
                                cUser,NOTICE_REQUEST_QUOTE, companyQuote.getId());
                    }
                }
            }
        }

        return files;
    }
}
