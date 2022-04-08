package com.mintpot.readingm.backend;

import com.github.javafaker.Faker;
import com.mintpot.readingm.api.rams.book.School;
import com.mintpot.readingm.api.rams.book.Grade;
import com.mintpot.readingm.backend.constant.Category;
import com.mintpot.readingm.backend.constant.ProbType;
import com.mintpot.readingm.backend.entity.*;
import com.mintpot.readingm.backend.entity.clazz.*;
import com.mintpot.readingm.backend.entity.constant.*;
import com.mintpot.readingm.backend.entity.embeddable.PayerInfo;
import com.mintpot.readingm.backend.entity.id.UserClassId;
import com.mintpot.readingm.backend.entity.notification.Notice;
import com.mintpot.readingm.backend.entity.settlement.AttendClass;
import com.mintpot.readingm.backend.entity.tutorApplication.TutorApplication;
import com.mintpot.readingm.backend.entity.user.Address;
import com.mintpot.readingm.backend.entity.user.Parent;
import com.mintpot.readingm.backend.entity.user.Student;
import com.mintpot.readingm.backend.entity.user.Tutor;
import com.mintpot.readingm.backend.repository.*;
import com.mintpot.readingm.backend.scheduled.SettlementSchedule;
import com.mintpot.readingm.backend.user.Role;
import com.mintpot.readingm.backend.user.User;
import com.mintpot.readingm.backend.user.UserRepository;
import com.mintpot.readingm.backend.user.UserStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.*;
import java.time.temporal.TemporalAdjusters;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Component
@Profile({"dev", "stg"})
@Log4j2
@RequiredArgsConstructor
public class MemDBInit implements CommandLineRunner {

    private final StudentRepository studentRepo;
    private final ParentRepository parentRepo;
    private final UserRepository userRepo;
    private final ClassRepository classRepo;
    private final ClassQARepository classQARepo;
    private final LiveClassRepository liveClassRepo;
    private final FaqRepository faqRepo;
    private final NoticeRepository noticeRepo;
    private final PaymentRepository paymentRepository;
    private final BannerRepository bannerRepository;
    private final CashRequirementRepository cashRequirementRepository;
    private final InquiryRepository inquiryRepo;
    private final ClassConsultationRepository classConsultationRepository;
    private final GoalClassApplicationRepository goalClassApplicationRepo;
    private final CouponRepository couponRepo;
    private final PointRepository pointRepo;
    private final MstConfigRepository mstConfigRepository;
    private final AttendClassRepository attendClassRepository;
    private final BookRepository bookRepo;
    private final CurriculumRepository curriRepo;
    private final NewspaperColumnRepository newspaperColumnRepo;
    private final SettlementSchedule settlementSchedule;
    private final BookQuizRepository bookQuizRepo;
    private final BranchRepository branchRepo;
    private final ScheduleRepository scheduleRepo;
    private final TextBookClassRepository textBookClassRepo;
    private final LiveBookEditWeekHistoryRepository liveBookEditWeekHistoryRepo;
    private final DavinciClassRepository davinciClassRepo;
    private final DavinciLogRepository davinciLogRepo;
    private final WithdrawalRepository withdrawalRepo;
    private final ClassReviewRepository classReviewRepo;
    private final TutorRepository tutorRepo;
    private final ClassCartRepository classCartRepo;
    private final EnrollmentRepository enrollmentRepo;
    private final PasswordEncoder passwordEncoder;
    private final TutorApplicationRepository tutorApplicationRepository;
    private final Faker krFaker;
    private final MagazineRepository magazineRepository;
    private final RefundRepository refundRepo;

    @Override
    @Transactional
    public void run(String... args) {

        log.info("================== BEGIN GENERATE FAKE DATA ====================");
/*
        var authorities = new ArrayList<GrantedAuthority>();
        authorities.add(new SimpleGrantedAuthority(Role.ADMIN.name()));
        var admin = new UserDetails(User.builder().email("admin@pii.com").password(passwordEncoder.encode("Aa"
                + "@12345")).build(), authorities);

        var secContext = SecurityContextHolder.createEmptyContext();
        secContext.setAuthentication(new UsernamePasswordAuthenticationToken(admin, "", admin.getAuthorities()));
        SecurityContextHolder.setContext(secContext);*/

        userGenerator(15);
        genNewspaperColumn(30);
        genBook(10);
        classGenerator(18);
        faqGen(10);
        noticesGen(10);
        generateClassQA();

        bannerGen(14);
        magazineGen(14);
        generatePayment();
        generateRefund();
        generateCashRequirement();
        generateInquiry(7, Role.PARENT);
        generateInquiry(7, Role.TUTOR);
        generateInquiry(7, Role.STUDENT);
        generateConsultation();
        generateGoalClassApplication();
        generateAttend();
        settlementSchedule.summarySettlementMonthly();
        generateCoupon();
        generatePoint();
        generateMstConfig();
        generateChangeWeek();
        genBranch();
        generateDavinciLog();
        generateWithdrawal();
        generateReview();
        generateCart();

        log.info("=================== FAKE DATA GEN COMPLETED ====================");
    }

