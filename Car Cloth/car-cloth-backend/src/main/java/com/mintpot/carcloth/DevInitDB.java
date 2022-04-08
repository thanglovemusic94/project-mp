package com.mintpot.carcloth;

import com.github.javafaker.Faker;
import com.mintpot.carcloth.constant.*;
import com.mintpot.carcloth.constant.enums.*;
import com.mintpot.carcloth.entity.*;
import com.mintpot.carcloth.entity.car.Brand;
import com.mintpot.carcloth.entity.car.CarType;
import com.mintpot.carcloth.entity.car.Category;
import com.mintpot.carcloth.entity.car.Model;
import com.mintpot.carcloth.entity.embeddable.*;
import com.mintpot.carcloth.entity.transaction.*;
import com.mintpot.carcloth.repository.*;
import com.mintpot.carcloth.scheduling.QuartzJobScheduler;
import com.mintpot.carcloth.utils.StorageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.io.IOUtils;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Component
@Profile({"dev"})
@Log4j2
@RequiredArgsConstructor
public class DevInitDB implements CommandLineRunner {

    private final UserRepository userRepository;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final CompanyRepository companyRepository;
    private final CategoryRepository categoryRepository;
    private final BrandRepository brandRepository;
    private final ModelRepository modelRepository;
    private final CarTypeRepository carTypeRepository;
    private final FAQRepository faqRepo;
    private final NotificationRepository notificationRepo;
    private final CompanyGroupRepository companyGroupRepo;
    private final ConstructionReviewRepository reviewRepo;
    private final CompanyQuoteRepository quotationRepo;
    private final TransactionRepository transactionRepo;
    private final ConstructionExampleRepository constructionExampleRepo;
    private final BannerRepository bannerRepo;
    private final AppNoticeRepository appNoticeRepo;
    private final QuartzJobRepository quartzJobRepo;
    private final QuartzJobScheduler quartzJobScheduler;
    private final Faker krFaker;
    private final Random random = new Random();
    private final StorageService storageService;
    private static String[] ICON_CATEGORY = {"category/ppf.png", "category/polish.png",
            "category/wrapping.png", "category/black_box.png", "category/new_car_package.png",
            "category/tinting.png", "category/glass_film.png", "category/windshield.png"};

    @Override
    public void run(String... args) throws Exception {
        log.info("================== BEGIN GENERATE FAKE DATA ====================");
        generateCategory();
        generatePoint(15);
        generateBrand();
        generateModel(3);
        generateCarType(5);
        generateUsersCompanies(15);
        generateFaq(15);
        generateNotices(15);
        generateQuotation(15);
        generateConstructionExample(15);
        generateReview(15);
        generateBanner();
        quartzJobScheduler.loadJob();
        log.info("================== FINISH GENERATE FAKE DATA ====================");
    }

    private void generateCarType(int carNumber) throws Exception {
        Random random = new Random();
        List<Model> model = modelRepository.findAll();
        //Init image car-type
        Resource resource = new ClassPathResource("init-data/car-type/car-type.png" );
        if(resource != null && resource.exists()) {
            byte[] bytes = IOUtils.toByteArray(resource.getInputStream());
            storageService.upload(bytes, "car-type/car-type.png", true);
        }

        for(var i = 0; i < model.size(); i++) {
            for(var j = 1; j < carNumber; j++) {
                CarType carType = CarType.builder()
                        .brand(model.get(i).getModelBrand())
                        .model(model.get(i))
                        .name(j + "세대(15~18년)")
                        .productType(EProductType.valueOf(random.nextInt(1)))
                        .attachFile(new FileInfo("car-type.png","car-type/car-type.png"))
                        .deleteFlg(false)
                        .build();

                carTypeRepository.save(carType);
            }
        }
    }

    private void generateModel(int modelNumber) {
        List<Brand> brands = brandRepository.findAll();
        for(var i = 0; i < brands.size(); i++) {
            for (var j = 1; j <= modelNumber; j++) {
                Model model = Model.builder()
                        .modelBrand(brands.get(i))
                        .modelName(brands.get(i).getBrandName() + j)
                        .build();

                modelRepository.save(model);
            }
        }
    }

