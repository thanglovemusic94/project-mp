package com.mintpot.readingm.backend.user;

import com.github.javafaker.Faker;
import com.mintpot.readingm.backend.constant.MessageType;
import com.mintpot.readingm.backend.dto.*;
import com.mintpot.readingm.backend.dto.admin.AdMemListDto;
import com.mintpot.readingm.backend.dto.admin.ResetPasswordReqDto;
import com.mintpot.readingm.backend.dto.admin.UserNameView;
import com.mintpot.readingm.backend.dto.clazz.MyDavinciClassView;
import com.mintpot.readingm.backend.dto.clazz.MyGoalClassView;
import com.mintpot.readingm.backend.dto.clazz.MyLiveClassView;
import com.mintpot.readingm.backend.dto.sms.Message;
import com.mintpot.readingm.backend.dto.sms.PhoneVerifyDto;
import com.mintpot.readingm.backend.dto.sms.SingleMessage;
import com.mintpot.readingm.backend.dto.student.StudentProfileDto;
import com.mintpot.readingm.backend.dto.tutorApplication.RegStudentDto;
import com.mintpot.readingm.backend.entity.clazz.Class;
import com.mintpot.readingm.backend.entity.clazz.LiveClass;
import com.mintpot.readingm.backend.entity.constant.TutorType;
import com.mintpot.readingm.backend.entity.user.Parent;
import com.mintpot.readingm.backend.entity.user.Student;
import com.mintpot.readingm.backend.entity.user.Tutor;
import com.mintpot.readingm.backend.exception.CommonException;
import com.mintpot.readingm.backend.exception.ErrorCode;
import com.mintpot.readingm.backend.repository.ClassRepository;
import com.mintpot.readingm.backend.repository.LiveClassRepository;
import com.mintpot.readingm.backend.security.AuthenticationFacade;
import com.mintpot.readingm.backend.service.AdUserService;
import com.mintpot.readingm.backend.service.EmailService;
import com.mintpot.readingm.backend.service.ParentService;
import com.mintpot.readingm.backend.service.SmsService;
import com.mintpot.readingm.backend.service.user.UserServiceLocator;
import com.mintpot.readingm.backend.spec.ClassSpecification;
import com.mintpot.readingm.backend.spec.SpecificationBuilder;
import com.mintpot.readingm.backend.util.AesUtils;
import com.mintpot.storage.StorageService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@Api(tags = {"User"})
@RequiredArgsConstructor
@Log4j2
public class UserController {

    private final AuthenticationService authService;

    private final AuthenticationFacade authFacade;

    private final AdUserService userService;

    private final ClassRepository classRepo;

    private final SpecificationBuilder<Class> sb;

    private final SmsService smsService;
    private final EmailService emailService;
    private final ParentService parentService;

    private final UserRepository userRepo;
    private final LiveClassRepository liveClassRepo;

    private final AesUtils aesUtils;

    private final Faker krFaker;

    private final UserServiceLocator userServiceLocator;

    private final PasswordEncoder passwordEncoder;

    private final ModelMapper mapper;

    private final int VERIFICATION_NO_DIGITS = 4;
    private final int RESET_PASSWORD_DURATION = 3;
    private final int RESET_PASSWORD_SKEWER_TIME = 45;

    private final StorageService storageService;

    @PostMapping(path = "/authenticate")
    @PreAuthorize("permitAll()")
    @ApiOperation(value = "User's Authentication.", notes = "API to authenticate, depends on grant type will proceed " +
            "authenticating user and return a JWT access token and refresh token")
    JwtResponse login(@RequestBody JwtRequest authRequest) {
        return authService.authenticateForToken(authRequest);
    }

    @PostMapping("/authenticate/admin")
    @PreAuthorize("permitAll()")
    @ApiOperation("Admin authentication.")
    JwtResponse adminLogin(@RequestBody JwtRequest authRequest) {
        return authService.authenticateForToken(authRequest, Role.ADMIN);
    }

    @PostMapping("/logout")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void logout() {
        authService.logout();
    }

    @GetMapping
    @ApiOperation(value="Api for web admin 7-1")
    public Page<AdMemListDto> getList(@RequestParam(required = false) TutorType tutorType,
                                      @RequestParam(required = false) Role memberType,
                                      @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date signupFrom,
                                      @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date signupTo,
                                      @RequestParam(required = false) String term,
                                      Pageable page) {

        authFacade.assertAdmin();
        return userService.getMemberList(tutorType, memberType, signupFrom, signupTo, term, page);
    }