    private void userGenerator(int usrNo) {
        final var encPswd = passwordEncoder.encode("Aa@12345");
        var address = krFaker.address();
        List<Tutor> tutors = new ArrayList<>();
        for (var i = 1; i <= usrNo / 3; i++) {
            TutorType tutorTye;
            if((i % 3) == 0) {
                tutorTye = TutorType.ALL;
            } else {
                tutorTye = TutorType.valueOf(i%3);
            }

            var tmpTutor = Tutor.builder()
                                .classSource(ClassSource.READINGM)
                                .email("user.test" + i + "@naver.com")
                                .password(encPswd)
                                .role(Role.TUTOR)
                                .name(krFaker.name().fullName())
                                .profileImageUrl("https://www.w3schools.com/w3css/img_avatar2.png")
                                .birth(LocalDate.now())
                                .gender(Gender.MALE)
                                .bank("Woori")
                                .bankAccount(krFaker.number().digit())
                                .tutorType(tutorTye)
                                .status(UserStatus.ACTIVATED)
                                .phone(krFaker.phoneNumber().phoneNumber().replace("-", ""))
                                .address(new Address(address.zipCode(),
                                                     address.streetName(),
                                                     address.streetAddressNumber()))
                                .bookTextIntroduction("Go with me!")
                                .build();

            tmpTutor.setMemberId("tutor.test" + i);
            tutors.add(userRepo.save(tmpTutor));
        }

        //generate application tutor
        Random random = new Random();
        List<TutorApplicationStatus> tutorApplicationStatuses = Arrays.asList(TutorApplicationStatus.values());
        List<TutorApplication> tutorApplications = tutors.stream().limit(6).map(t -> {
            TutorApplication tutorApplication = new TutorApplication();
            tutorApplication.setTutor(t);
            tutorApplication.setStatus(tutorApplicationStatuses.get(random.nextInt(TutorApplicationStatus.values().length)));

            return tutorApplication;
        }).collect(Collectors.toList());

        tutorApplicationRepository.saveAll(tutorApplications);

        List<Parent> parentList = new ArrayList<>();

        for (var i = usrNo / 3 + 1; i <= usrNo; i++) {
            var student = Student.builder()
                                 .email("user.test" + i + "@naver.com")
                                 .classSource(ClassSource.READINGM)
                                 .password(encPswd)
                                 .role(Role.STUDENT)
                                 .clazz(School.ELEMENTARY)
                                 .name(krFaker.name().fullName())
                                 .status(UserStatus.ACTIVATED)
                                 .grade(4)
                                 .school("school")
                                 .phone(krFaker.phoneNumber().phoneNumber().replace("-", ""))
                                 .address(new Address(address.zipCode(),
                                                      address.streetName(),
                                                      address.streetAddressNumber()))
                                 .build();

            student.setMemberId("student.test" + i);

            Parent parent = Parent.builder()
                                  .classSource(ClassSource.READINGM)
                                  .password(encPswd)
                                  .role(Role.PARENT)
                                  .name(krFaker.name().fullName())
                                  .status(UserStatus.ACTIVATED)
                                  .phone(krFaker.phoneNumber().phoneNumber().replace("-", ""))
                                  .address(student.getAddress())
                                  .build();

            parentList.add(parent);
            student.setParent(parent);
            userRepo.save(student);
        }

        for (int i = 0; i < parentList.size(); i++) {
            Parent parent = parentList.get(i);
            parent.setEmail("user.test" + (usrNo + i + 1) + "@naver.com");
            parent.setMemberId("parent.test" + (usrNo + i + 1));
        }
        userRepo.saveAll(parentList);
        var admin = User.builder()
                .email("admin@readingm.com")
                .password(encPswd)
                .role(Role.ADMIN)
                .status(UserStatus.ACTIVATED)
                .phone(krFaker.phoneNumber().phoneNumber().replace("-", ""))
                .memberId("admin")
                .name("admin")
                .build();

        userRepo.save(admin);
    }

