package com.mintpot.pii;

import com.github.javafaker.Faker;
import com.mintpot.pii.entity.*;
import com.mintpot.pii.entity.constant.CardType;
import com.mintpot.pii.entity.constant.ConfigId;
import com.mintpot.pii.entity.constant.ReservationStatus;
import com.mintpot.pii.entity.embeddable.PeriodDiscount;
import com.mintpot.pii.entity.embeddable.Representative;
import com.mintpot.pii.entity.embeddable.StorageSize;
import com.mintpot.pii.repository.*;
import com.mintpot.pii.security.UserDetails;
import lombok.extern.log4j.Log4j2;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.io.IOException;
import java.time.LocalDate;
import java.time.Month;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.concurrent.ThreadLocalRandom;

//@Component
//@Profile({"dev", "stg"})
@Log4j2
public class MemDBInit implements CommandLineRunner {


    public MemDBInit(BoardAnnouncementRepository boardAnnouncementRepo, CompanyRepository companyRepo,
                     BranchRepository branchRepo, BoardFAQRepository boardFAQRepo, CompanyReviewRepository compRevRepo,
                     UserRepository userRepo, PasswordEncoder passwordEncoder, ProductRepository productRepo,
                     UserCardRepository userCardRepo, ConfigRepository configRepo, Faker krFaker,
                     ResourcePatternResolver resResolver, GeometryFactory geoFac, KeywordRepository keyRepo, EntityManager em) throws IOException {
        this.boardAnnouncementRepo = boardAnnouncementRepo;
        this.companyRepo = companyRepo;
        this.branchRepo = branchRepo;
        this.boardFAQRepo = boardFAQRepo;
        this.compRevRepo = compRevRepo;
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.productRepo = productRepo;
        this.userCardRepo = userCardRepo;
        this.configRepo = configRepo;
        this.krFaker = krFaker;
        this.geoFac = geoFac;
        this.keyRepo = keyRepo;
        this.em = em;
        this.PHOTO_URLS = new ArrayList<>();
        var resources = resResolver.getResources("classpath:static/images/*");
        Arrays.stream(resources).forEach(resource -> {
            this.PHOTO_URLS.add("/images/" + resource.getFilename());
        });
    }

    private final BoardAnnouncementRepository boardAnnouncementRepo;
    private final CompanyRepository companyRepo;
    private final BranchRepository branchRepo;
    private final BoardFAQRepository boardFAQRepo;
    private final CompanyReviewRepository compRevRepo;
    private final UserRepository userRepo;
    private final ProductRepository productRepo;
    private final UserCardRepository userCardRepo;
    private final ConfigRepository configRepo;
    private final PasswordEncoder passwordEncoder;
    private final KeywordRepository keyRepo;

    private final Faker krFaker;
    private final GeometryFactory geoFac;
    private final EntityManager em;

    private final List<String> PHOTO_URLS;
    private final Integer[] DISCOUNT_PERIODS = new Integer[]{1, 3, 6, 9, 12};

