package com.mintpot.busking.service.impl;

import com.mintpot.busking.constant.UserStatus;
import com.mintpot.busking.dto.BankWithdrawSettlementInfoDto;
import com.mintpot.busking.dto.PageResponse;
import com.mintpot.busking.dto.web.response.BankWithdrawSettlementDTO;
import com.mintpot.busking.dto.web.response.Busker_BankWithDrawDTO;
import com.mintpot.busking.dto.web.response.PointHistoryResponseDTO;
import com.mintpot.busking.exception.BusinessException;
import com.mintpot.busking.exception.constant.ErrorCode;
import com.mintpot.busking.model.*;
import com.mintpot.busking.model.constant.BuskingType;
import com.mintpot.busking.model.constant.PointTransactionType;
import com.mintpot.busking.model.constant.Status;
import com.mintpot.busking.repository.BankWithdrawRepository;
import com.mintpot.busking.service.BankWithDrawService;
import com.mintpot.busking.utils.search.BankWithdrawSpecification;
import com.mintpot.busking.utils.search.PointHistorySpecification;
import com.mintpot.busking.utils.search.SearchCriteria;
import com.mintpot.busking.utils.search.SearchOperation;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Predicate;
import java.util.*;
import java.util.function.Function;

/**
 * @author Admin
 * @date 2021-02-22 16:13 PM
 */
@Service
public class BankWithDrawServiceImpl implements BankWithDrawService {

    @Autowired
    private BankWithdrawRepository withdrawRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private BankWithdrawSpecification spec;

    @Override
    public PageResponse<BankWithdrawSettlementDTO> findAll(String name, PointTransactionType pointType, Date start, Date end, Pageable pageable) {
        Specification<BankWithdraw> query = Specification.where(null);

//        if (pointType != null) {
//            List<Predicate> predicates = new ArrayList<>();
//            Specification<BankWithdraw> queryType = query.and((root, criteriaQuery, criteriaBuilder) -> {
//                Join<BankWithdraw, PointHistory> buskingLandJoin = root.join(BankWithdraw_.pointHistory, JoinType.LEFT);
//                predicates.add(buskingLandJoin.in(castToRequiredType(buskingLandJoin.get(PointHistory_.type).getClass(), pointType)));
//                Predicate preAll = criteriaBuilder.or(predicates.toArray(new Predicate[predicates.size()]));
//                return preAll;
//            });
//            query = query.and(queryType);
//        }

        if (pointType != null) {
            Specification<BankWithdraw> queryName = query.and((root, criteriaQuery, criteriaBuilder) -> {
                Join<BankWithdraw, PointHistory> bankJoinPoint = root.join(BankWithdraw_.pointHistory, JoinType.LEFT);
                Predicate preStart = criteriaBuilder.equal(bankJoinPoint.get(PointHistory_.type), pointType);
                if (pointType == PointTransactionType.WITHDRAW_REQUEST) {
                    Predicate preStatus = criteriaBuilder.equal(bankJoinPoint.get(PointHistory_.status), Status.DEACTIVATED);
                    return criteriaBuilder.and(preStart, preStatus);
                } else {
                    return criteriaBuilder.and(preStart);
                }
            });
            query = query.and(queryName);
        } else {
            Specification<BankWithdraw> queryWithdrawRequest = query.and((root, criteriaQuery, criteriaBuilder) -> {
                Join<BankWithdraw, PointHistory> bankJoinPoint = root.join(BankWithdraw_.pointHistory, JoinType.LEFT);

                Predicate preReq = criteriaBuilder.equal(bankJoinPoint.get(PointHistory_.type), PointTransactionType.WITHDRAW_REQUEST);
                Predicate preStatus = criteriaBuilder.equal(bankJoinPoint.get(PointHistory_.status), Status.DEACTIVATED);
                Predicate preReq_Status = criteriaBuilder.and(preReq, preStatus);

                Predicate preAp = criteriaBuilder.equal(bankJoinPoint.get(PointHistory_.type), PointTransactionType.WITHDRAW_APPROVE);
                return criteriaBuilder.or(preReq_Status, preAp);
            });
            query = query.and(queryWithdrawRequest);
        }

        if (start != null && end == null) {
            Specification<BankWithdraw> queryName = query.and((root, criteriaQuery, criteriaBuilder) -> {
                Join<BankWithdraw, PointHistory> bankJoinPoint = root.join(BankWithdraw_.pointHistory, JoinType.INNER);
                Predicate preStart = criteriaBuilder.greaterThan(bankJoinPoint.get(PointHistory_.createdOn), start);
                return criteriaBuilder.and(preStart);
            });
            query = query.and(queryName);
        }

        if (start == null && end != null) {
            Specification<BankWithdraw> queryName = query.and((root, criteriaQuery, criteriaBuilder) -> {
                Join<BankWithdraw, PointHistory> bankJoinPoint = root.join(BankWithdraw_.pointHistory, JoinType.INNER);
                Predicate preEnd = criteriaBuilder.lessThan(bankJoinPoint.get(PointHistory_.createdOn), end);
                return criteriaBuilder.and(preEnd);
            });
            query = query.and(queryName);
        }

        if (start != null && end != null) {
            Specification<BankWithdraw> queryName = query.and((root, criteriaQuery, criteriaBuilder) -> {
                Join<BankWithdraw, PointHistory> bankJoinPoint = root.join(BankWithdraw_.pointHistory, JoinType.INNER);
                Predicate preStart = criteriaBuilder.greaterThan(bankJoinPoint.get(PointHistory_.createdOn), start);
                Predicate preEnd = criteriaBuilder.lessThan(bankJoinPoint.get(PointHistory_.createdOn), end);
                return criteriaBuilder.and(preStart, preEnd);
            });
            query = query.and(queryName);
        }

        if (!StringUtils.isEmpty(name)) {
            Specification<BankWithdraw> queryName = query.and((root, criteriaQuery, criteriaBuilder) -> {
                Join<BankWithdraw, User> buskingLandJoin = root.join(BankWithdraw_.user, JoinType.INNER);
                Predicate predicateNameUser = criteriaBuilder.like(buskingLandJoin.get(User_.name), "%" + name + "%");
                Predicate preUserStatus = criteriaBuilder.equal(buskingLandJoin.get(User_.status), UserStatus.ACTIVATED);
                return criteriaBuilder.and(predicateNameUser, preUserStatus);
            });
            query = query.and(queryName);
        }

        Page<BankWithdraw> bankWithdrawPage = withdrawRepository.findAll(query, pageable);

        Page<BankWithdrawSettlementDTO> dtos = bankWithdrawPage.map(new Function<>() {
            @Override
            public BankWithdrawSettlementDTO apply(BankWithdraw bankWithdraw) {
                BankWithdrawSettlementDTO dto = modelMapper.map(bankWithdraw, BankWithdrawSettlementDTO.class);
                return dto;
            }
        });
        PageResponse<BankWithdrawSettlementDTO> response = new PageResponse(dtos);
        return response;

    }