    private void classGenerator(int classNo) {
        Random random = new Random();
        List<Student> stdList = studentRepo.findAll()
                .stream()
                .filter(std -> std.getStatus() == UserStatus.ACTIVATED)
                .collect(Collectors.toList());

        stdList = stdList.subList(0, Math.min(stdList.size(), 5));
        List<Tutor> tutors = tutorRepo.findAll();

        for (var i = 1; i <= classNo / 3; i++) {

            var curriculum = generateCurriculum(ClassType.LIVE_BOOK);
            var clazz = TextBookClass.builder()
                                     .name(krFaker.educator().course())
                                     .materials("aaa")
                                     .guide("bbbb")
                                     .tutor(tutors.get(i > tutors.size() ? 0 : i - 1))
                                     .tuitionFee(krFaker.number().numberBetween(150, 500) * 1000)
                                     .source(ClassSource.READINGM)
                                     .status(ClassStatus.SHOW)
                                     .openDate(curriculum.get(0).getStart().toLocalDate())
                                     .curriculum(curriculum)
                                     .build();

            clazz.setTargetStudentGrade(SchoolGrade.values()[random.nextInt(SchoolGrade.values().length)]);
            clazz.setStdNo(25);
            clazz.setStudents(new HashSet<>(stdList));
            classRepo.save(clazz);
        }

        for (var i = 1; i <= classNo / 3; i++) {
            var curiculum = (List<GoalCurriculum>) (List<?>) generateCurriculum(ClassType.LIVE_GOAL);
            var clazz = GoalClass.builder()
                                 .name(krFaker.educator().course())
                                 .materials("aaa")
                                 .guide("bbbb")
                                 .tutor(tutors.get(i > tutors.size() ? 0 : i - 1))
                                 .tuitionFee(krFaker.number().numberBetween(150, 500) * 1000)
                                 .source(ClassSource.READINGM)
                                 .category(GoalClassCategory.ESSAY)
                                 .introduction("Fly to the moon!")
                                 .openDate(curiculum.get(0).getStart().toLocalDate())
                                 .curriculum(curiculum)
                                 .status(ClassStatus.SHOW)
                                 .build();
            clazz.setStdNo(25);
            clazz.setStudents(new HashSet<>(stdList));
            classRepo.save(clazz);
        }

        var videos = new ArrayList<Video>();
        var video = new Video();
        video.setName("Prime number");
        video.setVideoUrl("https://www.youtube.com/watch?v=UNvwXoTwmvg");
        video.setFee(10000);
        video.setTime(6L);
        videos.add(video);

        video = new Video();
        video.setName("Prime Factorization Explained!");
        video.setVideoUrl("https://www.youtube.com/watch?v=KpEyLdXukAA");
        video.setFee(15000);
        video.setTime(11);
        videos.add(video);

        for (var i = 1; i <= classNo / 3; i++) {
            var clazz = DavinciClass.builder()
                    .name(krFaker.educator().course())
                    .materials("laptop")
                    .openDate(
                            Instant.ofEpochMilli(krFaker.date()
                                    .future(2, TimeUnit.DAYS, new Date())
                                    .getTime()
                            )
                                    .atZone(
                                            ZoneId.systemDefault())
                                    .toLocalDate().plusWeeks(i-1))
                    .tuitionFee(krFaker.number().numberBetween(40, 45) * 500)
                    .videos(videos)
                    .source(ClassSource.READINGM)
                    .status(ClassStatus.SHOW)
                    .students(new HashSet<>(stdList))
                    .intro("Best choice!")
                    .grade("초등학교 6학년")
                    .deleteFlg(false)
                    .build();

            classRepo.save(clazz);
        }

    }

    private void generateClassQA() {
        var classes = liveClassRepo.findAll();
        Random random = new Random();

        classes.forEach(c -> {
            var students = c.getStudents();
            students.stream().limit(10).forEach(std -> {
                var hasAnswer = random.nextInt() % 10 > 5;
                var classQA = ClassQA.builder()
                    .title(krFaker.lorem().sentence())
                    .content(krFaker.lorem().paragraph())
                    .answer(hasAnswer ? krFaker.lorem().sentence() : null)
                    .isSecret(random.nextInt(10) < 3)
                    .student(std)
                    .clazz(c)
                    .build();

                classQARepo.save(classQA);
            });
        });
    }

    private void faqGen(int faqNo) {
        for (var i = 0; i < faqNo; i++) {
            var faq = Faq.builder().question(krFaker.lorem().sentence()).answer(krFaker.lorem().paragraph()).build();
            faqRepo.save(faq);
        }
    }

    private void bannerGen(int bannerNo) {
        for (var i = 0; i < bannerNo; i++) {
            var banner = Banner.builder()
                               .name(krFaker.name().name())
                               .imagePc(krFaker.avatar().image())
                               .imageMb(krFaker.avatar().image())
                               .orderBanner(krFaker.number().numberBetween(0, 9))
                               .build();
            bannerRepository.save(banner);
        }
    }