    @GetMapping("/download")
    @ApiOperation(value="Api for web admin 7-1")
    ResponseEntity<Resource> downloadMembers(@RequestParam List<Long> ids) throws Exception {
        authFacade.assertAdmin();
        String fileName = String.format("MemberList_%s.xlsx", new SimpleDateFormat("yyyyMMdd").format(new Date()));
        ByteArrayResource resource = new ByteArrayResource(userService.exportMembers(ids));
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                .contentLength(resource.contentLength())
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
    }

    @GetMapping("/byRole")
    public List<UserNameView> getUserByRole(@RequestParam Role role) {
        authFacade.assertAdmin();
        return userRepo.findByRole(role, UserNameView.class);
    }

    @GetMapping("/byRole/paging")
    public Page<UserNameView> getUserByRole(@RequestParam Role role, Pageable page) {
        authFacade.assertAdmin();
        return userRepo.findByRole(role, page, UserNameView.class);
    }

    @GetMapping("/byRole/paging/query")
    public Page<UserNameView> getUserByRoleAndQuery(@RequestParam Role role,
                                                    @RequestParam(required = false) String term,
                                                    Pageable page) {
        authFacade.assertAdmin();
        return userRepo.findByRoleAndQuery(role, term, page, UserNameView.class);
    }

    @GetMapping("/{id}")
    @ApiOperation(value="Api for web admin 7-1-1")
    public AdMemListDto getDetail(@PathVariable Long id) {
        authFacade.assertAdmin();
        return userService.getDetailMember(id);
    }


    @GetMapping("/{userId}/classes")
    Page<?> getClassesByUserId(@PathVariable long userId, @RequestParam String classType, Pageable page) {

        if ("TextBookClass".equalsIgnoreCase(classType) || "GoalClass".equalsIgnoreCase(classType)) {
            SpecificationBuilder<LiveClass> liveSB = new SpecificationBuilder<>();
            final Specification<LiveClass> spec = liveSB.add(ClassSpecification.byTutorId(userId)
                                                                               .or(ClassSpecification.byStudentId(userId)))
                                                        .add(ClassSpecification.hasType(classType))
                                                        .build();
            final var ents = liveClassRepo.findAll(spec, page);
            final java.lang.Class<?> dtoClass;
            switch (classType) {
                case "GoalClass":
                    dtoClass = MyGoalClassView.class;
                    break;
                case "TextBookClass":
                    dtoClass = MyLiveClassView.class;
                    break;
                default:
                    dtoClass = Class.class;
                    break;
            }
            return new PageImpl<>(ents.getContent()
                                      .stream()
                                      .map(ent -> mapper.map(ent, dtoClass))
                                      .collect(Collectors.toList()), ents.getPageable(), ents.getTotalElements());
        } else {
            SpecificationBuilder<Class> specBuilder = new SpecificationBuilder<>();
            final Specification<Class> spec = specBuilder.add(ClassSpecification.byStudentId(userId))
                                                .add(ClassSpecification.hasType(classType))
                                                .build();
            return classRepo.find(spec, page, MyDavinciClassView.class);
        }
    }

    @PostMapping
    @PreAuthorize("permitAll()")
    @ResponseStatus(HttpStatus.CREATED)
    public void signup(@RequestBody RegParentDto dto) {
        parentService.registerAccount(dto);
    }

    @PostMapping("/parent/addChild")
    public void addChild(@RequestBody RegStudentDto studentDto) {
        long parentId = authFacade.getAuthentication().getUserId();
        Parent parent = (Parent) userRepo.findById(parentId)
                                         .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));
        Student child = mapper.map(studentDto, Student.class);
        child.setPassword(passwordEncoder.encode(child.getPassword()));
        child.setRole(Role.STUDENT);
        child.setParent(parent);
        userRepo.save(child);
    }

