package com.mintpot.readingm.backend.controller;

import com.mintpot.readingm.api.rams.book.Grade;
import com.mintpot.readingm.api.rams.book.School;
import com.mintpot.readingm.backend.constant.StudentGradeRange;
import com.mintpot.readingm.backend.dto.admin.*;
import com.mintpot.readingm.backend.dto.clazz.*;
import com.mintpot.readingm.backend.dto.clazz.embedded.*;
import com.mintpot.readingm.backend.dto.settlement.AttendClassDto;
import com.mintpot.readingm.backend.entity.Book;
import com.mintpot.readingm.backend.entity.Enrollment;
import com.mintpot.readingm.backend.entity.LiveBookEditWeekHistory;
import com.mintpot.readingm.backend.entity.NewspaperColumn;
import com.mintpot.readingm.backend.entity.clazz.Class;
import com.mintpot.readingm.backend.entity.clazz.*;
import com.mintpot.readingm.backend.entity.constant.ClassType;
import com.mintpot.readingm.backend.entity.constant.CourseStatus;
import com.mintpot.readingm.backend.entity.constant.GoalClassCategory;
import com.mintpot.readingm.backend.entity.constant.ShowStatus;
import com.mintpot.readingm.backend.entity.embeddable.AttachedFile;
import com.mintpot.readingm.backend.entity.id.UserClassId;
import com.mintpot.readingm.backend.entity.user.Student;
import com.mintpot.readingm.backend.entity.user.Tutor;
import com.mintpot.readingm.backend.exception.CommonException;
import com.mintpot.readingm.backend.exception.ErrorCode;
import com.mintpot.readingm.backend.repository.*;
import com.mintpot.readingm.backend.security.AuthenticationFacade;
import com.mintpot.readingm.backend.service.AttendService;
import com.mintpot.readingm.backend.service.ClassService;
import com.mintpot.readingm.backend.service.user.TutorService;
import com.mintpot.readingm.backend.service.zoom.ZoomService;
import com.mintpot.readingm.backend.user.User;
import com.mintpot.readingm.backend.user.UserRepository;
import com.mintpot.readingm.backend.util.IdentifierUtils;
import com.mintpot.storage.PresignedImagesInfoDto;
import com.mintpot.storage.StorageService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.logging.log4j.util.Strings;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.MalformedURLException;
import java.net.URL;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/classes")
@Api(tags = {"Class"})
@RequiredArgsConstructor
@Slf4j
public class ClassController {

    private static final String COMMON_FILE_OBJECT= "classes/%d/common-file/curriculum-%d/%s";
    private static final String ATTACHED_FILE_OBJECT= "classes/%d/attached_file/curriculum-%d/std-%d/%s";
    private static final String UNDERSCORE = "_";

    private final ClassService classService;
    private final ClassReviewRepository classReviewRepo;
    private final ClassRepository classRepo;
    private final CurriculumCommonFileRepository commonFileRepo;
    private final AttendService attendService;
    private final CurriculumAttachedFileRepository curriculumFileRepo;
    private final LiveClassRepository liveClassRepo;
    private final GoalClassRepository goalClassRepo;
    private final VodClassRepository vodClassRepo;
    private final DavinciClassRepository davinciRepo;
    private final TextBookClassRepository textBookClassRepo;
    private final ClassCartRepository classCartRepo;
    private final CurriculumRepository curriculumRepo;
    private final BookRepository bookRepo;
    private final NewspaperColumnRepository newspaperRepo;
    private final LiveBookEditWeekHistoryRepository liveBookEditWeekHistoryRepo;
    private final PaymentRepository paymentRepo;
    private final TutorRepository tutorRepo;
    private final TutorService tutorService;
    private final AuthenticationFacade authenticationFacade;
    private final EnrollmentRepository enrollmentRepo;
    private final UserRepository userRepository;

    private final StorageService storageService;
    private final ModelMapper mapper;
    private final IdentifierUtils idUtils;
    private final ZoomService zoomService;


    @GetMapping("/live")
    @ApiOperation(value = "Api for web admin 4-1")
    Page<AdClassView> findLiveClass(@RequestParam(required = false) String classType,
                                    @RequestParam(required = false) String optionSearch,
                                    @RequestParam(required = false) String term,
                                    Pageable page) {

        authenticationFacade.assertAdmin();
        String className = null;
        String tutorName = null;
        String tuitionFee = null;

        if(!Strings.isBlank(optionSearch)) {
            if("className".equals(optionSearch)) {
                className = term;
                term = null;
            } else if("tutorName".equals(optionSearch)) {
                tutorName = term;
                term = null;
            } else if("tuitionFee".equals(optionSearch)) {
                tuitionFee = term;
                term = null;
            }
        }

        return liveClassRepo.search(classType, className, tutorName, tuitionFee, term, page);
    }

    @GetMapping("/getLiveTextBook/byTutor")
    @ApiOperation(value = "api for page 4-3-1 class list (1/2) in wf, stdNo: max student in class")
    Page<LiveTextBookDetailView> findLiveBookByTutor(@RequestParam long tutorId, Pageable page) {
        long userId = 0L;
        try {
            userId = authenticationFacade.getAuthentication().getUserId();
        } catch (ClassCastException ex) {

        }

        if (page.getSort().isUnsorted()) {
            page = PageRequest.of(page.getPageNumber(), page.getPageSize(), Sort.by("openDate").descending());
        }

        List<Long> classIds = classCartRepo.getClassIdByBuyer(userId);
        return textBookClassRepo.findByTutor_Id(tutorId, page).map(c -> {
            var dto = mapper.map(c, LiveTextBookDetailView.class);
            dto.getCurriculum().forEach(curr -> {
                var book = bookRepo.findById(curr.getBookId() != null ? curr.getBookId() : "").orElse(new Book());
                curr.setBook(mapper.map(book, BookDto.class));
            });
            dto.setNumberOfLearners(classRepo.getNumberOfLearners(c.getId()));
            if (classIds != null && classIds.contains(c.getId())) {
                dto.setAddedToCart(true);
            }
            return dto;
        });
    }