    private void noticesGen(int no) {
        var nonDelNotices = new HashMap<String, String>();
        nonDelNotices.put("LiveClass 리딩엠 플랫폼", "<p>This is a LiveClass 리딩엠 플랫폼 paragraph.</p>");
        nonDelNotices.put("리딩엠 이벤트", "<p>This is a 리딩엠 이벤트 paragraph.</p>");
        nonDelNotices.put("지도교사 선발과정", "<p>This is a 지도교사 선발과정 paragraph.</p>");
        nonDelNotices.put("LiveClass 안내", "<p>This is a LiveClass 안내 paragraph.</p>");
        nonDelNotices.forEach((title, content) -> {
            var notice =
                    Notice.builder()
                          .content(content)
                          .title(title)
                          .notAllowedDelete(true)
                          .build();
            noticeRepo.save(notice);
        });

        for (var i = 0; i < no; i++) {
            var notice =
                    Notice.builder()
                          .content(krFaker.lorem().paragraph())
                          .title(krFaker.lorem().sentence())
                          .build();

            noticeRepo.save(notice);
        }

    }

    private void magazineGen(int no) {
        for (var i = 0; i < no; i++) {
            var magazine =
                Magazine.builder()
                    .file("file " + i)
                    .imageMb("https://www.w3schools.com/w3css/img_avatar1.png")
                    .imagePc("https://www.w3schools.com/w3css/img_avatar2.png")
                    .title(krFaker.lorem().sentence())
                    .build();

            magazineRepository.save(magazine);
        }
    }

    private void generatePayment() {

        classRepo.findAll().stream()
                .filter(clazz -> clazz instanceof  VodClass
                        || ((LiveClass) clazz).getTutor().getId() == 1L
                )
                .forEach(clazz -> {
                    clazz.getStudents().stream().forEach(std -> {
                        Payment payment = new Payment();
                        payment.setChildren(std);
                        var parent = std.getParent();
                        payment.setPayer(parent);
                        var payerInfo = new PayerInfo();
                        payerInfo.setEmail(parent.getEmail());
                        payerInfo.setName(parent.getName());
                        payerInfo.setPhone(parent.getPhone());
                        payment.setPayerInfo(payerInfo);

                        if (clazz instanceof TextBookClass) {
                            payment.setClassType(ClassType.LIVE_BOOK);
                        } else if (clazz instanceof GoalClass) {
                            payment.setClassType(ClassType.LIVE_GOAL);
                        } else if(clazz instanceof  VodClass) {
                            payment.setClassType(ClassType.MATHEMATICS);

                            LocalDate dateNow = LocalDate.now();
                            for(var i=0; i< ((VodClass) clazz).getVideos().size(); i++) {
                                Enrollment enrollment = new Enrollment();

                                enrollment.setCourseIndex(i);
                                enrollment.setVodClass((VodClass)clazz);
                                enrollment.setStudent(std);
                                enrollment.setStatus(CourseStatus.PRE_COURSE);
                                enrollment.setPaymentDate(dateNow);

                                enrollmentRepo.save(enrollment);
                            }
                        }

                        payment.setMethod(PaymentMethod.BANK_TRANSFER);
                        payment.setClassInformation(clazz);
                        payment.setAmount((int) clazz.getTuitionFee());
                        payment.setFinalAmount(payment.getAmount());
                        payment.setOrderId(UUID.randomUUID().toString());
                        payment.setStatus(PaymentStatus.COMPLETED);
                        paymentRepository.save(payment);
                    });
                });

    }

    private void generateRefund() {
        classRepo.findAll().stream().limit(5).forEach(clazz -> {
            paymentRepository.findPaymentByClass(clazz.getId())
                    .stream().limit(5).forEach(payment -> {
                        var refund = new Refund();
                        refund.setStatus(RefundStatus.REFUND_REQUEST);
                        refund.setPayment(payment);
                        refund.setAmount(payment.getFinalAmount());
                        refund.setMethod(PaymentMethod.BANK_TRANSFER);
                        refund.setReason("I feel it not good");
                        refundRepo.save(refund);
                    });
        });
    }

    private void generateCashRequirement() {
        Random random = new Random();
        parentRepo.findAll().stream().limit(5).forEach(parent -> {
            CashRequirement cash = new CashRequirement();
            cash.setAccountName(parent.getName());
            cash.setStatus(CashStatus.CASH_REQUEST);
            cash.setAccountNumber(String.valueOf(random.nextInt(100) + 1000000));
            cash.setBank("Woori");
            cash.setUser(parent);
            cash.setPoint((random.nextInt(150) + 10) * 1000);
            cashRequirementRepository.save(cash);
        });

    }