    @Override
    public PageResponse<Busker_BankWithDrawDTO> findAllBrankByBusker(Integer user_id, Pageable pageable) {

        Specification<BankWithdraw> query = Specification.where(null);

        Specification<BankWithdraw> querySpec = query.and((root, criteriaQuery, criteriaBuilder) -> {
            Join<BankWithdraw, PointHistory> bankJoinPoint = root.join(BankWithdraw_.pointHistory, JoinType.LEFT);

            Predicate preReq = criteriaBuilder.equal(bankJoinPoint.get(PointHistory_.type), PointTransactionType.WITHDRAW_REQUEST);
            Predicate preStatus = criteriaBuilder.equal(bankJoinPoint.get(PointHistory_.status), Status.DEACTIVATED);
            Predicate preBankJoinPoint = criteriaBuilder.and(preReq, preStatus);

            Predicate preAp = criteriaBuilder.equal(bankJoinPoint.get(PointHistory_.type), PointTransactionType.WITHDRAW_APPROVE);

            Join<BankWithdraw, User> withdrawUserJoin = root.join(BankWithdraw_.user, JoinType.LEFT);
            Predicate preUserId = criteriaBuilder.equal(withdrawUserJoin.get(User_.id), user_id);
            Predicate preUserStatus = criteriaBuilder.equal(withdrawUserJoin.get(User_.status), UserStatus.ACTIVATED);

            return criteriaBuilder.and(criteriaBuilder.and(preUserId, preUserStatus), criteriaBuilder.or(preBankJoinPoint, preAp));
        });
        query = query.and(querySpec);

        Page<BankWithdraw> bankWithdrawPage = withdrawRepository.findAll(query, pageable);
        Page<Busker_BankWithDrawDTO> dtos = bankWithdrawPage.map(new Function<BankWithdraw, Busker_BankWithDrawDTO>() {
            @Override
            public Busker_BankWithDrawDTO apply(BankWithdraw bankWithdraw) {
                Busker_BankWithDrawDTO dto = modelMapper.map(bankWithdraw, Busker_BankWithDrawDTO.class);
                return dto;
            }
        });
        PageResponse<Busker_BankWithDrawDTO> response = new PageResponse(dtos);
        return response;

    }

    @Override
    public BankWithdrawSettlementDTO findById(Long id) {
        BankWithdraw withdraw = withdrawRepository.findById(id).get();
        BankWithdrawSettlementDTO dto = modelMapper.map(withdraw, BankWithdrawSettlementDTO.class);
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