    private void generateBrand() throws Exception {
        List<Category> category = categoryRepository.findAll();
        List<String> brands = Arrays.asList("기아", "도요타", "현대", "3M",
                "AVERY", "CYS", "HEXIS", "INOZETEK", "MACTAC", "ORACAL", "TEXKWRAP",
                "VinFast", "Tesla", "BMW", "Ferrari", "Porsche", "Honda", "Lamborghini",
                "Bentley", "Maserati", "Audi", "Jeep", "Subaru", "Cadillac", "Mazda", "Jaguar",
                "Nissan", "Bugatti", "Lexus", "Suzuki", "Mitsubishi", "Lincoln", "GMC", "Volkswagen");

        //Init image brand
        Resource resource = new ClassPathResource("init-data/brand/brand.png" );
        if(resource != null && resource.exists()) {
            byte[] bytes = IOUtils.toByteArray(resource.getInputStream());
            storageService.upload(bytes, "brand/brand.png", true);
        }
        for (var i = 0; i < brands.size(); i++) {
            Brand brand = Brand.builder()
                    .brandName(brands.get(i))
                    .category(category.get(0))
                    .connectionURL("https://www.mintpot.net")
                    .introduction("3M은 더 많은 사람에게 더 많은 에너지를 전송할 수 있도록 전선의 중량을 줄이고 있습니다. 제조업체가 더 적게 사용하면서 더 많은 것을 만들어낼 수 있도록 돕고 있습니다. \n" +
                            "3M은 필요한 사람들이 필요한 정보를 얻을 수 있도록 건강 관리 데이터를 자동화하고 있습니다. 전 세계에서 3M은 환경 보호, 기업 및 사회적 책임, 경제적 발전을 통해 세계의 진정한 지속 가능한 성장에 기억하는 동시에, 혁신을 고취하며 발전을 촉진하고 있습니다. \n" +
                            "우리는 과학과 혁신을 적용하여 전 세계 모든 삶의 향상에 실질적인 영향을 미치고 있습니다.")
                    .attachFile(new FileInfo("brand.png","brand/brand.png"))
                    .deleteFlg(false)
                    .build();

            brandRepository.save(brand);
        }
    }

    private void generateCategory() throws Exception {
        if(categoryRepository.findAll().isEmpty()) {
            categoryRepository.save(Category.builder().orderCategory(1).title("PPF")
                    .icon(new FileInfo("ppf.png", "category/ppf.png")).build());
            categoryRepository.save(Category.builder().orderCategory(2).title("광택")
                    .icon(new FileInfo("polish.png", "category/polish.png")).build());
            categoryRepository.save(Category.builder().orderCategory(3).title("랩핑")
                    .icon(new FileInfo("wrapping.png", "category/wrapping.png")).build());
            categoryRepository.save(Category.builder().orderCategory(4).title("블랙박스")
                    .icon(new FileInfo("black_box.png", "category/black_box.png")).build());
            categoryRepository.save(Category.builder().orderCategory(5).title("신차패키지")
                    .icon(new FileInfo("new_car_package.png", "category/new_car_package.png")).build());
            categoryRepository.save(Category.builder().orderCategory(6).title("썬팅")
                    .icon(new FileInfo("tinting.png", "category/tinting.png")).build());
            categoryRepository.save(Category.builder().orderCategory(7).title("유리막")
                    .icon(new FileInfo("glass_film.png", "category/glass_film.png")).build());
            categoryRepository.save(Category.builder().orderCategory(8).title("윈드쉴드")
                    .icon(new FileInfo("windshield.png", "category/windshield.png")).build());
        }
        //Init category icon
        for(String path : ICON_CATEGORY) {
            Resource resource = new ClassPathResource("init-data/" + path);
            if(resource != null && resource.exists()) {
                byte[] bytes = IOUtils.toByteArray(resource.getInputStream());
                storageService.upload(bytes, path, true);
            }
        }
    }