    private void generateInquiry(int no, Role role) {
        List<?> user = new ArrayList<>();
        if(role == Role.TUTOR) {
            user = userRepo.findByRole(role, Tutor.class);
        } else if(role == Role.STUDENT){
            user = userRepo.findByRole(role, Student.class);
        } else {
            user = userRepo.findByRole(role, Parent.class);
        }

        Random random = new Random();
        user.stream().limit(2).forEach(u -> {

            for (int i = 0; i < no; i++) {
                Boolean isAnswer = random.nextBoolean();
                inquiryRepo.save(Inquiry.builder()
                    .title(krFaker.lorem().sentence())
                    .question(krFaker.lorem().paragraph())
                    .status(isAnswer ? InquiryStatus.ANSWERED : InquiryStatus.UNANSWERED)
                    .type(InquiryType.values()[random.nextInt(InquiryType.values().length)])
                    .questioner((User) u)
                    .answer(isAnswer ? krFaker.lorem().paragraph() : "")
                    .build());
            }
        });

    }

    private void generateConsultation() {
        liveClassRepo.findAll().stream().limit(3).forEach(c -> {
            Set<Student> students = c.getStudents();
            if (students != null) {
                students.forEach(std -> classConsultationRepository.save(
                        ClassConsultation.builder()
                                         .title(c.getName())
                                         .questioner(std.getParent())
                                         .question("Hello, what your name!")
                                         .respondent(c.getTutor())
                                         .status(QuestionStatus.WAITING)
                                         .student(std)
                                         .classInfo(c)
                                         .build()
                ));
            }
        });
    }

    private void generateGoalClassApplication() {
        parentRepo.findAll().stream().limit(2).forEach(parent -> {
            var application = new GoalClassApplication();
            application.setApplicant(parent);
            application.setTitle("I will apply for this class");
            application.setRequest("Please open this class.");
            application.setCategory(GoalClassCategory.ESSAY);
            application.setStatus(QuestionStatus.WAITING);
            goalClassApplicationRepo.save(application);
        });

    }

    private void generateCoupon() {
        Coupon coupon = new Coupon();
        coupon.setName("Unlimited coupon");
        coupon.setAmount(50000);
        coupon.setIssuingMode(IssuingMode.ALL);
        coupon.setStartValidDate(LocalDate.now());
        coupon.setEndValidDate(LocalDate.now().plusMonths(3));
        Coupon liveGoalCoupon = new Coupon();
        liveGoalCoupon.setClassType(ClassType.LIVE_GOAL);
        liveGoalCoupon.setName("Live goal coupon");
        liveGoalCoupon.setStartValidDate(LocalDate.now());
        liveGoalCoupon.setEndValidDate(LocalDate.now().plusMonths(6));
        liveGoalCoupon.setIssuingMode(IssuingMode.SELECT);
        liveGoalCoupon.setAmount(15000);
        
        Coupon liveTextCoupon = new Coupon();
        liveTextCoupon.setClassType(ClassType.LIVE_BOOK);
        liveTextCoupon.setName("Live book text coupon");
        liveTextCoupon.setStartValidDate(LocalDate.now());
        liveTextCoupon.setEndValidDate(LocalDate.now().plusMonths(6));
        liveTextCoupon.setIssuingMode(IssuingMode.SELECT);
        liveTextCoupon.setAmount(15000);

        Coupon davinCoupon = new Coupon();
        davinCoupon.setClassType(ClassType.MATHEMATICS);
        davinCoupon.setName("Davinci coupon");
        davinCoupon.setStartValidDate(LocalDate.now());
        davinCoupon.setEndValidDate(LocalDate.now().plusMonths(6));
        davinCoupon.setIssuingMode(IssuingMode.SELECT);
        davinCoupon.setAmount(10000);
        
        Set<Parent> members = new HashSet<>();
        parentRepo.findAll().stream()
                .filter(parent -> parent.getStatus() == UserStatus.ACTIVATED)
                .limit(4)
                .forEach(members::add);
        liveGoalCoupon.setMembers(members);
        liveTextCoupon.setMembers(members);
        davinCoupon.setMembers(members);
        couponRepo.save(coupon);
        couponRepo.save(liveGoalCoupon);
        couponRepo.save(liveTextCoupon);
        couponRepo.save(davinCoupon);
    }

    private void generatePoint() {
        parentRepo.findAll().stream().limit(2)
                .filter(parent -> parent.getStatus() == UserStatus.ACTIVATED)
                .forEach(parent -> {
            Point eventPoint = new Point();
            Point cashPoint = new Point();
            eventPoint.setAction(PointAction.PROVIDE);
            eventPoint.setName("Point provided for new member");
            eventPoint.setType(PointType.EVENT_POINT);
            eventPoint.setIssuingMode(IssuingMode.SELECT);
            eventPoint.setStartValidDate(LocalDate.now());
            eventPoint.setEndValidDate(LocalDate.now().plusMonths(6));
            eventPoint.setAmount(5000);

            cashPoint.setAction(PointAction.PROVIDE);
            cashPoint.setName("Point");
            cashPoint.setType(PointType.CASH_POINT);
            cashPoint.setIssuingMode(IssuingMode.SELECT);
            cashPoint.setStartValidDate(LocalDate.now());
            cashPoint.setEndValidDate(LocalDate.now().plusYears(3));
            cashPoint.setAmount(20000);

            Set<Parent> parents = new HashSet<>();
            parents.add(parent);
            eventPoint.setMembers(parents);
            cashPoint.setMembers(parents);
            pointRepo.save(eventPoint);
            pointRepo.save(cashPoint);
        });
    }

