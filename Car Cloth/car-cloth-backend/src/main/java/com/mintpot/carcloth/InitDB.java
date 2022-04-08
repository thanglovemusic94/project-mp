package com.mintpot.carcloth;

import com.mintpot.carcloth.constant.Constants;
import com.mintpot.carcloth.constant.UserStatus;
import com.mintpot.carcloth.entity.Admin;
import com.mintpot.carcloth.entity.CompanyGroup;
import com.mintpot.carcloth.entity.car.Category;
import com.mintpot.carcloth.entity.embeddable.FileInfo;
import com.mintpot.carcloth.repository.CategoryRepository;
import com.mintpot.carcloth.repository.CompanyGroupRepository;
import com.mintpot.carcloth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.Base64;

@Component
@Profile({"prd"})
@Log4j2
@RequiredArgsConstructor
public class InitDB implements CommandLineRunner {
    private static String[] ICON_CATEGORY = {"category/ppf.png", "category/polish.png",
            "category/wrapping.png", "category/black_box.png", "category/new_car_package.png",
            "category/tinting.png", "category/glass_film.png", "category/windshield.png"};

    private static final String ADMIN_ID = "admin";

    private final CategoryRepository categoryRepository;
    private final CompanyGroupRepository companyGroupRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        log.info("================== BEGIN INIT DATA ====================");
        initCategory();
        initGroup();
        initAdminAccount();
        log.info("================== END INIT DATA ====================");
    }

    private void initAdminAccount() {
        if(!userRepository.findByMemberId(ADMIN_ID).isPresent()) {
            final var encPass = passwordEncoder.encode("Aa@12345");
            final var encPwd = Base64.getEncoder().encodeToString("Aa@12345".getBytes(StandardCharsets.UTF_8));
            //Admin member
            Admin admin = Admin.builder().memberId(ADMIN_ID)
                    .password(encPass)
                    .encodePwd(encPwd)
                    .status(UserStatus.ACTIVATED)
                    .lastLoggedIn(LocalDateTime.now())
                    .build();
            userRepository.save(admin);
        }
    }

    private void initCategory() throws Exception {
        //Init category icon
//        for(String path : ICON_CATEGORY) {
//            Resource resource = new ClassPathResource("init-data/" + path);
//            if(resource != null && resource.exists()) {
//                byte[] bytes = IOUtils.toByteArray(resource.getInputStream());
//                storageService.upload(bytes, path, true);
//            }
//        }

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
    }

    private void initGroup() {
        if(!companyGroupRepository.findByName(Constants.GENERAL_GROUP).isPresent()) {
            CompanyGroup companyGroup = new CompanyGroup(Constants.GENERAL_GROUP);
            companyGroupRepository.save(companyGroup);
        }
    }
}
