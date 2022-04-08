package com.mintpot.pii.controller;

import com.mintpot.pii.dto.RegBranchDto;
import com.mintpot.pii.entity.Branch;
import com.mintpot.pii.entity.Company;
import com.mintpot.pii.entity.Product;
import com.mintpot.pii.repository.BranchRepository;
import com.mintpot.pii.repository.BranchReviewRepository;
import com.mintpot.pii.repository.ProductRepository;
import com.mintpot.pii.s3.dto.PresignedImagesInfoDto;
import com.mintpot.pii.service.ImageService;
import io.swagger.annotations.Api;
import java.util.Collections;
import lombok.RequiredArgsConstructor;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@RequestMapping("/api/branches")
@Api("Branch")
@RequiredArgsConstructor
public class BranchController {

    private final BranchRepository branchRepo;
    private final ProductRepository productRepo;
    private final BranchReviewRepository branchReviewRepo;


    @GetMapping("/{branchId}")
    Optional<Branch> getBranchDetailsById(@PathVariable long branchId) {
        var res = branchRepo.findById(branchId);
        res.ifPresent(branch -> branch.setReviewInfo(branchReviewRepo.getCountAndAvgByBranchId(branchId)));

        return res;
    }

    @GetMapping("/{branchId}/products")
    List<Product> getProductsById(@PathVariable long branchId) {
        return productRepo.findByBranchId(branchId);
    }



}