    private void generateMstConfig() {
        var mstConfig = MstConfig.builder()
                                 .configKey("BookPurchasingURL")
                                 .configValue("https://www.aladin.co.kr/home/welcome.aspx")
                                 .description("url in book management function (web admin 5-1)")
                                 .build();

        mstConfigRepository.save(mstConfig);
        mstConfig = MstConfig.builder()
                    .configKey("main_popup_video_url")
                    .configValue("https://www.youtube.com/embed/3aX2zkh4OdM")
                    .build();

        mstConfigRepository.save(mstConfig);

        mstConfig = MstConfig.builder()
                .configKey("video_register")
                .configValue("https://www.youtube.com/embed/3aX2zkh4OdM")
                .build();

        mstConfigRepository.save(mstConfig);
    }

    private void generateAttend() {
        for (var liveClass : liveClassRepo.findAll()) {
            List<AttendClass> attendClassList = new ArrayList<>();
            long lessonIndex = 0;
            for (var curriculum : liveClass.getCurriculum()) {
                if (curriculum.getStart().isAfter(LocalDateTime.now())) {
                    continue;
                }
                AttendClass attendClass = new AttendClass();
                attendClass.setStartTime(curriculum.getStart());
                attendClass.setEndTime(curriculum.getEnd());
                attendClass.setParticipant(liveClass.getTutor());
                attendClass.setIsPresent(true);
                attendClass.setLiveClass(liveClass);
                attendClass.setLessonIndex(lessonIndex);
                attendClassList.add(attendClass);
                Random random = new Random();

                for (var std : liveClass.getStudents()) {
                    attendClass = new AttendClass();
                    attendClass.setLiveClass(liveClass);
                    attendClass.setParticipant(std);
                    attendClass.setStartTime(curriculum.getStart());
                    attendClass.setEndTime(curriculum.getEnd());
                    attendClass.setLessonIndex(lessonIndex);
                    int i = random.nextInt(100);
                    attendClass.setIsPresent(i >= 15);
                    attendClassList.add(attendClass);
                }
                lessonIndex++;
            }

            attendClassRepository.saveAll(attendClassList);
        }
    }

    private void genBook(int bookCnt) {
        for (var i = 0; i < bookCnt; i++) {
            var fkBook = krFaker.book();
            var book = Book.builder()
                           .idx(String.valueOf(i + 1))
                           .week(1)
                           .clazz(School.ELEMENTARY)
                           .grade(Grade.GRADE_0)
                           .title(fkBook.title())
                           .publisher(fkBook.publisher())
                           .image("https://rams.readingm.com/image/bookdata/0/9788955821864.jpg")
                           .writer(fkBook.author())
                           .activitypaperS1(
                                   "https://rams.readingm.com/teacher/classmaterial/activitypaper/data/0/9788955821864_0.pdf")
                           .activitypaperT1(
                                   "https://rams.readingm.com/teacher/classmaterial/activitypaper/data/0/9788955821864_teacher.pdf")
                           .build();
            bookRepo.save(book);
            genCurriculum(book.getIdx());
        }
    }

    private void genCurriculum(String bookId) {
        final var CURRICULUM_COUNT = 6; //curriculum count for 1 book
        for (var i = 0; i < CURRICULUM_COUNT; i++) {
            var curriculum = Curriculum.builder()
                                       .cBookidx(String.valueOf(bookId))
                                       .cGrade(Grade.GRADE_1)
                                       .cClass(School.ELEMENTARY)
                                       .cCategory(Category.M_BASIC_W)
                                       .cBranch("0")
                                       .cIdx(String.valueOf(i + 1))
                                       .cBookidx("1")
                                       .build();

            curriRepo.save(curriculum);
        }

    }

    private void genNewspaperColumn(int num) {
        String[] fields = new String[]{"인문", "사회", "과학", "기술", "예술", "언어", "생활"};
        Random random = new Random();

        for (var i = 0; i < num; i++) {
            var nColumn = NewspaperColumn.builder()
                                         .cIdx(String.valueOf(i + 1))
                                         .cNewsdate(LocalDate.now())
                                         .cCompany(krFaker.company().name())
                                         .cSubject(fields[random.nextInt(fields.length)])
                                         .cTitle(krFaker.book().title())
                                         .cFile("https://rams.readingm.com/teacher/classmaterial/column/data/%ED%83%88%ED%83%84%EC%86%8C%20%EC%A0%84%EC%9F%81%EC%9D%98%20%EC%8B%9C%EC%9E%91.pdf")
                                         .build();

            newspaperColumnRepo.save(nColumn);
        }
    }

