package com.mintpot.readingm.backend.service;

import com.mintpot.readingm.backend.dto.admin.CouponDetailView;
import com.mintpot.readingm.backend.dto.admin.CouponDto;
import com.mintpot.readingm.backend.dto.admin.ParentDto;
import com.mintpot.readingm.backend.dto.admin.SaveCouponDto;
import com.mintpot.readingm.backend.entity.Coupon;
import com.mintpot.readingm.backend.entity.constant.ClassType;
import com.mintpot.readingm.backend.entity.constant.IssuingMode;
import com.mintpot.readingm.backend.entity.user.Parent;
import com.mintpot.readingm.backend.exception.CommonException;
import com.mintpot.readingm.backend.exception.ErrorCode;
import com.mintpot.readingm.backend.repository.CouponRepository;
import com.mintpot.readingm.backend.repository.ParentRepository;
import com.mintpot.readingm.backend.user.User;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.util.Strings;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CouponServiceImpl implements CouponService {

    private final CouponRepository couponRepository;

    private final ParentRepository parentRepository;

    private final ModelMapper mapper;

    @Override
    public Page<CouponDto> find(ClassType classType, Boolean isAll, String optionSearch,
                                String term, Pageable page) {
        String name = null;

        if(!Strings.isBlank(optionSearch)) {
            if("couponName".equals(optionSearch)) {
                name = term;
                term = null;
            }
        }

        if(!isAll && classType == null) {
            return couponRepository.findByAppliedAll(name, term, page).map(this::convertEntityToDto);
        } else {
            return couponRepository.find(classType, name, term, page).map(this::convertEntityToDto);
        }
    }

    @Override
    public CouponDetailView findById(Long id) {
        Coupon coupon = couponRepository.findById(id).orElseThrow(() ->
                new CommonException(ErrorCode.ENTITY_NOT_FOUND));

        var dto = mapper.map(coupon, CouponDetailView.class);
        Set<Parent> parents = coupon.getMembers();
        if (parents != null) {
            dto.setParentIdList(parents.stream().map(User::getId)
                    .collect(Collectors.toSet()));
        }

        return dto;
    }

    @Override
    public CouponDto convertEntityToDto(Coupon entity) {
        CouponDto dto = mapper.map(entity, CouponDto.class);
        dto.setMembers(entity.getMembers().stream()
                .map(m -> mapper.map(m, ParentDto.class))
                .collect(Collectors.toSet()));

        return dto;
    }

    @Override
    public void registerCoupon(SaveCouponDto dto) {
        Coupon coupon = mapper.map(dto, Coupon.class);
        if (dto.getParentIdList() != null) {
            coupon.setMembers(new HashSet<>(parentRepository.findAllById(dto.getParentIdList())));
        }

        couponRepository.save(coupon);
    }

    @Override
    public void editCoupon(Long id, SaveCouponDto dto) {
        Coupon coupon = couponRepository.findById(id)
                .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));
        coupon.setName(dto.getName() != null ? dto.getName() : coupon.getName());
        coupon.setAmount(dto.getAmount() != null ? dto.getAmount() : coupon.getAmount());
        coupon.setClassType(dto.getClassType());
        coupon.setStartValidDate(dto.getStartValidDate() != null ? dto.getStartValidDate() : coupon.getStartValidDate());
        coupon.setEndValidDate(dto.getEndValidDate() != null ? dto.getEndValidDate() : coupon.getEndValidDate());
        coupon.setIssuingMode(dto.getIssuingMode() != null ? dto.getIssuingMode() : coupon.getIssuingMode());
        Set<Long> parentIdList = dto.getParentIdList();
        if (coupon.getIssuingMode() == IssuingMode.SELECT && parentIdList != null
                && parentIdList.size() > 0) {

            coupon.setMembers(new HashSet<>(parentRepository.findAllById(parentIdList)));
        } else if (coupon.getIssuingMode() == IssuingMode.ALL) {
            coupon.setMembers(new HashSet<>());
        }

        couponRepository.save(coupon);
    }

    @Override
    public void removeCoupon(List<Long> ids) {
        for (long id: ids) {
            couponRepository.deleteById(id);
        }
    }
}
