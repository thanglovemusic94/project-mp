package com.mintpot.readingm.backend.controller;

import com.mintpot.readingm.backend.dto.admin.*;
import com.mintpot.readingm.backend.entity.clazz.DavinciClass;
import com.mintpot.readingm.backend.entity.clazz.DavinciLog;
import com.mintpot.readingm.backend.entity.clazz.Video;
import com.mintpot.readingm.backend.entity.constant.ClassStatus;
import com.mintpot.readingm.backend.entity.constant.ClassType;
import com.mintpot.readingm.backend.entity.id.UserClassId;
import com.mintpot.readingm.backend.exception.CommonException;
import com.mintpot.readingm.backend.exception.ErrorCode;
import com.mintpot.readingm.backend.repository.*;
import com.mintpot.readingm.backend.security.AuthenticationFacade;
import com.mintpot.readingm.backend.service.ClassService;
import com.mintpot.storage.StorageService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.util.Strings;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/davincies")
@Api(tags = {"Class Davinci"})
@RequiredArgsConstructor
public class DavinciClassController {

    private final DavinciClassRepository davinciRepo;
    private final DavinciLogRepository davinciLogRepo;
    private final VideoInPayRepository videoInPayRepo;
    private final PaymentRepository paymentRepo;
    private final StorageService storageService;
    private final AuthenticationFacade authFacade;
    private final ClassService classService;
    private final ModelMapper mapper;
    private final ClassCartRepository classCartRepo;

    @GetMapping
    Page<DavinciClassDto> findByQuery(Pageable page) {

        return davinciRepo.getAllByDeleteFlg(false, page).map(davinci -> {
            var dto = mapper.map(davinci, DavinciClassDto.class);
            dto.setRating(classService.getAverageRating(davinci.getId()));
            return dto;
        });
    }