    @GetMapping("/getLiveBookCurriculum/{classId}/{curriculumIndex}")
    @ApiOperation(value = "api for page 7-2-1 & 8-2-2 class info + curriculum by curriculum index")
    LiveTextBookCurriculumView getLiveBookCurriculum(@PathVariable long classId,
                                                     @PathVariable int curriculumIndex,
                                                     @RequestParam(required = false) Long studentId) {
        long userId = 0;
        //studentId != null in case 8-2-2
        if(studentId != null) {
            userId = studentId;
        } else {
            try {
                userId = authenticationFacade.getAuthentication().getUserId();
            } catch (ClassCastException ex) {
                log.error("getLiveBookCurriculum error: " + ex.getMessage());
            }
        }

        LiveTextBookCurriculumView res = textBookClassRepo.findBookClassCurriculum(classId, curriculumIndex, userId)
            .orElseThrow(() -> new CommonException(ErrorCode.CLASS_DETAIL_NOT_FOUND));

        return res;
    }

    @GetMapping("/getLiveBookCurriculums/{classId}")
    @ApiOperation(value = "api for page 7-2-1 & 7-7 & 8-2-1 when click to collapse ")
    List<?> getLiveBookCurriculums(@PathVariable long classId,
                                   @RequestParam(required = false) Long studentId) {
        long userId = 0;
        //In case 8-2-1: studentId != null
        if(studentId != null) {
            userId = studentId;
        } else {
            try {
                userId = authenticationFacade.getAuthentication().getUserId();
            } catch (ClassCastException ex) {
                log.error("getLiveBookCurriculums error: " + ex.getMessage());
            }
        }

        var rs = textBookClassRepo.findAttended(classId, userId);

        return rs;
    }

    @GetMapping("/getLiveGoalCurriculums/{classId}")
    @ApiOperation(value = "api for page 7-4 & 8-2-5 when click to collapse ")
    List<?> getLiveGoalCurriculums(@PathVariable long classId,
                                   @RequestParam(required = false) Long studentId) {
        long userId = 0;
        //studentId != null in case 8-2-5
        if(studentId != null) {
            userId = studentId;
        } else {
            try {
                userId = authenticationFacade.getAuthentication().getUserId();
            } catch (ClassCastException ex) {
                log.error("getLiveGoalCurriculums error: " + ex.getMessage());
            }
        }

        var rs = goalClassRepo.findAttended(classId, userId);

        return rs;
    }

    @GetMapping("/getLiveGoalCurriculum/{classId}/{curriculumIndex}")
    @ApiOperation(value = "api for page 7-4-1, 8-2-6 class info + curriculum by curriculum index")
    LiveGoalCurriculumView getLiveGoalCurriculum(@PathVariable long classId,
                                                 @PathVariable int curriculumIndex,
                                                 @RequestParam(required = false) Long studentId) {

        long userId = 0;
        //studentId != null in case 8-2-6
        if(studentId != null) {
            userId = studentId;
        } else {
            try {
                userId = authenticationFacade.getAuthentication().getUserId();
            } catch (ClassCastException ex) {
                log.error("getLiveGoalCurriculum error: " + ex.getMessage());
            }
        }

        LiveGoalCurriculumView res = goalClassRepo.findGoalClassCurriculum(classId, curriculumIndex, userId)
            .orElseThrow(() -> new CommonException(ErrorCode.CLASS_DETAIL_NOT_FOUND));

        return res;
    }

