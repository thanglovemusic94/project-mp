package com.mintpot.readingm.backend.controller;

import com.mintpot.readingm.backend.dto.admin.CouponDetailView;
import com.mintpot.readingm.backend.dto.admin.CouponDto;
import com.mintpot.readingm.backend.dto.admin.SaveCouponDto;
import com.mintpot.readingm.backend.entity.constant.ClassType;
import com.mintpot.readingm.backend.security.AuthenticationFacade;
import com.mintpot.readingm.backend.service.CouponService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/coupon")
@Api(tags = {"Coupon"})
@RequiredArgsConstructor
public class CouponController {

    private final CouponService couponService;
    private final AuthenticationFacade authenticationFacade;

    @GetMapping
    public Page<CouponDto> getList(@RequestParam(required = false) ClassType classType,
                                   @RequestParam(required = false) Boolean isAll,
                                   @RequestParam(required = false) String optionSearch,
                                   @RequestParam(required = false) String term,
                                   Pageable page) {

        authenticationFacade.assertAdmin();
        return couponService.find(classType, isAll, optionSearch,term, page);
    }

    @GetMapping("/{id}")
    public CouponDetailView getDetail(@PathVariable long id) {
        authenticationFacade.assertAdmin();
        return couponService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void registerCoupon(@RequestBody SaveCouponDto dto) {
        authenticationFacade.assertAdmin();
        couponService.registerCoupon(dto);
    }

    @PatchMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void editCoupon(@PathVariable long id, @RequestBody SaveCouponDto dto) {
        authenticationFacade.assertAdmin();
        couponService.editCoupon(id, dto);
    }

    @DeleteMapping()
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeCoupon(@RequestParam List<Long> ids) {
        authenticationFacade.assertAdmin();
        couponService.removeCoupon(ids);
    }
}