    @GetMapping("/{classId}")
    DavinciClassDetailDto findById(@PathVariable Long classId) {
        var davinciClass = davinciRepo.findById(classId)
            .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));

        var res = mapper.map(davinciClass, DavinciClassDetailDto.class);
        res.setRating(classService.getAverageRating(classId));

        long userId = 0L;
        try {
            userId = authFacade.getAuthentication().getUserId();
        } catch (ClassCastException ex) {

        }
        res.setAddedToCart(classCartRepo.findById(new UserClassId(userId, classId)).isPresent());
        return res;
    }

    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping
    @Transactional
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void removeClass(@RequestParam List<Long> ids){
        for (long i : ids) {
            var davinciClass=davinciRepo.findById(i)
                    .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));

            if(davinciClass.isHaveStudent()) {
                throw new CommonException(ErrorCode.CLASS_NOT_ALLOWED_DELETE, davinciClass.getName());
            }

            final var videos=davinciClass.getVideos();
            var deleteFileUrls = new ArrayList<String>();
            deleteFileUrls.add(davinciClass.getImageUrl());
            for (var v : videos) {
                deleteFileUrls.add(v.getVideoUrl());
            }

            storageService.deleteObjectKeys(deleteFileUrls);

            davinciClass.setDeleteFlg(true);
            davinciRepo.save(davinciClass);
        }

    }

    @PostMapping("/log/{classId}}")
    @Transactional
    @ResponseStatus(HttpStatus.CREATED)
    //@PreAuthorize("hasRole('ROLE_STUDENT')")
    void addLog(@PathVariable long classId,@RequestBody String videoUrl, HttpServletRequest request){
        var nClass=davinciRepo.findById(classId)
            .orElseThrow(()->new CommonException(ErrorCode.ENTITY_NOT_FOUND));

        Video video=null;
        for (Video v:nClass.getVideos()
             ) {
            if(v.getVideoUrl().equals(videoUrl)){
                video=v;
            }
        }
        if(video!=null) {
            var davinciLog = DavinciLog.builder().lectureName(nClass.getName())
                    //.grade(nClass.getGrade())
                    .lectureTitle(video.getName())
                    .studentId(authFacade.getAuthentication().getUserId())
                    //.studentId(6)
                    .classId(classId)
                    .ip(request.getRemoteAddr())
                    .build();
            davinciLogRepo.save(davinciLog);
        }
        else throw new CommonException(ErrorCode.ENTITY_NOT_FOUND);

    }

    @GetMapping("/log")
    @ApiOperation(value="Api for web admin 4-4")
    Page<DavinciLogView> findLogByQuery(@RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
                                        @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate,
                                        @RequestParam(required = false) String optionSearch,
                                        @RequestParam(required = false) String term,
                                        Pageable page) {

        authFacade.assertAdmin();
        String courseName = null;
        String courseTitle = null;
        String targetStudent = null;
        String id = null;

        if(Strings.isBlank(term)) {
            term = null;
        }

        if(!Strings.isBlank(optionSearch)) {
            if("courseName".equals(optionSearch)) {
                courseName = term;
                term = null;
            } else if("courseTitle".equals(optionSearch)) {
                courseTitle = term;
                term = null;
            } else if("targetStudent".equals(optionSearch)) {
                targetStudent = term;
                term = null;
            } else if("id".equals(optionSearch)) {
                id = term;
                term = null;
            }
        }

        LocalDateTime start = startDate != null ? LocalDateTime.of(startDate, LocalTime.of(0, 0, 0)) : null;
        LocalDateTime end = endDate != null ? LocalDateTime.of(endDate, LocalTime.of(23, 59, 59)) : null;

        return davinciLogRepo.find(start, end, courseName, courseTitle, targetStudent,
            id, term, page, DavinciLogView.class);
    }

    @GetMapping("/overview/{id}")
    public DavinciClassOverviewWebView findClassOverviewById(@PathVariable long id){
        return davinciRepo.findWebViewById(id);
    }


    @GetMapping("/class/list")
    Page<DavinciClassWebView> getClassListWebView(Pageable page){
        return davinciRepo.getAllByStatusAndDeleteFlg(ClassStatus.SHOW, false, page);
    }

    //set time viewed video by student
    @PatchMapping("/lecture/view")
    @Transactional
    public void viewedLecture(@RequestBody ViewLectureDto viewLectureDto){
        var studentId=authFacade.getAuthentication().getUserId();
        var videopay=videoInPayRepo.findById(viewLectureDto.getVideoInPayId())
                .orElseThrow(()->new CommonException(ErrorCode.ENTITY_NOT_FOUND));
        if(videopay.getPayment().getChildren().getId()!=studentId)
            throw new CommonException(ErrorCode.ENTITY_NOT_FOUND);
        videoInPayRepo.updateViewedAt(videopay.getId(),viewLectureDto.getViewedAt());
    }

    //set view all video by student
    @PatchMapping("/lecture/viewall/{classId}")
    @Transactional
    public void viewedAllLecture(@PathVariable long classId){
        var studentId=authFacade.getAuthentication().getUserId();
        var videosPay=videoInPayRepo.getAllByPayment_Children_IdAndPayment_ClassInformation_Id(studentId,classId);
        for (var video:videosPay
             ) {
            videoInPayRepo.updateViewed(video.getId());
        }

    }

    //get time viewed all student's video by student
    @GetMapping("/lecture/view/{classId}")
    Page<VideoInPayView> getLectureViews(@PathVariable long classId, Pageable page){
        var studentId=authFacade.getAuthentication().getUserId();
        return videoInPayRepo.findByPayment_Children_IdAndPayment_ClassInformation_Id(studentId,classId,page);

    }

    @GetMapping("/children/classes")
    Page<PaidClassView> getClassPayed(Pageable page){
        var studentId=authFacade.getAuthentication().getUserId();
        var payments=paymentRepo.getPaidClassView(studentId, ClassType.MATHEMATICS,page);
        return payments;
    }

}