    @GetMapping("/getLiveGoalDetails/{classId}")
    @ApiOperation(value = "api for page 4-7-1 class list (1/2) in wf, stdNo: max student in class")
    LiveGoalDetailView getLiveGoalDetails(@PathVariable long classId) {
        var goalClass = goalClassRepo.findById(classId).orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));
        var goalClassDto = mapper.map(goalClass, LiveGoalDetailView.class);
        goalClassDto.setNumberOfLearners(classRepo.getNumberOfLearners(classId));
        long userId = 0;
        try {
            userId = authenticationFacade.getAuthentication().getUserId();
        } catch (ClassCastException ex) {

        }

        goalClassDto.setAddedToCart(classCartRepo.findById(new UserClassId(userId, classId)).isPresent());
        return goalClassDto;
    }

    @GetMapping("/daVinciClass/isExpired/{classId}")
    @ApiOperation(value = "api for page 7-5 Science Mathematics Da Vinci: is expired class ?")
    Boolean isExpiredClassDaVinci(@PathVariable long classId, @RequestParam(required = false) Long childId) {
        DavinciClass clazz = davinciRepo.findById(classId)
            .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));

        long userId = 0;
        try {
            userId = authenticationFacade.getAuthentication().getUserId();
        } catch (ClassCastException ex) {
            log.error("isExpiredClassDaVinci error: " + ex.getMessage());
        }

        List<Enrollment> enrollments = enrollmentRepo.findByClassIdAndStudentId(classId, childId == null ? userId : childId);

        if(enrollments == null || enrollments.isEmpty()) {
            return false;
        }

        LocalDate paymentDate = enrollments.get(0).getPaymentDate();
        LocalDate expiredDate = paymentDate.plusYears(1);

        if(clazz.getVideos().size() > enrollments.size()) {
            expiredDate = paymentDate.plusMonths(1);
        }

        return expiredDate.isBefore(LocalDate.now());
    }

    @GetMapping("/daVinciCourses/{classId}")
    @ApiOperation(value = "api for page 7-5-1 and 8-2-7-1 Science Mathematics Da Vinci lecture detail list")
    Page<DavinciCourseView> getDaVinciCourses(@PathVariable long classId,
                                              @RequestParam(required = false) Long childId,
                                              Pageable page) {
        davinciRepo.findById(classId).orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));

        long userId = 0;
        try {
            userId = authenticationFacade.getAuthentication().getUserId();
        } catch (ClassCastException ex) {
            log.error("getDaVinciCourses error: " + ex.getMessage());
        }

        Page<DavinciCourseView> rs = enrollmentRepo.findCoursesByClassIdAndStudentId(classId, childId == null ? userId : childId, page);
        return rs;
    }

    @PutMapping("/daVinciCourses/{classId}/enrollment/{courseIndex}")
    @ApiOperation(value = "api for page 7-5-1 Science Mathematics Da Vinci lecture detail: enrollment")
    void enrollmentDaVinciCourses(@PathVariable long classId,
                                  @PathVariable int courseIndex,
                                  @RequestParam CourseStatus status) {
        if(status != CourseStatus.COMPLETE && status != CourseStatus.IN_PROGRESS) {
            throw new CommonException(ErrorCode.COURSE_STATUS_INVALID);
        }
        DavinciClass clazz = davinciRepo.findById(classId)
            .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));

        long userId = 0;
        try {
            userId = authenticationFacade.getAuthentication().getUserId();
        } catch (ClassCastException ex) {
            log.error("isExpiredClassDaVinci error: " + ex.getMessage());
        }

        Enrollment enrollment = enrollmentRepo.findOne(courseIndex, classId, userId)
            .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));

        if(enrollment.getStatus() != status) {
            enrollment.setStatus(status);
            enrollmentRepo.save(enrollment);
        }
    }

    @GetMapping("/getTutorDetails/{classId}")
    TutorLiveClassView getTutorDetails(@PathVariable long classId) {
        var liveClass = liveClassRepo.findById(classId).orElseThrow(() -> new CommonException(ErrorCode.CLASS_NOT_FOUND));
        var tutor = tutorRepo.findById(liveClass.getTutor().getId())
                .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND)); // tutor lazy loading in live class

        var tutorView = mapper.map(tutor, TutorLiveClassView.class);
        tutorView.setRating(tutorService.getAverageRating(tutor.getId(), liveClass.getType()));
        String classIntroduction = "";

        if (liveClass instanceof TextBookClass) {
            classIntroduction = tutor.getBookTextIntroduction();
        } else if (liveClass instanceof GoalClass) {
            classIntroduction = ((GoalClass) liveClass).getIntroduction();
        }

        tutorView.setClassIntroduction(classIntroduction);
        return tutorView;
    }

    @GetMapping("/vod")
    @ApiOperation(value="Api for web admin 4-3")
    Page<AdVodClassView> findVodClass(@RequestParam(required = false) String query, Pageable page) {
        authenticationFacade.assertAdmin();
        return vodClassRepo.findByNameAndDeleteFlg(query, false, page);
    }

    @GetMapping("/search")
    @ApiOperation(value = "search on web main (4-1 and 4-5 in wf), date pattern: yyyy-MM-dd HH:mm a)")
    Page<SearchClassDto> findByType(@RequestParam ClassType classType,
                                    @RequestParam(required = false) String tutorName,
                                    @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd hh:mm a") LocalDateTime startTime,
                                    @RequestParam(required = false) StudentGradeRange gradeRange,
                                    @RequestParam(required = false) GoalClassCategory goalClassCategory,
                                    Pageable page) {

        if (classType == ClassType.LIVE_BOOK) {
            return classService.findTextBookClass(tutorName, startTime, gradeRange, page);
        } else if (classType == ClassType.LIVE_GOAL) {
            return classService.findGoalClass(tutorName, startTime, goalClassCategory, page);
        }

        return Page.empty();
    }

    @PatchMapping("/{classId}/reviews/{userId}/{state}")
    @ApiOperation(value = "", tags = {"Class Review", "Class"})
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void toggleShowClassReview(@PathVariable long classId, @PathVariable long userId, @PathVariable ShowStatus state) {
        var review = classReviewRepo.findById(new UserClassId(userId, classId))
                                    .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));

        review.setStatus(state);
        classReviewRepo.save(review);
    }


    /**
     * json for open class : live class and davinci class
     * {
     * "live": {
     * "curriculum": [
     * {
     * "content": "string",
     * "end": "2021-05-13T04:16:02.562Z",
     * "material": "string",
     * "start": "2021-05-13T04:16:02.562Z"
     * }
     * ],
     * "guide": "string",
     * "stdNo": "2",
     * "materials": "string",
     * "name": "string",
     * "source": "RAMS",
     * "status": "HIDE",
     * "tuitionFee": 0
     * }
     * }
     * <p>
     * <p>
     * <p>
     * {
     * "davinci": {
     * "intro": "hoang",
     * "preparation": "string",
     * "imageUrl": "string",
     * "grade": "G1",
     * "videos": [
     * {
     * "id": 0,
     * "title": "hoang",
     * "time": 60,
     * "price": 2000,
     * "videoUrl": "http://localhost:8080/swagger-ui/index.html#/Class/openClassUsingPOST"
     * },
     * {
     * "id": 0,
     * "title": "hoang2",
     * "time": 60,
     * "price": 2000,
     * "videoUrl": "http://localhost:8080/swagger-ui/index.html#/Class/openClassUsingPOST"
     * }
     * ],
     * "guide": "string",
     * "stdNo": "2",
     * "materials": "string",
     * "name": "string",
     * "source": "RAMS",
     * "status": "SHOW",
     * "tuitionFee": 0
     * }
     * }
     **/
    @PostMapping
    @Transactional
    @ApiOperation(value = "Open new Class", notes = "Opening both types of LiveClass")
    ResponseEntity<?> openClass(@Valid @RequestBody RegClassDto regClassDto) {

        long userId = 0L;
        try {
            userId = authenticationFacade.getAuthentication().getUserId();
        } catch (ClassCastException ex) {

        }

        if (regClassDto instanceof RegLiveBookDto || regClassDto instanceof RegLiveGoalDto) {
            var tutor = tutorRepo.findById(userId).orElseThrow(() -> new CommonException(ErrorCode.USER_NOT_ALLOWED));
            LiveClass nClass = mapper.map(regClassDto, regClassDto instanceof RegLiveBookDto
                    ? TextBookClass.class : GoalClass.class);

            nClass.setTutor(tutor);
            classRepo.save(nClass);
        } else if (regClassDto instanceof RegDavinciClassDto) {
            authenticationFacade.assertAdmin();
            final var regDavinciClass = (RegDavinciClassDto) regClassDto;
            var nClass = mapper.map(regDavinciClass, DavinciClass.class);
            classRepo.save(nClass);

            final var imgKey = String.format("classes/%d/img", nClass.getId());
            final var vidKeys = vodClassGenObjKey(nClass.getId(),
                                                  regDavinciClass.getVideos()
                                                                 .stream()
                                                                 .map(VideoDto::getFileName)
                                                                 .collect(Collectors.toList()));

            nClass.setImageUrl(imgKey);
            classRepo.save(nClass);

            final var presignedUrls = DavinciClassPresignView.builder()
                .videos(storageService.getPresignedUrls(vidKeys).getUrls())
                //.courses(storageService.getPresignedUrls(vidKeys).getUrls())
                .image(storageService.getPresignedUrl(imgKey))
                .build();

            return ResponseEntity.status(HttpStatus.CREATED).body(presignedUrls);

        }
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/textbook/curriculum")
    @ApiOperation(value = "Get textbook curriculum when open class(9-2-1)")
    public List<TextBookCurriculumDto> getTextBookCurriculums(
            @RequestParam(required = false) School school,
            @RequestParam(required = false) Grade grade
    ) {
        return curriculumRepo.findByCClassAndCGrade(school, grade).stream()
                .map(e -> mapper.map(e, TextBookCurriculumDto.class))
                .collect(Collectors.toList());
    }

    @GetMapping("/textbook/curriculumBooks/{cIdx}")
    @ApiOperation(value = "Get book for each curriculum when open class(9-2-1)")
    public List<CurriculumBookDto> getBooksByCurriculum(@PathVariable String cIdx) {
        return bookRepo.getBookByCurriculum(cIdx).stream()
                .map(b -> mapper.map(b, CurriculumBookDto.class))
                .collect(Collectors.toList());
    }

    @GetMapping("/textbook/activities")
    @ApiOperation(value = "API for 9-5 web main")
    public Page<LiveTextBookActivityDto> getTextBookActivities(Pageable page) {
        long userId = 0L;
        try {
            userId = authenticationFacade.getAuthentication().getUserId();
        } catch (ClassCastException ex) {

        }

        var tutor = tutorRepo.findById(userId);
        if (tutor.isEmpty() || userId == 0L) {
            throw new CommonException(ErrorCode.USER_NOT_ALLOWED);
        }

        return textBookClassRepo.findConductedByTutor(userId, page)
                .map(c -> {
                    var dto = mapper.map(c, LiveTextBookActivityDto.class);
                    dto.getCurriculum().forEach(curr -> {
                        var book = bookRepo.findById(curr.getBookId() != null ? curr.getBookId() : "").orElse(new Book());
                        curr.setBook(mapper.map(book, BookDto.class));
                    });
                    return dto;
                });
    }

    @PatchMapping("/{classId}")
    //@PreAuthorize("hasRole('TUTOR')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @ApiOperation(value = "Edit live class", notes = "Edit both types of LiveClass")
    public void editLiveClass(@PathVariable long classId, @RequestBody EditClassDto editDto) {
        long tutorId = authenticationFacade.getAuthentication().getUserId();
        LiveClass nClass = liveClassRepo.findByClassIdAndTutorId(classId, tutorId).orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));
        if (nClass.getTutor().getId() != tutorId) {
            throw new CommonException(ErrorCode.ENTITY_NOT_FOUND);
        }
        nClass.setName(editDto.getName() != null ? editDto.getName() : nClass.getName());
        nClass.setGuide(editDto.getGuide() != null ? editDto.getGuide() : nClass.getGuide());
        nClass.setMaterials(editDto.getMaterials() != null ? editDto.getMaterials() : nClass.getMaterials());
        nClass.setTuitionFee(editDto.getTuitionFee() != null ? editDto.getTuitionFee() : nClass.getTuitionFee());
        List<EditTextBookCurriculumDto> curriculum = editDto.getCurriculum();

        if (nClass instanceof TextBookClass) {
            String revisionReason = editDto.getRevisionReason();
            TextBookClass textBookClass = (TextBookClass) nClass;
            if (revisionReason != null) {
                var editWeekHis = LiveBookEditWeekHistory.builder()
                        .classId(classId)
                        .tutorId(tutorId)
                        .reason(editDto.getRevisionReason())
                        .build();

                liveBookEditWeekHistoryRepo.save(editWeekHis);
                textBookClass.setRevisionReason(revisionReason);
            }

            textBookClass.setCurriculum(curriculum.stream()
                                                  .map(c -> mapper.map(c, TextBookCurriculum.class))
                                                  .collect(Collectors.toList()));

        } else if (nClass instanceof GoalClass) {
            List<GoalCurriculum> goalCurriculum = curriculum.stream().map(c -> mapper.map(c, GoalCurriculum.class))
                                                            .collect(Collectors.toList());

            var goalClass = (GoalClass) nClass;
            goalClass.setCurriculum(goalCurriculum);
            goalClass.setCategory(editDto.getCategory() != null ? editDto.getCategory() : goalClass.getCategory());
            goalClass.setIntroduction(editDto.getIntroduction() != null ? editDto.getIntroduction() : goalClass.getIntroduction());
        }

        classRepo.save(nClass);

    }

    @PutMapping("/{classId}/davinci")
    @Transactional
    DavinciClassPresignView editClass(@PathVariable Long classId, @RequestBody AdDavinciClassEditDto davinciClassDto) {
        authenticationFacade.assertAdmin();
        var result=DavinciClassPresignView.builder().build();
        var editDavinci = davinciRepo.findById(classId)
                                     .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));
        var old_videos = editDavinci.getVideos();
        var new_videos = davinciClassDto.getVideos();
        var deleteFileUrls = new ArrayList<String>();
        var videoFileNameList = new ArrayList<String>();
        PresignedImagesInfoDto videoPregign = null;

        for (VideoDto vNew : new_videos
        ) {
            if (vNew.getVideoUrl() == null || vNew.getVideoUrl().isEmpty()) {
                videoFileNameList.add(vNew.getFileName());
            } else {
                for (Video vOld : old_videos
                ) {
                    if (vNew.getVideoUrl().equals(vOld.getVideoUrl())) {
                        old_videos.remove(vOld);
                        break;
                    }
                }
            }
        }
        for (Video v : old_videos
        ) {
            deleteFileUrls.add(v.getVideoUrl());
        }

        if ((davinciClassDto.getImageUrl() == null || davinciClassDto.getImageUrl().isEmpty()) &&
                davinciClassDto.getImageFileName() !=null &&
                davinciClassDto.getImageFileName().length() > 0
        ) {
            //need upload image davinci
            deleteFileUrls.add(editDavinci.getImageUrl());
            // getPresignedUrls new file upload
            var videoPresign = storageService.getPresignedUrls(vodClassGenObjKey(classId
                    , videoFileNameList));
            var presign_array = videoPresign.getUrls().toArray(new URL[0]);
            int index = 0;
            for (VideoDto v : new_videos
            ) {
                if (v.getVideoUrl() == null || v.getVideoUrl().isEmpty()) {
                    v.setVideoUrl(presign_array[index].toString());
                    index++;
                }
            }

            final var imgKey = String.format("classes/%d/img", classId);
            var imgPresign = storageService.getPresignedUrl(imgKey);
            davinciClassDto.setImageUrl(imgPresign.toString());
            result.setImage(imgPresign);
            davinciClassDto.setVideos(new_videos);
            result.setVideos(videoPresign.getUrls());

        } else {
            // getPresignedUrls new file upload
            videoPregign = storageService.getPresignedUrls(vodClassGenObjKey(classId
                    , videoFileNameList));
            var presign_array = videoPregign.getUrls().toArray(new URL[0]);
            int index = 0;
            for (VideoDto v : new_videos
            ) {
                if (v.getVideoUrl() == null || v.getVideoUrl().isEmpty()) {
                    v.setVideoUrl(presign_array[index].toString());
                    index++;
                }
            }
            davinciClassDto.setVideos(new_videos);
            result.setVideos(videoPregign.getUrls());
        }

        mapper.map(davinciClassDto, editDavinci);
        editDavinci.setId(classId);
        davinciRepo.save(editDavinci);
        storageService.deleteObjectKeys(deleteFileUrls);
        return result;

    }

    public List<String> vodClassGenObjKey(long classId, List<String> videosFileName) {
        return videosFileName.stream().map(fileName -> String.format("classes/%d/videos/%s/%s",
                                                                     classId,
                                                                     idUtils.generateKey(),
                                                                     fileName)).collect(
                Collectors.toList());
    }

    @GetMapping("/{classId}")
    public ResponseEntity<?> getClassById(@PathVariable long classId) {
        final var clazz = classRepo.findById(classId).orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));
        if(clazz.getType().equalsIgnoreCase("DavinciClass")) {
            authenticationFacade.assertAdmin();
            return ResponseEntity.ok(mapper.map(clazz, AdDavinciClassEditDto.class));
        } else if (clazz instanceof LiveClass) {
            var res = mapper.map(clazz, LiveClassDetailDto.class);
            Tutor tutor = ((LiveClass) clazz).getTutor();
            res.setTutorName(tutor.getName());
            if (clazz instanceof TextBookClass) {
                res.setIntroduction(tutor.getBookTextIntroduction());
                res.getCurriculum().forEach(curr -> {
                    var book = bookRepo.findById(curr.getBookId() != null ? curr.getBookId() : "").orElse(new Book());
                    var news = newspaperRepo.findById(curr.getNewPaperId() != null ? curr.getNewPaperId() : "")
                            .orElse(new NewspaperColumn());

                    curr.setBook(mapper.map(book, BookDto.class));
                    curr.setNewPaper(mapper.map(news, NewsPaperDto.class));
                });

                res.getCurriculum().sort(Comparator.comparing(LiveClassCurriculumDetailDto::getStart));
            }
            return ResponseEntity.ok(res);
        }
        // TODO add logic for other type of Class here
        else return ResponseEntity.ok(clazz);
    }

    @GetMapping("/view-full/{classId}")
    @ApiOperation(value="Api for 9-2-2 & 9-4-2 web main")
    public LiveClassViewFullDto viewFullLiveClass(@PathVariable long classId) {
        long userId = 0L;
        try {
            userId = authenticationFacade.getAuthentication().getUserId();
        } catch (ClassCastException ex) {
            log.error("viewFullLiveClass error: " + ex.getMessage());
        }
        var clazz = liveClassRepo.findById(classId).orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));

        if (clazz.getTutor().getId() != userId) {
            throw new CommonException(ErrorCode.USER_NOT_ALLOWED);
        }

        var res = mapper.map(clazz, LiveClassViewFullDto.class);
        var payments = paymentRepo.findPaymentByClass(classId);
        res.getCurriculum().sort(Comparator.comparing(LiveClassViewFullCurriculumDto::getStart));

        for (int i = 0; i < res.getCurriculum().size(); i++) {
            var curr = res.getCurriculum().get(i);
            //Get common attach file
            var commonAttachFile = commonFileRepo.findByClassInfo_IdAndCurriculumIndex(classId, i)
                .orElse(null);

            if (commonAttachFile != null) {
                List<PresignedUrlDto> commonFiles = commonAttachFile.getFiles().stream()
                    .map(f -> {
                        PresignedUrlDto presignedUrl = new PresignedUrlDto();
                        try {
                            presignedUrl.setUrl(new URL(storageService.generateAbsolutePhotoUrl(f.getObjectKey())));
                            presignedUrl.setFileName(f.getFileName());
                        } catch (MalformedURLException e) {
                            log.error("presigned Url error: " + e.getMessage());
                        }

                        return presignedUrl;
                    })
                    .collect(Collectors.toList());

                curr.setCommonFiles(commonFiles);
            }
            //get student info
            var book = bookRepo.findById(curr.getBookId() != null ? curr.getBookId() : "").orElse(new Book());
            curr.setBook(mapper.map(book, BookDto.class));
            var newspaper = newspaperRepo.findById(curr.getNewPaperId() != null ? curr.getNewPaperId() : "")
                    .orElse(new NewspaperColumn());
            curr.setNewspaper(mapper.map(newspaper, NewspaperColumnDto.class));
            final var currIndex = i;
            long finalUserId = userId;
            curr.setStudents(payments.stream().map(p -> {
                var std = mapper.map(p.getChildren(), StudentFileDto.class);
                var attachedFiles = curriculumFileRepo
                    .findByRecipientAndSender(std.getId(), finalUserId, classId, currIndex)
                    .orElse(null);

                if (attachedFiles != null) {
                    std.setAttachedFiles(attachedFiles.getFiles().stream().map(
                        f -> {
                            PresignedUrlDto presignedUrl = new PresignedUrlDto();
                            try {
                                presignedUrl.setUrl(new URL(storageService.generateAbsolutePhotoUrl(f.getObjectKey())));
                                presignedUrl.setFileName(f.getFileName());
                            } catch (MalformedURLException e) {
                                log.error("presigned Url error: " + e.getMessage());
                            }

                            return presignedUrl;
                        }
                    ).collect(Collectors.toList()));
                }

                var stdAttachedFiles = curriculumFileRepo
                    .findByRecipientAndSender(null, std.getId(), classId, currIndex)
                    .orElse(null);

                if (stdAttachedFiles != null) {
                    std.setStdAttachedFiles(stdAttachedFiles.getFiles().stream().map(
                        f -> {
                            PresignedUrlDto presignedUrl = new PresignedUrlDto();
                            try {
                                presignedUrl.setUrl(new URL(storageService.generateAbsolutePhotoUrl(f.getObjectKey())));
                                presignedUrl.setFileName(f.getFileName());
                            } catch (MalformedURLException e) {
                                log.error("presigned Url error: " + e.getMessage());
                            }

                            return presignedUrl;
                        }
                    ).collect(Collectors.toList()));
                }

                return std;
            }).collect(Collectors.toList()));
        }

        long now = System.currentTimeMillis();
        res.setStudents(payments.stream().map(p -> {
            var std = p.getChildren();
            var stdInfo = mapper.map(std, StudentInfo.class);
            stdInfo.setPaymentDate(p.getCreatedOn());
            long signedUpOn = std.getCreatedOn().getTime();
            stdInfo.setNew(now - signedUpOn <= 30*24*60*60*1000L); // 30 days
            return stdInfo;
        }).collect(Collectors.toList()));

        return res;
    }

    @PatchMapping("/view-full/{classId}")
    @Transactional
    @ApiOperation(value="Api for 9-2-2 & 9-4-2 web main")
    public SaveLiveClassViewFullRes updateCurriculum(@Valid @RequestBody SaveLiveClassViewFullDto saveCurriculumDto,
                                                     @PathVariable long classId) {
        SaveLiveClassViewFullRes res = new SaveLiveClassViewFullRes();

        long userId = 0L;
        try {
            userId = authenticationFacade.getAuthentication().getUserId();
        } catch (ClassCastException ex) {
            log.error("updateCurriculum error: " + ex.getMessage());
        }

        var clazz = liveClassRepo.findById(classId).orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));

        if (clazz.getTutor().getId() != userId) {
            throw new CommonException(ErrorCode.USER_NOT_ALLOWED);
        }

        var curriculumIndex = saveCurriculumDto.getCurriculumIndex();
        var curriculum = clazz.getCurriculum().get(curriculumIndex);
        var notification = saveCurriculumDto.getNotification();
        if (notification != null) {
            curriculum.setNotification(notification);
            liveClassRepo.save(clazz);
        }
        //common attach files
        var commonAttachFileDto = saveCurriculumDto.getCommonAttachFiles();
        List<PresignedUrlDto> resCommonAttFiles = new ArrayList<>();

        var commonAttachFile = commonFileRepo.findByClassInfo_IdAndCurriculumIndex(clazz.getId(), curriculumIndex)
            .orElse(new CurriculumCommonFile(clazz, curriculumIndex));

        if (commonAttachFileDto != null && !commonAttachFileDto.isEmpty()) {

            List<AttachedFile> files = commonAttachFile.getFiles();
            List<AttachedFile> existedFiles = new ArrayList<>();
            List<AttachedFile> newFiles = new ArrayList<>();

            commonAttachFileDto.forEach(f -> {
                if(f.getUrl() == null || Strings.isBlank(f.getUrl().toString())) {
                    var objectKey = String.format(COMMON_FILE_OBJECT, classId, curriculumIndex + 1,
                        System.currentTimeMillis() + UNDERSCORE + f.getFileName());
                    var commonFileUrl = storageService.getPresignedUrl(objectKey);

                    resCommonAttFiles.add(new PresignedUrlDto(commonFileUrl, f.getFileName()));

                    newFiles.add(new AttachedFile(f.getFileName(), objectKey));
                } else {
                    resCommonAttFiles.add(f);
                    existedFiles.add(new AttachedFile(f.getFileName(), storageService.getObjectKeyFromUrl(f.getUrl().toString())));
                }
            });

            if(!files.isEmpty()) {
                List<String> deleteObjectKeys = files.stream().filter(f -> !existedFiles.contains(f))
                    .map(AttachedFile::getObjectKey)
                    .collect(Collectors.toList());
                //Delete file in S3
                storageService.deleteObjectKeys(deleteObjectKeys);
            }

            res.setCommonAttachFiles(resCommonAttFiles);
            existedFiles.addAll(newFiles);
            commonAttachFile.setFiles(existedFiles);

        } else {
            if(!commonAttachFile.getFiles().isEmpty()) {
                //Delete file in S3
                storageService.deleteObjectKeys(commonAttachFile.getFiles().stream()
                    .map(AttachedFile::getObjectKey)
                    .collect(Collectors.toList()));
            }

            commonAttachFile.setFiles(Collections.EMPTY_LIST);
        }
        commonFileRepo.save(commonAttachFile);

        //attach file for student
        List<StudentAttachFile> studentAttachFiles = new ArrayList<>();
        for (var file : saveCurriculumDto.getAttachedFiles()) {
            List<PresignedUrlDto> resAttachFiles = new ArrayList<>();

            var currFiles = curriculumFileRepo
                .findByRecipientAndSender(file.getStudentId(), userId, classId, curriculumIndex)
                .orElse(new CurriculumAttachedFile(curriculumIndex, clazz,file.getStudentId(), userId));
            List<AttachedFile> files = currFiles.getFiles();
            List<AttachedFile> existedFiles = new ArrayList<>();
            List<AttachedFile> newFiles = new ArrayList<>();

            if(file.getAttachFiles() == null || file.getAttachFiles().isEmpty()) {
                if(!currFiles.getFiles().isEmpty()) {
                    //Delete file in S3
                    storageService.deleteObjectKeys(currFiles.getFiles().stream()
                        .map(AttachedFile::getObjectKey)
                        .collect(Collectors.toList()));
                }

                currFiles.setFiles(Collections.EMPTY_LIST);
                curriculumFileRepo.save(currFiles);

                continue;
            }

            file.getAttachFiles().forEach(f -> {
                if(f.getUrl() == null || Strings.isBlank(f.getUrl().toString())) {
                    var objectKey = String.format(ATTACHED_FILE_OBJECT, classId, curriculumIndex + 1,
                        file.getStudentId(), System.currentTimeMillis() + UNDERSCORE + f.getFileName());
                    var url = storageService.getPresignedUrl(objectKey);

                    resAttachFiles.add(new PresignedUrlDto(url, f.getFileName()));

                    newFiles.add(new AttachedFile(f.getFileName(), objectKey));
                } else {
                    resAttachFiles.add(f);
                    existedFiles.add(new AttachedFile(f.getFileName(), storageService.getObjectKeyFromUrl(f.getUrl().toString())));
                }
            });

            if(!files.isEmpty()) {
                List<String> deleteObjectKeys = files.stream().filter(f -> !existedFiles.contains(f))
                    .map(AttachedFile::getObjectKey)
                    .collect(Collectors.toList());
                //Delete file in S3
                storageService.deleteObjectKeys(deleteObjectKeys);
            }

            studentAttachFiles.add(new StudentAttachFile(file.getStudentId(), resAttachFiles));
            existedFiles.addAll(newFiles);
            currFiles.setFiles(existedFiles);

            curriculumFileRepo.save(currFiles);
        }

        res.setAttachFiles(studentAttachFiles);

        return res;
    }

    @DeleteMapping("/live-class/{classId}/{curriculumIndex}/attachedFile")
    @Transactional
    @ApiOperation(value="Api for 9-2-2 & 9-4-2 & 7-2-1 & 7-4-1 web main")
    public void deleteAttachedFile(@PathVariable long classId,
                                   @PathVariable int curriculumIndex,
                                   @RequestParam(required = false) Long recipientId,
                                   @RequestBody PresignedUrlDto file) {
        long userId = 0L;
        try {
            userId = authenticationFacade.getAuthentication().getUserId();
        } catch (ClassCastException ex) {
            log.error("deleteAttachedFile error: " + ex.getMessage());
        }

        User user = userRepository.findById(userId).orElseThrow(() -> new CommonException(ErrorCode.AUTH_TOKEN_USER_NOT_FOUND));

        CurriculumAttachedFile currFiles = null;

        if(user instanceof Student) {
            currFiles = curriculumFileRepo
                .findByRecipientAndSender(null, userId, classId, curriculumIndex)
                .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));

        } else if(user instanceof Tutor) {
            currFiles = curriculumFileRepo
                .findByRecipientAndSender(recipientId, userId, classId, curriculumIndex)
                .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));
        } else {
            throw new CommonException(ErrorCode.USER_NOT_ALLOWED);
        }

        String objectKey = storageService.getObjectKeyFromUrl(file.getUrl().toString());
        //Remove file info in DB
        List<AttachedFile> attachFiles = currFiles.getFiles().stream()
            .filter(f -> !(f.getFileName().equals(file.getFileName())
                &&f.getObjectKey().equals(objectKey)))
            .collect(Collectors.toList());

        currFiles.setFiles(attachFiles);
        curriculumFileRepo.save(currFiles);
        //Delete file in S3
        storageService.deleteObjectKeys(Arrays.asList(objectKey));
    }

    @DeleteMapping("/live-class/{classId}/{curriculumIndex}/commonFile")
    @Transactional
    @ApiOperation(value="Api for 9-2-2 & 9-4-2 web main")
    public void deleteCommonFile(@PathVariable long classId,
                                   @PathVariable int curriculumIndex,
                                   @RequestBody PresignedUrlDto file) {
        long userId = 0L;
        try {
            userId = authenticationFacade.getAuthentication().getUserId();
        } catch (ClassCastException ex) {
            log.error("deleteCommonFile error: " + ex.getMessage());
        }

        User user = userRepository.findById(userId).orElseThrow(() -> new CommonException(ErrorCode.AUTH_TOKEN_USER_NOT_FOUND));

        if(!(user instanceof Tutor)) {
            throw new CommonException(ErrorCode.USER_NOT_ALLOWED);
        }

        var commonAttachFile = commonFileRepo.findByClassInfo_IdAndCurriculumIndex(classId, curriculumIndex)
            .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));

        String objectKey = storageService.getObjectKeyFromUrl(file.getUrl().toString());
        //Remove file info in DB
        List<AttachedFile> attachFiles = commonAttachFile.getFiles().stream()
            .filter(f -> !(f.getFileName().equals(file.getFileName())
                &&f.getObjectKey().equals(objectKey)))
            .collect(Collectors.toList());

        commonAttachFile.setFiles(attachFiles);
        commonFileRepo.save(commonAttachFile);
        //Delete file in S3
        storageService.deleteObjectKeys(Arrays.asList(objectKey));
    }

    @PostMapping("/live-class/{classId}/{curriculumIndex}/commonFile")
    @Transactional
    @ApiOperation(value="Api add common file for 9-2-2 & 9-4-2 web main")
    public PresignedUrlDto addCommonFile(@PathVariable long classId,
                                           @PathVariable int curriculumIndex,
                                           @RequestParam String fileName) {
        long userId = 0L;
        try {
            userId = authenticationFacade.getAuthentication().getUserId();
        } catch (ClassCastException ex) {
            log.error("addCommonFile error: " + ex.getMessage());
        }

        User user = userRepository.findById(userId).orElseThrow(() -> new CommonException(ErrorCode.AUTH_TOKEN_USER_NOT_FOUND));

        if(!(user instanceof Tutor)) {
            throw new CommonException(ErrorCode.USER_NOT_ALLOWED);
        }

        Class classInfo = classRepo.findById(classId).orElseThrow(() -> new CommonException(ErrorCode.CLASS_NOT_FOUND));

        var currFiles = commonFileRepo.findByClassInfo_IdAndCurriculumIndex(classId, curriculumIndex)
            .orElse(new CurriculumCommonFile(classInfo, curriculumIndex));

        var objectKey = String.format(COMMON_FILE_OBJECT, classId, curriculumIndex + 1,
            System.currentTimeMillis() + UNDERSCORE + fileName);
        var url = storageService.getPresignedUrl(objectKey);

        currFiles.getFiles().add(new AttachedFile(fileName, objectKey));

        commonFileRepo.save(currFiles);

        return new PresignedUrlDto(url, fileName);
    }

    @PostMapping("/live-class/{classId}/{curriculumIndex}/attachedFile")
    @Transactional
    @ApiOperation(value="Api add attach file for 7-2-1 & 7-4-1 web main")
    public PresignedUrlDto addAttachedFile(@PathVariable long classId,
                                @PathVariable int curriculumIndex,
                                @RequestParam(required = false) Long recipientId,
                                @RequestParam String fileName) {
        long userId = 0L;
        try {
            userId = authenticationFacade.getAuthentication().getUserId();
        } catch (ClassCastException ex) {
            log.error("addAttachedFile error: " + ex.getMessage());
        }

        Class classInfo = classRepo.findById(classId).orElseThrow(() -> new CommonException(ErrorCode.CLASS_NOT_FOUND));

        CurriculumAttachedFile currFiles = curriculumFileRepo
            .findByRecipientAndSender(recipientId, userId, classId, curriculumIndex)
            .orElse(new CurriculumAttachedFile(curriculumIndex, classInfo, recipientId, userId));

        var objectKey = String.format(ATTACHED_FILE_OBJECT, classId, curriculumIndex + 1,
            userId, System.currentTimeMillis() + UNDERSCORE + fileName);
        var url = storageService.getPresignedUrl(objectKey);

        currFiles.getFiles().add(new AttachedFile(fileName, objectKey));

        curriculumFileRepo.save(currFiles);

        return new PresignedUrlDto(url, fileName);
    }

    @GetMapping("/attendance/{classId}")
    @ApiOperation(value = "Api for web admin 4-1-1")
    public List<AttendClassDto> getAttendClass(@PathVariable long classId) {
        authenticationFacade.assertAdmin();
        LiveClass liveClass = liveClassRepo.findById(classId)
                .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));

        return attendService.groupAttendByClass(liveClass);
    }

    @GetMapping(path = "/join/{classId}", produces = MediaType.TEXT_PLAIN_VALUE)
    public String attendLiveClass(@PathVariable long classId) {
        return zoomService.joinClass(classId);
    }

    @GetMapping("/change-week-history")
    @ApiOperation(value = "Api for web admin 4-2")
    public Page<AdBookTextModificationDto> getChangeWeek(@RequestParam(required = false) String optionSearch,
                                                         @RequestParam(required = false) String term,
                                                         Pageable page) {

        authenticationFacade.assertAdmin();
        String className = null;
        String classType = null;
        String tutorName = null;
        String reason = null;

        if ("className".equals(optionSearch)) {
            className = term;
            term = null;
        } else if ("classType".equals(optionSearch)) {
            if (ClassType.LIVE_BOOK.getKoreanLabel().contains(term)) {
                classType = "TextBookClass";
            } else {
                classType = "";
            }
            term = null;
        } else if ("tutorName".equals(optionSearch)) {
            tutorName = term;
            term = null;
        } else if ("reason".equals(optionSearch)) {
            reason = term;
            term = null;
        } else if (ClassType.LIVE_BOOK.getKoreanLabel().contains(term)) {
            classType = "TextBookClass";
            term = null;
        }

        return liveBookEditWeekHistoryRepo.findWithTerm(className, classType, tutorName,
            reason, term, page, AdBookTextModificationDto.class);
    }
}