/*    @GetMapping("/search/existsEmail")
    @PreAuthorize("permitAll()")
    public boolean existsEmail(@RequestParam String email) {
        return userRepo.existsByEmail(email);
    }*/

    @GetMapping("/verify/emails")
    @PreAuthorize("permitAll()")
    public List<VerifyEmailRes> verifyEmails(@RequestParam List<String> emails) {
        return emails.stream().map(email -> {
            var dto = new VerifyEmailRes();
            dto.setEmail(email);
            dto.setExisted(userRepo.existsByEmail(email));
            return dto;
        }).collect(Collectors.toList());
    }

    @GetMapping("/search/existsPhone")
    @PreAuthorize("permitAll()")
    public boolean existsPhone(@RequestParam String phone) {
        return userRepo.existsByPhone(phone);
    }

    @GetMapping("/search/existsMemberId")
    @PreAuthorize("permitAll()")
    public boolean existsMemberId(@RequestParam String memberId) {
        return userRepo.existsByMemberId(memberId);
    }

    @GetMapping(
            path = "/verify/phone",
            produces = MediaType.TEXT_PLAIN_VALUE
    )
    @PreAuthorize("permitAll()")
    public String sendPhoneVerification(@RequestParam String phoneNo) throws Exception {
        String verifyStr = krFaker.regexify("[0-9]{" + VERIFICATION_NO_DIGITS + "}");
        Message msg = Message.builder()
                             .text("Your verification number is: " + verifyStr).type(MessageType.SMS)
                             .to(phoneNo)
                             .build();

        String statusMessage = smsService.sendSingleMessage(new SingleMessage(msg)).getStatusMessage();
        log.debug("Phone Verification requested for phone number {} has status message: {}", phoneNo, statusMessage);
        return aesUtils.encryptWithPrefixIV(verifyStr + phoneNo);
    }

    @PostMapping("/verify/phone")
    @PreAuthorize("permitAll()")
    public void confirmVerificationNo(@RequestBody @Valid PhoneVerifyDto dto) throws Exception {
        final String verifyStr = aesUtils.encryptWithPrefixIV(dto.getVerifyNo() + dto.getPhoneNo());

        if (!verifyStr.equals(dto.getSig())) {
            throw new CommonException(ErrorCode.AUTH_WRONG_VERIFICATION_NUMBER);
        }
    }

    @GetMapping(
            path = "/search/memberId",
            produces = MediaType.TEXT_PLAIN_VALUE
    )
    @PreAuthorize("permitAll()")
    public String findId(@RequestParam String name, @RequestParam String phoneNo) {
        return userRepo.findByNameAndPhone(name, phoneNo)
                       .orElseThrow(() -> new CommonException(ErrorCode.AUTH_ACCOUNT_NOT_EXISTS))
                       .getMemberId();
    }

    @PatchMapping("/resetPassword")
    @PreAuthorize("permitAll()")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void resetPassword(@Valid @RequestBody ChangePasswordDto changePasswordDto) throws Exception {
        String phoneNo = changePasswordDto.getPhoneNo();
        String memberId = changePasswordDto.getMemberId();
        String name = changePasswordDto.getName();
        userRepo.findByMemberIdAndNameAndPhone(memberId, name, phoneNo)
                .orElseThrow(() -> new CommonException(ErrorCode.AUTH_ACCOUNT_NOT_EXISTS));

        final String verifyStr = aesUtils.encryptWithPrefixIV(changePasswordDto.getVerifyNo() + changePasswordDto.getPhoneNo());

        if (verifyStr.equals(changePasswordDto.getSig())) {
            userRepo.updatePasswordByPhone(phoneNo, passwordEncoder.encode(changePasswordDto.getNewPassword()));
        } else {
            throw new CommonException(ErrorCode.VALIDATION_FAILED);
        }
    }

    @PatchMapping("/changePassword")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void changePassword(@RequestParam String currentPassword, String newPassword) {
        long id = authFacade.getAuthentication().getUserId();
        User user = userRepo.findById(id).orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));
        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new CommonException(ErrorCode.USER_WRONG_CURRENT_PASSWORD);
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepo.save(user);
    }

    @PostMapping("/resetPass/byEmail")
    @PreAuthorize("permitAll()")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @ApiOperation(value = "Api for web admin 2-2-1")
    public void resetPasswordByEmail(@RequestBody @Valid ResetPasswordReqDto emailDto) throws Exception {
        final var user = userRepo.findByEmailAndStatus(emailDto.getEmail(), UserStatus.ACTIVATED)
                .orElseThrow(() -> new CommonException(ErrorCode.USER_NOT_EXIST));

        if (user.getRole() != Role.ADMIN) {
            throw new CommonException(ErrorCode.USER_ILLEGAL_STATUS);
        }

        Map<String, Object> props = new HashMap<>();
        var expiredOn = new Date().getTime() + (RESET_PASSWORD_DURATION * 60 + RESET_PASSWORD_SKEWER_TIME) * 1000;
        final var sig = aesUtils.encryptWithPrefixIV(emailDto.getEmail() + "@" + expiredOn);
        final var confirmUrl = emailDto.getResetPasswordUrl() + "/confirm?sig=" + sig;

        props.put("confirmUrl", confirmUrl);
        var email = EmailDto.builder()
                .addressTo(emailDto.getEmail())
                .subject("[LiveClass 리딩엠 Admin] 비밀번호 재설정을 위한 이메일 인증")
                .props(props)
                .build();

        emailService.sendSimpleMail(email, "forgot-password");
    }

    @PostMapping("/resetPass/byEmail/confirm")
    @PreAuthorize("permitAll()")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @ApiOperation(value = "Api for web admin 2-2-3")
    public void changePasswordByEmail(@RequestParam String sig, @RequestParam String newPassword) throws Exception {
        final var decSig = aesUtils.decryptWithPrefixIV(sig);
        final var expiredOn = new Date(Long.parseLong(decSig.split("@")[2]));
        if (expiredOn.before(new Date())) {
            throw new CommonException(ErrorCode.AUTH_RESET_PASSWORD_SIG_EXPIRED);
        }

        final var email = decSig.split("@")[0] + "@" + decSig.split("@")[1];
        userRepo.updatePasswordByEmail(email, passwordEncoder.encode(newPassword));
    }

    @PatchMapping("/changePhone")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void changePhone(@RequestParam String phoneNo) {
        long id = authFacade.getAuthentication().getUserId();
        userRepo.updatePhoneById(id, phoneNo);
    }

    @GetMapping("/profile")
    public UserProfileDto getProfile() {
        long id = authFacade.getAuthentication().getUserId();
        User user = userRepo.findById(id).orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));
        if (user instanceof Student) {
            return mapper.map(user, StudentProfileDto.class);
        } else if (user instanceof Parent) {
            return mapper.map(user, ParentProfileDto.class);
        } else if (user instanceof Tutor) {
            return mapper.map(user, TutorProfileDto.class);
        }

        return mapper.map(user, UserProfileDto.class);
    }

    @PatchMapping("/profile")
    public SaveProfileRes changeProfile(@RequestBody UserProfileDto profileDto) {
        var res = new SaveProfileRes();

        long id = authFacade.getAuthentication().getUserId();
        User user = userRepo.findById(id).orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));
        user.setEmail(profileDto.getEmail() != null ? profileDto.getEmail() : user.getEmail());
        user.setAddress(profileDto.getAddress() != null ? profileDto.getAddress() : user.getAddress());
        user.setReceivedEmail(profileDto.getReceivedEmail() != null ? profileDto.getReceivedEmail()
                                      : user.isReceivedEmail());

        user.setReceivedSms(profileDto.getReceivedSms() != null ? profileDto.getReceivedSms()
                                    : user.isReceivedSms());

        if (user instanceof Student) {
            Student std = (Student) user;
            StudentProfileDto studentProfileDto = (StudentProfileDto) profileDto;
            std.setSchool(studentProfileDto.getSchool() != null ? studentProfileDto.getSchool() : std.getSchool());
            std.setGrade(studentProfileDto.getGrade() != null ? studentProfileDto.getGrade() : std.getGrade());
            std.setClazz(studentProfileDto.getClazz() != null ? studentProfileDto.getClazz() : std.getClazz());
        } else if (user instanceof Parent) {
            ParentProfileDto parentDto = (ParentProfileDto) profileDto;
            List<StudentProfileDto> children = parentDto.getChildren();
            if (children != null) {
                for (StudentProfileDto child : children) {
                    Student std = (Student) userRepo.findById(child.getId()).orElseThrow(() -> new CommonException(
                            ErrorCode.ENTITY_NOT_FOUND));
                    std.setSchool(child.getSchool() != null ? child.getSchool() : std.getSchool());
                    std.setGrade(child.getGrade() != null ? child.getGrade() : std.getGrade());
                    std.setClazz(child.getClazz() != null ? child.getClazz() : child.getClazz());
                    userRepo.save(std);
                }
            }
        } else if (user instanceof Tutor) {
            Tutor tutor = (Tutor) user;
            TutorProfileDto tutorProfile = (TutorProfileDto) profileDto;
            tutor.setBank(tutorProfile.getBank() != null ? tutorProfile.getBank() : tutor.getBank());
            tutor.setBankAccount(tutorProfile.getBankAccount() != null ? tutorProfile.getBankAccount() : tutor.getBankAccount());
            var imgName = tutorProfile.getProfileImageUrl();

            if (imgName != null) {
                var profileImgUrl = storageService.getPresignedUrl(
                        String.format("tutors/profile-img/%d/%s", tutor.getId(), imgName)
                );

                tutor.setProfileImageUrl(profileImgUrl.toString());
                res.setProfileImgUrl(profileImgUrl);
            }
        }

        userRepo.save(user);
        return res;
    }
}
