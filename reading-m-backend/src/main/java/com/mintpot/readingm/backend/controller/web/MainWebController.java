package com.mintpot.readingm.backend.controller.web;

import com.mintpot.readingm.backend.dto.MainTutorOfMonthView;
import com.mintpot.readingm.backend.dto.admin.banner.BannerView;
import com.mintpot.readingm.backend.dto.admin.magazine.MagazineView;
import com.mintpot.readingm.backend.entity.Banner;
import com.mintpot.readingm.backend.entity.Magazine;
import com.mintpot.readingm.backend.entity.clazz.GoalClass;
import com.mintpot.readingm.backend.entity.clazz.TextBookClass;
import com.mintpot.readingm.backend.entity.constant.ShowStatus;
import com.mintpot.readingm.backend.exception.CommonException;
import com.mintpot.readingm.backend.exception.ErrorCode;
import com.mintpot.readingm.backend.repository.BannerRepository;
import com.mintpot.readingm.backend.repository.ClassReviewRepository;
import com.mintpot.readingm.backend.repository.MagazineRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.*;

import javax.persistence.criteria.Predicate;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/web/")
@Api(tags = {"Web Main"})
@RequiredArgsConstructor
public class MainWebController {

    private final BannerRepository bannerRepository;
    private final MagazineRepository magazineRepository;
    private final ClassReviewRepository classReviewRepo;

    @GetMapping("/banner")
    Page<BannerView> findByBanner(@RequestParam(required = false) Specification<Banner> query, Pageable pageable) {
        query = Specification.where(null);
        query = query.and((root, criteriaQuery, criteriaBuilder) -> {
            Predicate preShow = criteriaBuilder.equal(root.get("showStatus"), ShowStatus.SHOW);
            return criteriaBuilder.and(preShow);
        });
        pageable = PageRequest.of(0, Integer.MAX_VALUE, Sort.by(Sort.Order.asc("orderBanner"), Sort.Order.desc("createdAt")));
        Page<BannerView> bannerViews = bannerRepository.find(query, pageable, BannerView.class);
        return bannerViews;
    }

    @GetMapping("/magazine")
    Page<MagazineView> findByMagazine(@RequestParam(required = false) Specification<Magazine> query, Pageable pageable) {
        return magazineRepository.find(query, pageable, MagazineView.class);
    }

    @ApiOperation("find magazine by id")
    @GetMapping("/magazine/{id}")
    Magazine findMagazineById(@PathVariable Long id) {
        Magazine magazine = magazineRepository.findById(id).orElseThrow(() -> new CommonException(ErrorCode.MAGAZINE_NOT_FOUND));
        return magazine;
    }

    @ApiOperation(value = "", notes = "Get Tutors have highest star")
    @GetMapping("/tutor-of-month")
    public List<MainTutorOfMonthView> findTutor() {
        var lastMonth = LocalDate.now().minusMonths(1);
        var firstDayOfLastMonth = lastMonth.withDayOfMonth(1);
        var lastDayOfLastMonth = lastMonth.with(TemporalAdjusters.lastDayOfMonth());
        var textBookList = classReviewRepo.findTutorsHasHighestRate(TextBookClass.class.getSimpleName(),
                LocalDateTime.of(firstDayOfLastMonth, LocalTime.of(0, 0)),
                LocalDateTime.of(lastDayOfLastMonth, LocalTime.of(0, 0)),
                PageRequest.of(0, 5),
                MainTutorOfMonthView.class);

        var goalClassList = classReviewRepo.findTutorsHasHighestRate(GoalClass.class.getSimpleName(),
                LocalDateTime.of(firstDayOfLastMonth, LocalTime.of(0, 0)),
                LocalDateTime.of(lastDayOfLastMonth, LocalTime.of(0, 0)),
                PageRequest.of(0, 5),
                MainTutorOfMonthView.class);

        List<MainTutorOfMonthView> rsList = new ArrayList<>();
        rsList.addAll(textBookList.getContent());
        rsList.addAll(goalClassList.getContent());
        return  rsList;
    }
}
