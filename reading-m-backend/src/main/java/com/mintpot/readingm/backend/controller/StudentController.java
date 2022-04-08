package com.mintpot.readingm.backend.controller;

import com.mintpot.readingm.backend.dto.clazz.ClassAvailableReview;
import com.mintpot.readingm.backend.dto.clazz.ClassReviewView;
import com.mintpot.readingm.backend.dto.clazz.SaveClassReviewDto;
import com.mintpot.readingm.backend.dto.student.StudentGoalClassDetail;
import com.mintpot.readingm.backend.dto.student.StudentLiveClassDetail;
import com.mintpot.readingm.backend.dto.student.StudentTextBookClassDetail;
import com.mintpot.readingm.backend.entity.clazz.ClassReview;
import com.mintpot.readingm.backend.entity.clazz.TextBookClass;
import com.mintpot.readingm.backend.entity.constant.ShowStatus;
import com.mintpot.readingm.backend.entity.id.UserClassId;
import com.mintpot.readingm.backend.entity.user.Student;
import com.mintpot.readingm.backend.exception.CommonException;
import com.mintpot.readingm.backend.exception.ErrorCode;
import com.mintpot.readingm.backend.repository.ClassRepository;
import com.mintpot.readingm.backend.repository.ClassReviewRepository;
import com.mintpot.readingm.backend.repository.LiveClassRepository;
import com.mintpot.readingm.backend.repository.PaymentRepository;
import com.mintpot.readingm.backend.security.AuthenticationFacade;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/student")
@Api(tags = {"Student"})
@RequiredArgsConstructor
//@PreAuthorize("hasRole('STUDENT')")
public class StudentController {

    private final ClassRepository classRepo;

    private final LiveClassRepository liveClassRepo;

    private final ClassReviewRepository classReviewRepo;

    private final PaymentRepository paymentRepo;

    private final AuthenticationFacade authenticationFacade;

    private final ModelMapper mapper;

    @GetMapping("/{classId}")
    public StudentLiveClassDetail getLiveClassDetail(@PathVariable long classId) {
        long studentId = authenticationFacade.getAuthentication().getUserId();
        return liveClassRepo.findByClassIdAndStudentId(classId, studentId)
                .map(c -> {
                    StudentLiveClassDetail classDetail;
                    if (c instanceof TextBookClass) {
                        classDetail = mapper.map(c, StudentTextBookClassDetail.class);
                    } else {
                        classDetail = mapper.map(c, StudentGoalClassDetail.class);
                    }
                    classDetail.setTutorName(c.getTutor().getName());
                    classDetail.setTutorImgUrl(c.getTutor().getProfileImageUrl());
                    return classDetail;
                })
                .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));
    }

    @GetMapping("/reviews")
    @ApiOperation("API for web main 7-9-2 written review")
    public Page<ClassReviewView> getReviews(Pageable page) {
        long studentId = authenticationFacade.getAuthentication().getUserId();

        if (page.getSort().isUnsorted()) {
            page = PageRequest.of(page.getPageNumber(), page.getPageSize(), Sort.by("createdOn").descending());
        }
        return classReviewRepo.findByWriter_Id(studentId, page, ClassReviewView.class);
    }

    @GetMapping("/classes/available-for-review")
    @ApiOperation(value="API for web main 7-9")
    public Page<ClassAvailableReview> getClassValidForReview(Pageable page) {
        long studentId = authenticationFacade.getAuthentication().getUserId();
        return classReviewRepo.findClassAvailableReviewByUserId(studentId, page);
    }

    @PostMapping("/review")
    @ResponseStatus(HttpStatus.CREATED)
    @ApiOperation(value = "API for 7-9-4 web main")
    public void writeAReview(@RequestBody @Valid SaveClassReviewDto saveReviewDto) {
        long classId = saveReviewDto.getClassId();
        long studentId = authenticationFacade.getAuthentication().getUserId();
        var classInfo = classRepo.findById(classId).orElseThrow(() -> new CommonException(ErrorCode.CLASS_NOT_FOUND));
        var writer = new Student(studentId);
        var entity = mapper.map(saveReviewDto, ClassReview.class);
        entity.setId(new UserClassId(studentId, classId));
        entity.setClassInfo(classInfo);
        entity.setStatus(ShowStatus.SHOW);
        entity.setWriter(writer);
        classReviewRepo.save(entity);
    }
}
