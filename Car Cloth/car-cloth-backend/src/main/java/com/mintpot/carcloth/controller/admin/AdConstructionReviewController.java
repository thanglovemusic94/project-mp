package com.mintpot.carcloth.controller.admin;

import com.mintpot.carcloth.constant.ShowStatus;
import com.mintpot.carcloth.dto.review.AdReviewDetail;
import com.mintpot.carcloth.dto.review.AdReviewList;
import com.mintpot.carcloth.dto.review.ReviewStatus;
import com.mintpot.carcloth.exception.CommonException;
import com.mintpot.carcloth.exception.ErrorCode;
import com.mintpot.carcloth.repository.ConstructionReviewRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/admin/reviews")
@Api(tags = {"Construction review"})
@RequiredArgsConstructor
//@PreAuthorize("hasRole('ROLE_ADMIN')")
public class AdConstructionReviewController {

    private final ConstructionReviewRepository constructionReviewRepo;

    private final ModelMapper mapper;

    @GetMapping
    @ApiOperation(value = "Api for slide 21")
    public Page<AdReviewList> getReviewList(@RequestParam(required = false) ShowStatus status,
                                            @RequestParam(required = false) String companyName,
                                            @RequestParam(required = false) String writerId,
                                            @RequestParam(required = false) String writerName,
                                            Pageable page) {

        return constructionReviewRepo.findAdReviewList(status, companyName, writerId, writerName, page)
                .map(r -> mapper.map(r, AdReviewList.class));
    }

    @PatchMapping("/status")
    @Transactional
    @ApiOperation(value = "Api for slide 21")
    public void toggle(@Valid @RequestBody List<ReviewStatus> statusList){
        for (var s : statusList) {
            var review = constructionReviewRepo.findById(s.getId())
                    .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));

            review.setStatus(s.getStatus());
            constructionReviewRepo.save(review);
        }
    }


    @GetMapping("/{reviewId}")
    @ApiOperation("Api for slide 22")
    public AdReviewDetail detail(@PathVariable long reviewId) {
        var review =  constructionReviewRepo.findById(reviewId)
                .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));
        return mapper.map(review, AdReviewDetail.class);
    }
}