    private void genBookQuiz(Book book) {
        final var QUIZ_COUNT = 10;
        for (var i = 0; i < QUIZ_COUNT; i++) {

            List<Prob> probs = new ArrayList<>();
            for (var j = 0; j < 2; j++) {
                var prob = Prob.builder()
                               .pMunje(krFaker.lorem().sentence())
                               .pBunho("1")
                               .pType(ProbType.MULTIPLE_CHOICE)
                               .pBogi1("A")
                               .pBogi2("B")
                               .pBogi3("C")
                               .pBogi4("D")
                               .pBogi5("")
                               .pPageSt("14")
                               .pPageEn("16")
                               .pJungdab("4")
                               .pPuli("일기쓰기'입니다.")
                               .pHint("").build();
                probs.add(prob);
            }

            var quiz = BookQuiz.builder()
                               .bIdx(book.getIdx())
                               .bTitle(book.getTitle())
                               .bWriter(book.getWriter())
                               .bPublisher(book.getPublisher())
                               .bQzCount(String.valueOf(QUIZ_COUNT))
                               .bQzGaCount(String.valueOf(QUIZ_COUNT))
                               .bQzJuCount(String.valueOf(QUIZ_COUNT))
                               .bTargetgrade("고등일반")
                               .bClass("기타")
                               .prob(probs)
                               .build();
            bookQuizRepo.save(quiz);
        }
    }

    /*private void genMagazine() {
        for (var i = 0; i < 10; i++) {
            var mag = Magazine.builder().mIdx(String.valueOf(i + 1)).mTitle(krFaker.book().title()).mFile(
                    "https://rams.readingm.com/magazine/data/매거진2020도곡점-겨울호(합본)201116s.pdf").mImage(
                    "https://rams.readingm.com/magazine/data/2020겨울호_도곡.jpg").build();

            magRepo.save(mag);
        }
    }*/

    private void genBranch() {
        for (var i = 0; i < 10; i++) {
            var branch = Branch.builder()
                               .bIdx(String.valueOf(i + 1))
                               .bTitle(krFaker.company().name())
                               .bTel(krFaker.phoneNumber().phoneNumber())
                               .build();
            branchRepo.save(branch);
        }
    }

    private void genScheduleList() {
        for (var i = 0; i < 10; i++) {
            var schedule = Schedule.builder()
                                   .sIdx(String.valueOf(i + 1))
                                   .sBranch("1")
                                   .sTimeindex("6")
                                   .sTime("2:30")
                                   .sTeacher("1")
                                   .sBook("1")
                                   .sClass(School.ELEMENTARY)
                                   .sGrade("5")
                                   .sCategory(Category.M_BASIC_W)
                                   .sPurposetitle("")
                                   .sDate(LocalDate.now())
                                   .build();

            scheduleRepo.save(schedule);
        }
    }

    private void generateReview() {
        String[] contents = new String[]{"Funny", "Boring", "Good", "Class is so interesting"};
        Random random = new Random();
        classRepo.findAll().forEach(c -> {
            c.getStudents().stream().limit(5).forEach(std -> {
                ClassReview review = new ClassReview();
                review.setId(new UserClassId(std.getId(), c.getId()));
                review.setWriter(std);
                review.setClassInfo(c);
                review.setStatus(ShowStatus.SHOW);
                review.setContent(contents[random.nextInt(contents.length)]);
                review.setRating(review.getContent().equals("Boring") ? 2 : random.nextInt(3) + 3);
                classReviewRepo.save(review);
            });
        });
    }
    private void generateChangeWeek() {
        textBookClassRepo.findAll().stream().limit(3).forEach(c -> {
            var changeWeek = LiveBookEditWeekHistory.builder()
                    .classId(c.getId())
                    .tutorId(c.getTutor().getId())
                    .reason("epidemic")
                    .build();

            liveBookEditWeekHistoryRepo.save(changeWeek);
        });
    }

    private void generateDavinciLog() {
        Map<Long, String> ipMap = new HashMap<>();
        studentRepo.findAll().forEach(std -> {
            ipMap.put(std.getId(), krFaker.internet().ipV4Address());
        });

        davinciClassRepo.findAll().forEach(c -> {
            c.getStudents().stream().limit(5).forEach(std -> {
                var log = DavinciLog.builder()
                        .lectureName(c.getName())
                        .lectureTitle(c.getIntro())
                        .classId(c.getId())
                        .studentId(std.getId())
                        .ip(ipMap.get(std.getId()))
                        .build();

                davinciLogRepo.save(log);
            });
        }) ;
    }

