package com.mintpot.busking.service.impl;

import com.mintpot.busking.api.apple.inapp.AppStoreService;
import com.mintpot.busking.api.apple.inapp.VerifyReceiptReq;
import com.mintpot.busking.api.google_inapp.GoogleInAppClient;
import com.mintpot.busking.api.google_inapp.dto.GoogleReceipt;
import com.mintpot.busking.dto.BankWithdrawSettlementInfoDto;
import com.mintpot.busking.dto.PageResponse;
import com.mintpot.busking.dto.SliceDto;
import com.mintpot.busking.dto.api.BankWithdrawInfoDto;
import com.mintpot.busking.dto.api.WithdrawRequestInfoDto;
import com.mintpot.busking.dto.web.response.PointHistoryResponseDTO;
import com.mintpot.busking.exception.BusinessException;
import com.mintpot.busking.exception.constant.ErrorCode;
import com.mintpot.busking.facade.AuthenticationFacade;
import com.mintpot.busking.model.*;
import com.mintpot.busking.model.constant.Period;
import com.mintpot.busking.model.constant.PointTransactionType;
import com.mintpot.busking.model.constant.Status;
import com.mintpot.busking.repository.BankWithdrawRepository;
import com.mintpot.busking.repository.PointChargeTypeRepository;
import com.mintpot.busking.repository.PointHistoryRepository;
import com.mintpot.busking.repository.UserRepository;
import com.mintpot.busking.service.PointService;
import com.mintpot.busking.utils.search.BuskingSpecification;
import com.mintpot.busking.utils.search.PointHistorySpecification;
import com.mintpot.busking.utils.search.SearchCriteria;
import com.mintpot.busking.utils.search.SearchOperation;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Predicate;
import javax.swing.text.html.Option;
import java.math.BigInteger;
import java.util.*;
import java.util.function.Function;


@Service
@Log4j2
public class PointServiceImpl implements PointService {

    private final PointHistoryRepository pHistoryRepo;

    private final PointChargeTypeRepository pChargeTypeRepo;

    private final AppStoreService appStoreService;

    private final GoogleInAppClient googleInAppClient;

    private final AuthenticationFacade authFacade;

    private final UserRepository userRepository;

    private final BankWithdrawRepository bankWithdrawRepository;

    private final ModelMapper modelMapper;

    @Autowired
    private PointHistorySpecification spec;

    public PointServiceImpl(PointHistoryRepository pHistoryRepo, PointChargeTypeRepository pChargeTypeRepo, AppStoreService appStoreService, GoogleInAppClient googleInAppClient, AuthenticationFacade authFacade, UserRepository userRepository, BankWithdrawRepository bankWithdrawRepository, ModelMapper modelMapper) {
        this.pHistoryRepo = pHistoryRepo;
        this.pChargeTypeRepo = pChargeTypeRepo;
        this.appStoreService = appStoreService;
        this.googleInAppClient = googleInAppClient;
        this.authFacade = authFacade;
        this.userRepository = userRepository;
        this.bankWithdrawRepository = bankWithdrawRepository;
        this.modelMapper = modelMapper;
    }


    @Override
    public SliceDto<PointHistory> getByTypeAndPeriod(int userId, PointTransactionType type, Period period, Pageable page) {
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.MONTH, -period.getValue());
        log.debug("Getting point history from {}", cal.getTime().toString());
        Slice<PointHistory> sEnt = pHistoryRepo.findPersonalByTypeAndDate(userId, type, cal.getTime(), page);

        if(type == PointTransactionType.USE) {
            List<PointTransactionType> types = new ArrayList<>();
            types.add(type);
            types.add(PointTransactionType.USE);
            types.add(PointTransactionType.WITHDRAW_REQUEST);
            sEnt = pHistoryRepo.findPersonalByTypesAndDate(userId, types, cal.getTime(), page);
        }


        SliceDto<PointHistory> res = SliceDto.of(sEnt.getContent(), sEnt.hasNext());

