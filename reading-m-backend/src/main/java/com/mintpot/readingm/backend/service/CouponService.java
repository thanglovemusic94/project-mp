package com.mintpot.readingm.backend.service;

import com.mintpot.readingm.backend.dto.admin.CouponDetailView;
import com.mintpot.readingm.backend.dto.admin.CouponDto;
import com.mintpot.readingm.backend.dto.admin.SaveCouponDto;
import com.mintpot.readingm.backend.entity.Coupon;
import com.mintpot.readingm.backend.entity.constant.ClassType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CouponService {
    Page<CouponDto> find(ClassType classType, Boolean isAll, String optionSearch,String term, Pageable page);

    CouponDetailView findById(Long id);

    CouponDto convertEntityToDto(Coupon entity);

    void registerCoupon(SaveCouponDto dto);

    void editCoupon(Long id, SaveCouponDto dto);

    void removeCoupon(List<Long> ids);
}