    private void generateUsersCompanies(int companyTotal) throws Exception {
        final var encPass = passwordEncoder.encode("Aa@12345");
        final var encPwd = Base64.getEncoder().encodeToString("Aa@12345".getBytes(StandardCharsets.UTF_8));
        //Admin member
        Admin admin = Admin.builder().memberId("admin")
                .password(encPass)
                .encodePwd(encPwd)
                .status(UserStatus.ACTIVATED)
                .lastLoggedIn(LocalDateTime.now())
                .build();
        userRepository.save(admin);

        List<CarType> carTypes = carTypeRepository.findAll();
        Random random = new Random();

        //Init image company
        Resource resource = new ClassPathResource("init-data/company/company.png" );
        if(resource != null && resource.exists()) {
            byte[] bytes = IOUtils.toByteArray(resource.getInputStream());
            storageService.upload(bytes, "company/company.png", true);
        }

        var companyGroup = companyGroupRepo.findById(1L).orElseThrow(null);

        for (var i = 1; i <= companyTotal; i++) {
            // generate users
            Member user = Member.builder()
                    .memberId(String.format("user.test%d@naver.com", i))
                    .password(encPass)
                    .name(String.format("user.test%d", i))
                    .phone(krFaker.phoneNumber().phoneNumber())
                    .birthday(LocalDate.now())
                    .lastLoggedIn(LocalDateTime.now())
                    .isAdNotified(false)
                    .memo("this is a memo")
                    .status(UserStatus.ACTIVATED)
                    .sns(ESNSType.NAVER)
                    .carType(carTypes.get(random.nextInt(carTypes.size())))
                    .carNumber(i+"1111Serial")
                    .noticeSetting(new NoticeSetting())
                    .group(companyGroup)
                    .point(100000)
                    .build();

            user = memberRepository.save(user);

            //generate companies
//            ERegistrationStatus processingStatus;
//            if(i%3 == 0) {
//                processingStatus = ERegistrationStatus.APPROVE;
//            } else if(i%3 == 1) {
//                processingStatus = ERegistrationStatus.WAITING;
//            } else {
//                processingStatus = ERegistrationStatus.REJECT;
//            }

            var address = krFaker.address();
            ConstructableType constructableType = new ConstructableType();
            constructableType.setGlassFilm(true);
            constructableType.setTinting(true);
            constructableType.setPolish(true);

//            if(i < companyTotal/2) {
                Company company = Company.builder()
                        .address(new Address(address.zipCode(),
                                address.cityName() + ", " +
                                        address.streetName() + ", " +
                                        address.streetAddressNumber(),
                                address.buildingNumber(),
                                33.45145870712796 , 126.56565615522355))
                        .activate(EActivateStatus.ACTIVATE)
                        .expiredDateTime(LocalDateTime.now().plusDays(30))
                        .entryDate(LocalDateTime.now().plusDays(10))
                        .companyName(krFaker.company().name())
                        .constructableType(constructableType)
                        .entryRoute(new EntryRoute(true,true,true))
                        .representativeName(krFaker.name().fullName())
                        .workingTime("평일 10:00 ~ 20:00 / 주말 10:00 ~ 15:00")
                        .contact(krFaker.phoneNumber().phoneNumber())
                        .processingStatus(ERegistrationStatus.APPROVE)
                        .introduction("사업자등록증 파일과 업체주소가 일치하지 않습니다.\n" +
                                "확인 후 재 신청바랍니다.")
                        .requestUser(user)
                        .companyId(user.getMemberId())
                        .attachFile(new FileInfo("company.png", "company/company.png"))
                        .build();

//                var companyPoint = new CompanyUsage(company);
//                companyPoint.setPoints(10000 * krFaker.number().numberBetween(25, 50));
//                companyPoint.setExpiredTime(LocalDateTime.now().plusDays(30));
//                companyPoint.setAutoExtendTime(companyPoint.getExpiredTime());

                company = companyRepository.save(company);
                quartzJobRepo.save(new QuartzJob(company));

                user.setCompanyMember(true);
                userRepository.save(user);
//            }
        }
    }

    private void generateFaq(int no) {
        for (int i = 0; i < no; i++) {
            var faq = new FAQ();
            faq.setTitle(krFaker.lorem().sentence());
            faq.setContent(krFaker.lorem().paragraph());
            faq.setPosition(Long.valueOf(i));
            faqRepo.save(faq);
        }
    }

    private void generateNotices(int no) {
        for (var i = 0; i < no; i++) {
            var notification = Notification.builder()
                    .type(NotificationType.values()[random.nextInt(NotificationType.values().length)])
                    .title(krFaker.lorem().sentence())
                    .content(krFaker.lorem().paragraph())
                    .build();
            notificationRepo.save(notification);
        }
    }