        if (res != SliceDto.EMPTY) {
            log.debug("Getting accumulated point from search categories and current amount of points of userId {}", userId);
            List<BigInteger> pointRes = pHistoryRepo.getAccumulatedAndTotalPoints(userId, type,
                    cal.getTime());
            var additionalInfo = new HashMap<String, BigInteger>();
            additionalInfo.put("accumulatedPoint", pointRes.get(0));
            additionalInfo.put("totalAmount", pointRes.get(1));
            res.setAdditionalInfo(additionalInfo);
        }


        return res;
    }

    @Override
    public Iterable<PointChargeType> getPointChargeTypeList() {
        return pChargeTypeRepo.findAll();
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = RuntimeException.class)
    public Long doTransaction(int pointAmount, PointTransactionType transType, int userId, String transactionId) {
        var user = userRepository.findById(userId).orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_EXIST));
        log.info("Got companion details with Id: {}", userId);

        if (!StringUtils.isEmpty(transactionId) && pHistoryRepo.existsByTransactionId(transactionId)) {
            throw new BusinessException(ErrorCode.PAYMENT_TRANSACTION_EXIST);
        }

        if (transType.isDeductTransaction() && user.getPointAmount() < pointAmount) {
            log.info("Transaction type is deduction and the user does not have enough points");
            throw new BusinessException(ErrorCode.PAYMENT_NOT_ENOUGH_POINTS);
        }

        log.info("Points before transaction of userId {} is: {}", userId, user.getPointAmount());
        if (!transType.isIgnoreTransaction()) {
            if (transType.isDeductTransaction()) {
                user.setPointAmount(user.getPointAmount() - Math.abs(pointAmount));
            } else {
                user.setPointAmount(user.getPointAmount() + Math.abs(pointAmount));
            }

            log.info("Points after transaction is: {}", user.getPointAmount());
            user = userRepository.save(user);
            log.info("Point amount updated successfully");
        }

        PointHistory pointHistory =
                PointHistory.builder().user(user).amount(transType.isDeductTransaction() ? -Math.abs(pointAmount) :
                        Math.abs(pointAmount)).transType(transType).build();
        if (transactionId != null && !transactionId.isBlank())
            pointHistory.setTransactionId(transactionId);

        if (transType.isDefaultActiveStatus()) {
            pointHistory.setStatus(Status.ACTIVATED);
        } else {
            pointHistory.setStatus(Status.DEACTIVATED);
        }

        log.debug("Creating transaction history with details: {}", pointHistory.toString());
        pointHistory = pHistoryRepo.save(pointHistory);
        log.info("Transaction history created successfully with Id: {}", pointHistory.getPointHistoryId());
        return pointHistory.getPointHistoryId();
    }

    @Override
    public void chargePointsIOS(VerifyReceiptReq receiptData) {
        final var userId = authFacade.getAuthentication().getUserId();
        var receiptInfo = appStoreService.verifyReceipt(receiptData);
        var chargeType = pChargeTypeRepo.findById(receiptInfo.getProductId())
                .orElseThrow(() -> new BusinessException(ErrorCode.APPSTORE_PRODUCT_ID_NOT_FOUND));
        doTransaction(chargeType.getPointAmount(), PointTransactionType.CHARGE, userId, receiptInfo.getTransactionId());
    }

    @Override
    public void chargePointsAndroid(GoogleReceipt googleReceipt) {
        final var userId = authFacade.getAuthentication().getUserId();
        var receiptInfo = googleInAppClient.verifyPurchase(googleReceipt);
        var chargeType = pChargeTypeRepo.findById(receiptInfo.getProductId().replace("busking_", ""))
                .orElseThrow(() -> new BusinessException(ErrorCode.APPSTORE_PRODUCT_ID_NOT_FOUND));
        doTransaction(chargeType.getPointAmount(), PointTransactionType.CHARGE, userId, receiptInfo.getTransactionId());
    }

    @Override
    public void withdrawRequest(WithdrawRequestInfoDto drawRequest) {
        final var userId = authFacade.getAuthentication().getUserId();
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            BankWithdrawInfoDto bankWithdrawInfoDto = drawRequest.getBank();
            if (bankWithdrawInfoDto.getAccountHolder().isEmpty() ||
                    bankWithdrawInfoDto.getBankName().isEmpty() ||
                    bankWithdrawInfoDto.getAccountNumber().isEmpty()) {
                throw new BusinessException(ErrorCode.BANK_NOT_VALIDATE);
            }
            int amount = drawRequest.getAmount();
            if (amount > user.getPointAmount()) {
                throw new BusinessException(ErrorCode.PAYMENT_WITHDRAW_OVER_POINTS);
            }
            user.setPointAmount(user.getPointAmount() - Math.abs(amount));
            PointHistory pointHistory =
                    PointHistory.builder().user(user).amount(-Math.abs(amount)).transType(PointTransactionType.WITHDRAW_REQUEST).build();
            pointHistory.setStatus(Status.DEACTIVATED);
            pointHistory = pHistoryRepo.save(pointHistory);

            BankWithdraw bankWithdraw = modelMapper.map(drawRequest.getBank(), BankWithdraw.class);
            bankWithdraw.setUser(new User(userId));
            bankWithdraw.setPointHistory(pointHistory);
            bankWithdrawRepository.save(bankWithdraw);

            userRepository.save(user);
        }

    }

    @Override
    public void withdrawAccept(int pointHistoryId) {
        Optional<PointHistory> pointHistoryOptional = pHistoryRepo.getPointHistoryById(pointHistoryId);
        if (pointHistoryOptional.isEmpty()) throw new BusinessException(ErrorCode.POINT_HISTORY_NOT_FOUND);
        PointHistory pointHistory = pointHistoryOptional.get();
        if (pointHistory.getStatus() == Status.ACTIVATED) throw new BusinessException(ErrorCode.ILLEGAL_ARGUMENTS);
        int amount = pointHistory.getAmount();
        User user = pointHistory.getUser();
        Long newPointId = doTransaction(amount, PointTransactionType.WITHDRAW_APPROVE, user.getId(), null);
        pointHistory.setStatus(Status.ACTIVATED);
        pHistoryRepo.save(pointHistory);

        Optional<BankWithdraw> bankWithdrawOptional = bankWithdrawRepository.findByPointHistoryId(pointHistory.getPointHistoryId());
        // save to new bank withdraw
        if(bankWithdrawOptional.isPresent()) {
            BankWithdraw bankWithdraw = bankWithdrawOptional.get();
            bankWithdraw.setId(0);
            bankWithdraw.setPointHistory(new PointHistory(newPointId));
            bankWithdrawRepository.save(bankWithdraw);
        }
    }

    @Override
    public void withdrawReject(int pointHistoryId) {
        Optional<PointHistory> pointHistoryOptional = pHistoryRepo.getPointHistoryById(pointHistoryId);
        if (pointHistoryOptional.isEmpty()) throw new BusinessException(ErrorCode.POINT_HISTORY_NOT_FOUND);
        PointHistory pointHistory = pointHistoryOptional.get();
        if (pointHistory.getStatus() == Status.ACTIVATED) throw new BusinessException(ErrorCode.ILLEGAL_ARGUMENTS);
        int amount = pointHistory.getAmount();
        User user = pointHistory.getUser();
        Long newPointId = doTransaction(amount, PointTransactionType.WITHDRAW_REJECT, user.getId(), null);
        pointHistory.setStatus(Status.ACTIVATED);
        pHistoryRepo.save(pointHistory);

        Optional<BankWithdraw> bankWithdrawOptional = bankWithdrawRepository.findByPointHistoryId(pointHistory.getPointHistoryId());
        // save to new bank withdraw
        if(bankWithdrawOptional.isPresent()) {
            BankWithdraw bankWithdraw = bankWithdrawOptional.get();
            bankWithdraw.setId(0);
            bankWithdraw.setPointHistory(new PointHistory(newPointId));
            bankWithdrawRepository.save(bankWithdraw);
        }
    }

    @Override
    public List<BankWithdrawSettlementInfoDto> getSettlementNeedConfirm() {
        List<BankWithdraw> bankWithdrawList = bankWithdrawRepository.getBankByPointHistoryStatus(PointTransactionType.WITHDRAW_REQUEST, Status.DEACTIVATED);
        List<BankWithdrawSettlementInfoDto> results = new ArrayList<>();
        bankWithdrawList.forEach(bankWithdraw -> {
            results.add(modelMapper.map(bankWithdraw, BankWithdrawSettlementInfoDto.class));
        });
        return results;
    }


    /**
     * show all by paging
     * https://roytuts.com/spring-data-jpa-specification-criteria-query/
     * Ctrl+alt+q
     *
     * @return show all by paging
     * @author thangtony
     **/
    @Override
    public PageResponse<PointHistoryResponseDTO> findAll(String name, List<String> pointType, Pageable pageable) {
        Specification<PointHistory> query = Specification.where(null);
//        if (pointType != null) {
//            List<String> list = Arrays.asList(pointType);
//            List<Predicate> predicates = new ArrayList<>();
//            Specification<PointHistory> queryType = query.and((root, criteriaQuery, criteriaBuilder) -> {
//                Join<PointHistory, PointHistory> buskingLandJoin = root.join(PointHistory_.user, JoinType.INNER);
//                predicates.add(buskingLandJoin.in(castToRequiredType(buskingLandJoin.get(PointHistory_.type).getJavaType(), list)));
//                Predicate preAll = criteriaBuilder.or(predicates.toArray(new Predicate[predicates.size()]));
//                return preAll;
//            });
//            query = query.and(queryType);
//        }

        if (name != null) {
            Specification<PointHistory> queryName = query.and((root, criteriaQuery, criteriaBuilder) -> {
                Join<PointHistory, User> pointHistoryJoin = root.join(PointHistory_.user, JoinType.INNER);
                Predicate predicateNameUser = criteriaBuilder.like(pointHistoryJoin.get(User_.name), "%" + name + "%");
                return criteriaBuilder.and(predicateNameUser);
            });
            query = query.and(queryName);
        }

        if (pointType != null) {
            spec = new PointHistorySpecification(new SearchCriteria("type", SearchOperation.IN, null, pointType));
            query = query.and(spec);
        }
//        spec = new PointHistorySpecification(new SearchCriteria("status", SearchOperation.CONTAINS, Status.ACTIVATED, pointType));
//        query.and(spec);
        Page<PointHistory> pointHistoryPage = pHistoryRepo.findAll(query, pageable);

        Page<PointHistoryResponseDTO> dtos = pointHistoryPage.map(new Function<>() {
            @Override
            public PointHistoryResponseDTO apply(PointHistory pointHistory) {
                PointHistoryResponseDTO dto = modelMapper.map(pointHistory, PointHistoryResponseDTO.class);
                return dto;
            }
        });
        PageResponse<PointHistoryResponseDTO> response = new PageResponse(dtos);
        return response;

    }

    @Override
    public PointHistoryResponseDTO findByID(Long id) {
        var pointHistory = pHistoryRepo.findByPointHistoryId(id).orElseThrow(() -> new BusinessException(ErrorCode.POINT_HISTORY_NOT_FOUND));
        PointHistoryResponseDTO dto = modelMapper.map(pointHistory, PointHistoryResponseDTO.class);
        return dto;
    }

    private Object castToRequiredType(Class fieldType, String value) {
        if (fieldType.isAssignableFrom(Double.class)) {
            return Double.valueOf(value);
        } else if (fieldType.isAssignableFrom(Integer.class)) {
            return Integer.valueOf(value);
        } else if (Enum.class.isAssignableFrom(fieldType)) {
            return Enum.valueOf(fieldType, value);
        }
        return null;
    }

    private Object castToRequiredType(Class fieldType, List<String> value) {
        List<Object> lists = new ArrayList<>();
        for (String s : value) {
            lists.add(castToRequiredType(fieldType, s));
        }
        return lists;
    }
}