    @Override
    @Transactional
    public void run(String... args) {

        log.info("================== BEGIN GENERATE FAKE DATA ====================");
        //Check if database is empty, don't insert more
        if (companyRepo.findAll().iterator().hasNext())
            return;

        configRepo.save(new Config(ConfigId.COMPANY_SEQUENCE, "A01"));

        var authorities = new ArrayList<GrantedAuthority>();
        authorities.add(new SimpleGrantedAuthority("ADMIN"));
        UserDetails admin = new UserDetails(User.builder().email("admin@pii.com").password(passwordEncoder.encode("Aa" +
                "@12345")).name("admin").build(), authorities);

        var secContext = SecurityContextHolder.createEmptyContext();
        secContext.setAuthentication(new UsernamePasswordAuthenticationToken(admin, admin.getPassword(), admin.getAuthorities()));
        SecurityContextHolder.setContext(secContext);

        userGenerator(10);
        boardAnnouncementGenerator();
        setBoardFAQGenerator();

        Faker faker = new Faker(Locale.KOREA);
        log.debug("Korea zipcode: {}", faker.address().zipCode());

        for (var i = 0; i < 20; i++) {
            var fakeCompany = faker.company();
            Representative representative = Representative.builder().name(faker.name().fullName()).phone(faker.phoneNumber().phoneNumber()).email(faker.bothify("????##@naver.com")).build();
            Company company =
                    Company.builder().address(faker.address().fullAddress()).brandName(fakeCompany.catchPhrase()).registrationName(fakeCompany.name() + " Co., Ltd.").registrationNumber(faker.numerify("###-##-######")).representative(representative).build();
            company = companyRepo.saveAndFlush(company);

            for (var j = 0; j < faker.random().nextInt(10); j++) {
                var fakeBranch = faker.company();
                var branchAddr = faker.address();
                var photoUrls = new ArrayList<String>();
                for (var s = 0; s <= 5; s++) {
                    photoUrls.add(PHOTO_URLS.get(faker.random().nextInt(PHOTO_URLS.size())));
                }
                Branch branch = Branch.builder()
                        .company(company)
                        .name(fakeBranch.buzzword() + " Branch")
                        .mainPhotoUrl(PHOTO_URLS.get(faker.random().nextInt(PHOTO_URLS.size())))
                        .subPhotoUrls(photoUrls)
                        .phone(faker.phoneNumber().phoneNumber())
                        .addressSimple(branchAddr.streetAddress())
                        .addressDetailed(branchAddr.fullAddress())
                        .location(geoFac.createPoint(randomCoordinate()))
                        .businessInfo("Consultation Hours: Mon-Fri 10:00-18:00\n" +
                                "Facility Hours: Open all year 00:00-24:00\n").refundPolicy("Free reservation " +
                                "cancellation fee before usage starts")
                        .build();

                for (var k = 0; k < faker.random().nextInt(10); k++) {
                    var fakeProduct = faker.commerce();

                    var storageSize = new StorageSize((float) faker.number().randomDouble(2, 1, 30),
                            (float) faker.number().randomDouble(2, 1, 30), (float) faker.number().randomDouble(2, 1, 30));

                    var subPhotoUrls = new ArrayList<String>();
                    for (var s = 0; s < 5; s++) {
                        subPhotoUrls.add(PHOTO_URLS.get(faker.random().nextInt(PHOTO_URLS.size())));
                    }

                    var periodDiscount = new ArrayList<PeriodDiscount>();
                    var rdmPeriods = new ArrayList<Integer>();
                    for (var p = 0; p < faker.random().nextInt(1, DISCOUNT_PERIODS.length); p++) {
                        rdmPeriods.add(DISCOUNT_PERIODS[p]);
                    }

                    int initDscntRate = faker.random().nextInt(1, 5);
                    for (var r = 0; r < rdmPeriods.size(); r++) {
                        periodDiscount.add(PeriodDiscount.builder().monthAmount(rdmPeriods.get(r)).discountPercentage(initDscntRate).build());
                        initDscntRate += faker.random().nextInt(1, 15);
                    }

                    var product = Product.builder()
                            .periodDiscounts(periodDiscount)
                            .deposit(faker.random().nextInt(100, 300) * 1000)
                            .subPhotoUrls(subPhotoUrls)
                            .mainPhotoUrl(PHOTO_URLS.get(faker.random().nextInt(PHOTO_URLS.size())))
                            .quantity(faker.number().randomDigit())
                            .availDays(faker.number().randomDigit())
                            .minUsage(faker.number().numberBetween(1, 12))
                            .purchaseLimit(faker.number().randomDigit())
                            .price(faker.number().numberBetween(10, 900) * 1000)
                            .name(fakeProduct.productName())
                            .size(storageSize)
                            .branch(branch)
                            .build();
                    branch.addProduct(product);
                }
                for (var k = 0; k < faker.random().nextInt(5); k++) {
                    var fakerKeyword = faker.color().name()+"_"+faker.number().digits(6);
                    Keyword keyword = Keyword.builder().name(fakerKeyword).build();
                    branch.addKeyword(keyword);
                }
                branch.addKeyword(Keyword.builder().name("Korea").build());
                em.merge(branch);
            }

        }

        Branch tmpBranch = Branch.builder()
                .company(new Company(1))
                .name("Test Create Branch")
                .phone(faker.phoneNumber().phoneNumber())
                .addressSimple("test address 1")
                .addressDetailed("test address 1 detailed")
                .location(geoFac.createPoint(randomCoordinate()))
                .businessInfo("Consultation Hours: Mon-Fri 10:00-18:00\n" +
                        "Facility Hours: Open all year 00:00-24:00\n").refundPolicy("Free reservation " +
                        "cancellation fee before usage starts")
                .build();
        tmpBranch.addKeyword(Keyword.builder().name("Gangnam").build());
        tmpBranch.addKeyword(Keyword.builder().name("Seoul").build());
        tmpBranch.addKeyword(Keyword.builder().name("Korea").build());
        em.merge(tmpBranch);

        reservationGen(10);
        bookmarkGen(10);

        log.info("=================== FAKE DATA GEN COMPLETED ====================");
    }

//    private void keywordGenerator(int keyNo, Branch branch){
//        for(var i = 1; i <= keyNo; i++){
////            Keyword keyword = Keyword.builder()
//        }
//        log.info("Finish generate keyword data");
//    }

