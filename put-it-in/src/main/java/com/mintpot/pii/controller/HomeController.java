package com.mintpot.pii.controller;

import com.mintpot.pii.entity.Branch;
import com.mintpot.pii.repository.BranchRepository;
import com.mintpot.pii.service.HomeService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Set;

@Log4j2
@RestController
@RequestMapping("/api/home")
@Api(tags = {"Home"})
@RequiredArgsConstructor
public class HomeController {

    private final BranchRepository branchRepo;
    private final HomeService homeService;


    @PreAuthorize("permitAll()")
    @GetMapping("/search")
    Slice<Branch> search(@RequestParam String term, @RequestHeader(name = "X-Location", required = false) String loc,
                         Pageable page) {
        var isSortByDist = page.getSort().stream()
                .anyMatch(order -> "distance".equalsIgnoreCase(order.getProperty())) && page.getSort().isSorted();
        Sort.Order orderByPrice = page.getSort().getOrderFor("price");

        Slice<Branch> res;

        // If sort by distance and loc existed
        if (loc != null && isSortByDist) {
            var nPage = PageRequest.of(page.getPageNumber(), page.getPageSize());

             res = homeService.searchOrderByDistance(loc,term,true, nPage);
            log.info(">>location not NULL");

        } else if (orderByPrice != null) { //TODO, sort by price // linhnc
            Pageable cPage = PageRequest.of(page.getPageNumber(), page.getPageSize());
            res = homeService.searchOrderByPrice(term, orderByPrice.isAscending(), cPage);
        } else {
//            throw new RuntimeException("---- Error missing param order_by! ---");
            res = new SliceImpl<Branch>(new ArrayList<>());
        }
        return res;
    }
}
