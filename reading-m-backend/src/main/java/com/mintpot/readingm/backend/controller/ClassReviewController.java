package com.mintpot.readingm.backend.controller;

import com.mintpot.readingm.backend.dto.admin.AdClassReviewView;
import com.mintpot.readingm.backend.dto.clazz.ClassReviewView;
import com.mintpot.readingm.backend.entity.clazz.ClassReview;
import com.mintpot.readingm.backend.entity.clazz.TextBookClass;
import com.mintpot.readingm.backend.entity.constant.ClassType;
import com.mintpot.readingm.backend.entity.constant.ShowStatus;
import com.mintpot.readingm.backend.exception.CommonException;
import com.mintpot.readingm.backend.exception.ErrorCode;
import com.mintpot.readingm.backend.repository.ClassRepository;
import com.mintpot.readingm.backend.repository.ClassReviewRepository;
import com.mintpot.readingm.backend.security.AuthenticationFacade;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.logging.log4j.util.Strings;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/classReviews")
@Api(tags = {"Class Review"})
@RequiredArgsConstructor
@Slf4j
public class ClassReviewController {

    private final ClassReviewRepository classReviewRepo;

    private final ClassRepository classRepo;

    private final AuthenticationFacade authFacade;

    @GetMapping
    Page<AdClassReviewView> findByQuery(@RequestParam(required = false) ShowStatus showStatus,
                                        @RequestParam(required = false) String classType,
                                        @RequestParam(required = false) String optionSearch,
                                        @RequestParam(required = false) String term,
                                        Pageable page) {

        String content = null;
        String reviewer = null;

        if(!Strings.isBlank(optionSearch)) {
            if("content".equals(optionSearch)) {
                content = term;
                term = null;
            }else if("reviewer".equals(optionSearch)) {
                reviewer = term;
                term = null;
            }
        }
        return classReviewRepo.search(showStatus, classType, content, reviewer, term, page);
    }

    @GetMapping("/{classId}")
    Page<ClassReviewView> getClassReview(@PathVariable long classId,  Pageable page){
        var clazz = classRepo.findById(classId).orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));

        if (page.getSort().isUnsorted()) {
            page = PageRequest.of(page.getPageNumber(), page.getPageSize(), Sort.by("createdOn").descending());
        }

        if (clazz instanceof TextBookClass) {
            var tutorId = ((TextBookClass) clazz).getTutor().getId();
            return classReviewRepo.findByTutorIdAndClassType(tutorId, clazz.getType(), page, ClassReviewView.class);
        }
        return classReviewRepo.findByClassInfo_Id(classId, page, ClassReviewView.class);
    }

    @GetMapping("/byStudent")
    Page<ClassReviewView> getClassReviewBySt(Pageable page){
        long userId = 0L;
        try {
            final var usrDetail = authFacade.getAuthentication();
            userId = usrDetail.getUserId();
        } catch (ClassCastException ex) {
            log.error("getClassReviewBySt error: " + ex.getMessage());
        }

        return classReviewRepo.findByStudent(userId, page, ClassReviewView.class);
    }
}