    private void generateWithdrawal() {
        List<Parent> parentList = new ArrayList<>();
        final var encPswd = passwordEncoder.encode("Aa@12345");

        for (var i = 1; i <= 5; i++) {
            var student = Student.builder()
                    .email("user.withdraw.test" + i + "@naver.com")
                    .password(encPswd)
                    .role(Role.STUDENT)
                    .name(krFaker.name().fullName())
                    .status(UserStatus.UNACTIVATED)
                    .grade(4)
                    .school("school")
                    .phone(krFaker.phoneNumber().phoneNumber().replace("-", ""))
                    .memberId("student.withdraw.test" + i)
                    .build();

            Parent parent = Parent.builder()
                    .password(encPswd)
                    .role(Role.PARENT)
                    .name(krFaker.name().fullName())
                    .status(UserStatus.UNACTIVATED)
                    .phone(krFaker.phoneNumber().phoneNumber().replace("-", ""))
                    .email("user.withdraw.test" + (i+10) + "@naver.com")
                    .memberId("parent.withdraw.test" + (i+10))
                    .build();

            parentList.add(parent);
            student.setParent(parent);
            userRepo.save(student);
        }

        userRepo.saveAll(parentList);
        userRepo.findAll().forEach(user -> {
            var role = user.getRole();
            if ( role != Role.ADMIN && (role == Role.TUTOR || user.getStatus() == UserStatus.UNACTIVATED)) {
                var withdrawal = new Withdrawal();
                withdrawal.setWithdrawalPerson(user);
                withdrawal.setReason("test");
                withdrawal.setStatus(role == Role.TUTOR ? WithdrawalStatus.WAITING : WithdrawalStatus.COMPLETED);
                withdrawalRepo.save(withdrawal);
            }
        });
    }

    private List<TextBookCurriculum> generateCurriculum(ClassType classType) {
        Random random = new Random();
        List<TextBookCurriculum> curriculumList = new ArrayList<>();
//        var lastMonth = LocalDate.now().minusMonths(1);
        var lastMonth = LocalDate.now().plusMonths(1);
        LocalDate day = lastMonth.with(TemporalAdjusters
                        .firstInMonth(DayOfWeek.values()[random.nextInt(5)]));

        var lastDayOfLastMonth = lastMonth.with(TemporalAdjusters.lastDayOfMonth());
        List<Book> books = bookRepo.findAll();
        List<NewspaperColumn> news = newspaperColumnRepo.findAll();

        int week = 1;
        int i = 0;
        while (day.compareTo(lastDayOfLastMonth) <= 0) {

            var curriculum = classType == ClassType.LIVE_BOOK ? new TextBookCurriculum() : new GoalCurriculum();
            curriculum.setContent("week " + week);
            curriculum.setMaterial("laptop");
            curriculum.setStart(LocalDateTime.of(day, LocalTime.of(8, 30)));
            curriculum.setEnd(LocalDateTime.of(day, LocalTime.of(10, 0)));
            curriculum.setNotification("on time!");
            if (curriculum instanceof GoalCurriculum) {
                ((GoalCurriculum) curriculum).setName("Lesson " + week);
            } else {
                curriculum.setBookId(books.get(random.nextInt(books.size())).getIdx());
                curriculum.setNewPaperId(news.get(random.nextInt(news.size())).getCIdx());
            }
            curriculumList.add(curriculum);
            day = day.plusDays(7);
            week++;
            if(classType == ClassType.LIVE_GOAL) {
                ((GoalCurriculum) curriculum).setName("name_" + i);
                i++;
            }
        }

        return curriculumList;
    }

    private void generateCart() {
        var classes = liveClassRepo.findAll();
        Random random = new Random();
        var students = studentRepo.findAll();
        var parents = parentRepo.findAll();

        classes.stream().limit(5).forEach(c -> {
            if(random.nextBoolean()) {
                students.stream().limit(3).forEach(std -> {

                    ClassCart classCart = new ClassCart();
                    classCart.setId(new UserClassId(std.getId(), c.getId()));
                    classCart.setClassInfo(c);

                    if (!classCartRepo.findById(classCart.getId()).isPresent()) {
                        classCartRepo.save(classCart);
                    }
                });
            } else {
                parents.stream().limit(3).forEach(std -> {

                    ClassCart classCart = new ClassCart();
                    classCart.setId(new UserClassId(std.getId(), c.getId()));
                    classCart.setClassInfo(c);

                    if (!classCartRepo.findById(classCart.getId()).isPresent()) {
                        classCartRepo.save(classCart);
                    }
                });
            }

        });
    }
}