    private void generatePoint(int no) {
        Set<String> names = new HashSet<>();
        for (int i = 0; i < no; i++) {
            var companyGroup = new CompanyGroup();
            String name;
            do {
                name = krFaker.company().name() + i;
            } while(names.contains(name));

            names.add(name);
            companyGroup.setName(name);
            companyGroup.setFee(1000 * (75 + random.nextInt(26)));
            companyGroup.setDeliveryCost(50 * random.nextInt(21));
            if(i==0) {
                companyGroup.setName(Constants.GENERAL_GROUP);
            }

            companyGroupRepo.save(companyGroup);
        }
    }

    private void generateReview(int no) {
        var quotations = quotationRepo.findAll();
        for (int i = 0; i < quotations.size(); i++) {
            if (i + 1 == no) {
                break;
            }

            var quotation = quotations.get(i);
            var review = new ConstructionReview();
            review.setWriter(quotation.getTransaction().getRequester());
            review.setCompany(quotation.getCompany());
            review.setQuotation(quotation);
            review.setContent("Good company!");
            review.setProductExplain(krFaker.number().numberBetween(3, 6));
            review.setKindness(krFaker.number().numberBetween(3, 6));
            review.setQuality(krFaker.number().numberBetween(3, 6));
            review.setStatus(ShowStatus.SHOW);
            reviewRepo.save(review);

            var notice = new AppNotice();
            notice.setRecipient(quotation.getCompany().getRequestUser());
            notice.setContent(String.format("\"{%s}\"님이 후기를 남겼습니다", review.getWriter().getCarNumber()));
            notice.setType(ENoticeType.POINT);
            notice.setDetailId(quotation.getId());
            appNoticeRepo.save(notice);
        }
    }

    private void generateConstructionExample(int no) {
        var img = new FileInfo("company.png", "company/company.png");
        List<FileInfo> images = new ArrayList<>();
        images.add(img);

        for (var i = 1; i <= no; i++) {
            var quotation = quotationRepo.findById(Long.valueOf(i));
            if (quotation.isPresent()) {
                var contructionEx = new ConstructionExample();
                contructionEx.setCarType(quotation.get().getTransaction().getRequester().getCarType());
                contructionEx.setStatus(ShowStatus.SHOW);
                contructionEx.setQuotation(quotation.get());
                contructionEx.setContent(krFaker.lorem().sentence());
                contructionEx.setWriter(quotation.get().getCompany().getRequestUser());
                contructionEx.setCompletedDate(quotation.get().getCompleteDate());
                contructionEx.setImages(images);
                constructionExampleRepo.save(contructionEx);
            }
        }
    }