    private void bookmarkGen(int bookmarkNo){
        Faker faker = new Faker(Locale.KOREA);
        List<Bookmark> lstBookmark = new ArrayList<>();
        for (var s = 1; s <= bookmarkNo+1; s++) {
            Bookmark bm = Bookmark
                    .builder()
                    .userId(1l)
                    .branchId(s)
                    .build();
            em.merge(bm);
        }
    }

    private void reservationGen(int reservationNo){
        Faker faker = new Faker(Locale.KOREA);
        List<Reservation> lstReservations = new ArrayList<>();
        Reservation reservation = new Reservation();
        reservation.setUser(userRepo.findById(1l).get());
        reservation.setProduct(productRepo.findDetailsById(Long.parseLong(faker.random().nextInt(1,3).toString())).get());
        reservation.setQuantity(1);
        reservation.setPaidAmount(1000);
        reservation.setOrderId("aa");
        reservation.setStartDate(LocalDate.now().plusDays(faker.random().nextInt(-2,2)));
        reservation.setUsagePeriod(1);
        reservation.setStatus(ReservationStatus.valueOf(3));
        lstReservations.add(reservation);
        em.merge(reservation);
        for (var s = 1; s <= reservationNo; s++) {
            reservation = new Reservation();
            reservation.setUser(userRepo.findById(1l).get());
            reservation.setProduct(productRepo.findDetailsById(Long.parseLong(faker.random().nextInt(1,3).toString())).get());
            reservation.setQuantity(1);
            reservation.setPaidAmount(1000);
            reservation.setOrderId("aa");
            reservation.setStartDate(LocalDate.now().plusDays(faker.random().nextInt(-2,2)));
            reservation.setUsagePeriod(1);
            reservation.setStatus(ReservationStatus.valueOf(faker.random().nextInt(-1,3)));
            lstReservations.add(reservation);
            em.merge(reservation);
        }
    }

    private void userGenerator(int usrNo) {
        for (var i = 1; i <= usrNo; i++) {
            final var encPswd = passwordEncoder.encode("Aa@12345");
            User user =
                    User.builder().email("user.test" + i + "@naver.com").name(krFaker.name().name()).password(
                            encPswd).phone(krFaker.phoneNumber().phoneNumber()).ssn(krFaker.idNumber().ssnValid()).build();
            user = userRepo.save(user);

            UserCard card =
                    UserCard.builder().user(user).cardNumber(krFaker.number().digits(16)).expDate(YearMonth.of(2030,
                            Month.DECEMBER)).type(CardType.VISA).build();
            userCardRepo.save(card);
        }

        log.info("Finish generate users data");
    }

    private void boardAnnouncementGenerator() {
        for (var i = 0; i < 50; i++) {
            var fkAnnounce = krFaker.lorem();
            BoardAnnouncement ent = BoardAnnouncement.builder()
                    .title(fkAnnounce.sentence())
                    .contents(fkAnnounce.paragraph())
                    .build();
            boardAnnouncementRepo.save(ent);
        }

        log.info("Finish generate board announcement data");
    }

    private void setBoardFAQGenerator() {
        for (var i = 0; i < 50; i++) {
            var fkEnt = krFaker.lorem();
            BoardFAQ ent = BoardFAQ.builder()
                    .question(fkEnt.sentence())
                    .answer(fkEnt.paragraph())
                    .build();
            boardFAQRepo.save(ent);
        }

        log.info("Finish generate board FAQs data");
    }

    private Coordinate randomCoordinate() {

        return new Coordinate(ThreadLocalRandom.current().nextDouble(-90, 90),
                ThreadLocalRandom.current().nextDouble(-180, 180));
    }

}