    private void generateQuotation(int no) throws Exception {
        //Init image quote
        Resource resource1 = new ClassPathResource("init-data/quote/quote1.png" );
        if(resource1 != null && resource1.exists()) {
            byte[] bytes = IOUtils.toByteArray(resource1.getInputStream());
            storageService.upload(bytes, "quote/quote1.png", true);
        }
        Resource resource2 = new ClassPathResource("init-data/quote/quote2.png" );
        if(resource2 != null && resource2.exists()) {
            byte[] bytes = IOUtils.toByteArray(resource2.getInputStream());
            storageService.upload(bytes, "quote/quote2.png", true);
        }
        Resource resource3 = new ClassPathResource("init-data/quote/quote3.png" );
        if(resource3 != null && resource3.exists()) {
            byte[] bytes = IOUtils.toByteArray(resource3.getInputStream());
            storageService.upload(bytes, "quote/quote3.png", true);
        }

        Set<FileInfo> files = new HashSet<>();
        files.add( new FileInfo("quote1.png", "quote/quote1.png"));
        files.add( new FileInfo("quote2.png", "quote/quote2.png"));
        files.add( new FileInfo("quote3.png", "quote/quote3.png"));
        List<Member> users = memberRepository.findAll();
        Random random = new Random();

        for (var i = 1; i <= no; i++) {
            var company = companyRepository.findById(Long.valueOf(i));
            if (company.isPresent()) {
                var quotation = new CompanyQuote();
                Transaction transaction = null;
                if(i%8 == 0) {
                    transaction = new BlackBox();
                    ((BlackBox) transaction).setChannel1(true);
                }
                if(i%8 == 1) {
                    transaction = new GlassFilm();
                    ((GlassFilm) transaction).setBonnet(true);
                    ((GlassFilm) transaction).setBackDoorDriver(true);
                }
                if(i%8 == 2) {
                    transaction = new NewCarPackage();
                    ((NewCarPackage) transaction).setGrassFilmCoating(true);
                }
                if(i%8 == 3) {
                    transaction = new Polish();
                    ((Polish) transaction).setBackDoorDriver(true);
                }
                if(i%8 == 4) {
                    transaction = new PPF();
                    ((PPF) transaction).setBonnet(true);
                }
                if(i%8 == 5) {
                    transaction = new Tinting();
                    ((Tinting) transaction).setRearWindshield(true);
                }
                if(i%8 == 6) {
                    transaction = new Windshield();
                    ((Windshield) transaction).setWindshield(true);
                }
                if(i%8 == 7) {
                    transaction = new Wrapping();
                    ((Wrapping) transaction).setDoorHandle(true);
                }
                var address = krFaker.address();

                quotation.setTransaction(transaction);
                transaction.setAttachImages(files);
                transaction.setAddress(new Address(address.zipCode(),
                        address.cityName() + ", " +
                                address.streetName() + ", " +
                                address.streetAddressNumber(),
                        address.buildingNumber(),
                        33.45145870712796 , 126.56565615522355));
                transaction.setDesiredDate(LocalDate.now());
                transaction.setRequester(users.get(random.nextInt(users.size())));
                quotation.setCompany(company.get());
                quotation.setConstructionFee(krFaker.number().numberBetween(50, 100) * 1000);
                quotation.setPaymentAmount(quotation.getConstructionFee() * 11 / 10);
                quotation.setEstConstructionPeriod("2 days");
                quotation.setNotes("Please check your bill");
                quotation.setReservationDate(LocalDateTime.now());
                quotation.setReason(krFaker.music().instrument());
                EQuoteStatus status = null;
                TransactionStatus transactionStatus = null;
                if(i%7 == 0) {
                    transactionStatus = TransactionStatus.COMPARE;
                    status = EQuoteStatus.REQUESTED;
                }
                if(i%7 == 1) {
                    transactionStatus = TransactionStatus.COMPARE;
                    status = EQuoteStatus.DELIVERED;
                }
                if(i%7 == 2) {
                    transactionStatus = TransactionStatus.RESERVATION;
                    status = EQuoteStatus.APPLY;
                }
                if(i%7 == 3) {
                    transactionStatus = TransactionStatus.RESERVATION;
                    status = EQuoteStatus.CONFIRM;
                }
                if(i%7 == 4) {
                    transactionStatus = TransactionStatus.RESERVATION;
                    status = EQuoteStatus.CANCEL;
                }
                if(i%7 == 5) {
                    transactionStatus = TransactionStatus.CONSTRUCTING;
                    status = EQuoteStatus.CONSTRUCTING;
                }
                if(i%7 == 6) {
                    transactionStatus = TransactionStatus.COMPLETE;
                    status = EQuoteStatus.COMPLETE;
                }

                transaction.setStatus(transactionStatus);
                quotation.setStatus(status);

                transactionRepo.save(transaction);
                quotationRepo.save(quotation);
            }
        }
    }

    private void generateBanner() throws Exception {
        //Init image banner
        Resource resource1 = new ClassPathResource("init-data/banner/no_1.png" );
        if(resource1 != null && resource1.exists()) {
            byte[] bytes = IOUtils.toByteArray(resource1.getInputStream());
            storageService.upload(bytes, "banner/no_1.png", true);
        }
        Resource resource2 = new ClassPathResource("init-data/banner/no_2.png" );
        if(resource2 != null && resource2.exists()) {
            byte[] bytes = IOUtils.toByteArray(resource2.getInputStream());
            storageService.upload(bytes, "banner/no_2.png", true);
        }
        var banner1 = new Banner();
        var banner2 = new Banner();
        banner1.setImgUrl("banner/no_1.png");
        banner1.setPosition(1);
        banner1.setStatus(ShowStatus.SHOW);
        banner1.setConnectionLink("https://www.mintpot.net");
        banner2.setImgUrl("banner/no_2.png");
        banner2.setPosition(2);
        banner2.setStatus(ShowStatus.SHOW);
        banner2.setConnectionLink("https://www.mintpot.net");
        bannerRepo.save(banner1);
        bannerRepo.save(banner2);
    }
}
