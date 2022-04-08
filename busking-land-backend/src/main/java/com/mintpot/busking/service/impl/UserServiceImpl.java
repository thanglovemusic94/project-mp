package com.mintpot.busking.service.impl;

import com.google.gson.Gson;
import com.mintpot.busking.constant.UserStatus;
import com.mintpot.busking.dto.*;
import com.mintpot.busking.dto.api.*;
import com.mintpot.busking.dto.api.BankWithdrawInfoDto;
import com.mintpot.busking.dto.api.BuskerInfoDto;
import com.mintpot.busking.dto.web.BuskingLandDTO;
import com.mintpot.busking.dto.web.UserDTO;
import com.mintpot.busking.dto.web.request.PasswordWebDto;
import com.mintpot.busking.dto.web.request.UserCreateDTO;
import com.mintpot.busking.dto.web.request.UserUpdateDTO;
import com.mintpot.busking.exception.BusinessException;
import com.mintpot.busking.exception.constant.ErrorCode;
import com.mintpot.busking.facade.AuthenticationFacade;
import com.mintpot.busking.model.*;
import com.mintpot.busking.model.constant.SNSType;
import com.mintpot.busking.repository.*;
import com.mintpot.busking.security.UserDetails;
import com.mintpot.busking.security.services.UserDetailsImpl;
import com.mintpot.busking.service.BuskerService;
import com.mintpot.busking.service.UserService;
import lombok.Builder;
import lombok.extern.log4j.Log4j2;
import org.apache.xmlbeans.impl.xb.xsdschema.Attribute;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@Log4j2
public class UserServiceImpl implements UserService {

    private final UserRepository userRepo;

    private final BuskerRepository buskerRepository;

    private final BuskerService buskerService;

    private final SNSInfoRepository snsInfoRepo;

    private final ModelMapper mapper;

    private final AuthenticationFacade authFacade;

    private final PasswordEncoder passwordEncoder;

    private final BankWithdrawRepository bankWithdrawRepository;

    private final FCMTokenRepository fcmTokenRepo;

    private final RefreshTokenRepository refTokenRepo;



    @Value("${appstore.phonetest}")
    private String APPLE_PHONE_TEST;


    public UserServiceImpl(UserRepository userRepo, BuskerRepository buskerRepository, BuskerService buskerService, SNSInfoRepository snsInfoRepo, ModelMapper mapper, AuthenticationFacade authFacade, PasswordEncoder passwordEncoder, BankWithdrawRepository bankWithdrawRepository, FCMTokenRepository fcmTokenRepo, RefreshTokenRepository refTokenRepo) {
        this.userRepo = userRepo;
        this.buskerRepository = buskerRepository;
        this.buskerService = buskerService;
        this.snsInfoRepo = snsInfoRepo;
        this.mapper = mapper;
        this.authFacade = authFacade;
        this.passwordEncoder = passwordEncoder;
        this.bankWithdrawRepository = bankWithdrawRepository;
        this.fcmTokenRepo = fcmTokenRepo;
        this.refTokenRepo = refTokenRepo;
    }

    @Override
    public PageResponse<UserDto> findAll(int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<User> content = userRepo.findAll(pageable);
        return getUserDtoPageResponse(page, size, content);
    }

    @Override
    public PageResponse<UserDto> search(int page, int size, String name, String email, SNSType snsType) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<User> content = userRepo.search(pageable, name, email, snsType);
        if (content.hasContent()) {
            return getUserDtoPageResponse(page, size, content);
        }
        return null;
    }

    private PageResponse<UserDto> getUserDtoPageResponse(int page, int size, Page<User> content) {
        List<UserDto> contentDTO = content.getContent().stream()
                .map(user -> {
                    UserDto userDto = mapper.map(user, UserDto.class);
                    return userDto;
                })
                .collect(Collectors.toList());
        return new PageResponse<>(contentDTO, content.getTotalPages(), content.getTotalElements(), page, size);
    }

    @Override
    public Optional<User> getUserDetails(int userId) {
        return userRepo.findById(userId);
    }

    @Override
    public UserDto findUserDetail(int userId) {
        Optional<User> userOptional = userRepo.getUserWithFavorite(userId);
        User user = userOptional.orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));
        UserDto userDto = mapper.map(user, UserDto.class);

        Optional<BuskerInfo> buskerInfoOptional = buskerRepository.getBuskerInfoByUser(userId);

        if (buskerInfoOptional.isPresent()) {
            BuskerInfo buskerInfo = buskerInfoOptional.get();
            BuskerInfoDto buskerInfoDto = mapper.map(buskerInfo, BuskerInfoDto.class);
            List<String> performanceVideos = new Gson().fromJson(buskerInfo.getPerformanceVideos(), new TypeToken<List<String>>() {
            }.getType());
            buskerInfoDto.setVideos(performanceVideos);

            userDto.setBusker(buskerInfoDto);
        }
        userDto.setSnsType(user.getSnsInfo().getType().name());

        String notices = user.getNoticeSetting();
        List<Integer> noticeSettings = new Gson().fromJson(notices, new TypeToken<List<Integer>>() {
        }.getType());
        userDto.setNoticeSettings(noticeSettings);

        return userDto;
    }


    @Override
    @Transactional
    public void editUser(int userId, UserEditDto dto) {

        User UserEnt = userRepo.findById(userId).orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));
        //Check if existed
        if (dto.getEmail() != null && !dto.getEmail().isBlank() && !dto.getEmail().equalsIgnoreCase(UserEnt.getEmail())) {
            if (userRepo.existsByEmail(dto.getEmail(), SNSType.MAIL)) {
                throw new BusinessException(ErrorCode.EMAIL_USED);
            }

            UserEnt.setEmail(dto.getEmail());
        }

        if (dto.getPhone() != null && !dto.getPhone().isBlank() && !dto.getPhone().equalsIgnoreCase(UserEnt.getPhone())) {
            if (!dto.getPhone().equals(APPLE_PHONE_TEST) && userRepo.existsByPhone(dto.getPhone())) {
                throw new BusinessException(ErrorCode.PHONE_USED);
            }
            UserEnt.setPhone(dto.getPhone());
        }


        if (!StringUtils.isEmpty(dto.getEmail())) {
            UserEnt.setEmail(dto.getEmail());
        }


        if (!StringUtils.isEmpty(dto.getName())) {
            UserEnt.setName(dto.getName());
        }

        if (dto.getAgreePolicy() != null) {
            UserEnt.setAgreePolicy(dto.getAgreePolicy());
        }

        if (!StringUtils.isEmpty(dto.getAvatar())) {
            UserEnt.setAvatar(dto.getAvatar());
        }

        userRepo.save(UserEnt);

        if (dto.getBuskerInfo() != null) {
            buskerService.editBusker(dto.getBuskerInfo());
        }


        if (dto.getFavoriteInfo() != null) {
            editFavorites(dto.getFavoriteInfo());
        }
    }

    @Override
    public void deleteUserById(int userId) {
        var user = userRepo.findById(userId).orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_EXIST));
        user.setStatus(UserStatus.DELETED);
        userRepo.save(user);
    }

    @Override
    @Transactional
    public void deleteUserById(UserWithdrawRequestDto withdrawRequestDto) {
        final var userId = authFacade.getAuthentication().getUserId();
        var user = userRepo.findById(userId).orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_EXIST));
        boolean isSnsMail = user.getSnsInfo().getType() == SNSType.MAIL;
        if (isSnsMail && StringUtils.isEmpty(withdrawRequestDto.getPassword())) {
            throw new BusinessException(ErrorCode.ILLEGAL_ARGUMENTS);
        }
        if (isSnsMail && !withdrawRequestDto.getPassword().equals(user.getPassword())) {
            throw new BusinessException(ErrorCode.ILLEGAL_ARGUMENTS);
        }
        user.setStatus(UserStatus.DELETED);
        userRepo.save(user);
    }

    @Override
    @Transactional
    public void changeNoticeSettings(List<Integer> noticeSettings) {
        final var userId = authFacade.getAuthentication().getUserId();
        var user = userRepo.findById(userId).orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_EXIST));
        user.setNoticeSetting(String.valueOf(noticeSettings));
        userRepo.save(user);
    }


    @Override
    @Transactional
    public User createUserWithSNSInfo(String name, String snsId, String email, String mobile, SNSType type, String token) {
        User newUser = new User();
        newUser.setName(name);
        newUser.setStatus(UserStatus.ACTIVATED);
        newUser.setEmail(email);
        if(!StringUtils.isEmpty(mobile)) {
            newUser.setPhone(mobile);
        }
        SNSInfo snsInfo = new SNSInfo();
        snsInfo.setType(type);
        snsInfo.setSnsId(snsId);
        snsInfo.setUser(newUser);
        snsInfo.setToken(token);
        newUser.setSnsInfo(snsInfo);
        newUser = userRepo.save(newUser);
        return newUser;
    }

    @Override
    @Transactional
    public User createUser(UserRegDto dto) {
        User userEnt = mapper.map(dto, User.class);

        if (userRepo.existsByEmail(dto.getEmail(), SNSType.MAIL)) {
            throw new BusinessException(ErrorCode.EMAIL_USED);
        }

        if (dto.getPhone() != null && !dto.getPhone().isBlank()) {
            if (!dto.getPhone().equals(APPLE_PHONE_TEST) && userRepo.existsByPhone(dto.getPhone())) {
                throw new BusinessException(ErrorCode.PHONE_USED);
            }
        }

        if (dto.getFavorites() == null || dto.getFavorites().size() == 0) {
            throw new BusinessException(ErrorCode.FAVORITE_EMPTY);
        }

        SNSInfo snsInfo = new SNSInfo();
        snsInfo.setUser(userEnt);
        snsInfo.setSnsId("");
        snsInfo.setType(SNSType.MAIL);
        userEnt.setSnsInfo(snsInfo);
        userEnt.setFavorites(dto.getFavorites());
        userEnt.setPointAmount(0);
        userEnt.setAgreePolicy(true);
        userEnt = userRepo.save(userEnt);
        return userEnt;
    }

    @Override
    public User createUserInWeb(UserRegDto dto) {
        List<ErrorCode> errorCodeList = new ArrayList<>();
        if (userRepo.existsByEmail(dto.getEmail(), SNSType.MAIL)) {
            errorCodeList.add(ErrorCode.EMAIL_USED);
        }

        if (dto.getPhone() != null && !dto.getPhone().isBlank()) {
            if (!dto.getPhone().equals(APPLE_PHONE_TEST) && userRepo.existsByPhone(dto.getPhone())) {
                errorCodeList.add(ErrorCode.PHONE_USED);
            }
        }

        if (dto.getFavorites() == null || dto.getFavorites().size() == 0) {
            errorCodeList.add(ErrorCode.FAVORITE_EMPTY);
        }

        if(errorCodeList.size() > 0) {
            throw new BusinessException(HttpStatus.BAD_REQUEST,  errorCodeList);
        }

        return createUser(dto);
    }

    @Override
    public void editFavorites(FavoriteRegDto favoriteRegDto) {
        final var userId = authFacade.getAuthentication().getUserId();
        Optional<User> userOptional = userRepo.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setFavorites(favoriteRegDto.getFavorites());
            userRepo.save(user);
        }
    }

    @Override
    public SliceDto<Favorite> getFavorites() {
        final var userId = authFacade.getAuthentication().getUserId();
        Optional<User> user = userRepo.getUserWithFavorite(userId);
        if (user.isEmpty()) throw new BusinessException(ErrorCode.USER_NOT_FOUND);
        List<Favorite> favorites = new ArrayList<>();
        user.get().getFavorites().forEach(favorites::add);
        return SliceDto.of(favorites, false);
    }

    @Override
    public void changePassword(String currentPassword, String newPassword) {
        final var userId = authFacade.getAuthentication().getUserId();
        var user = userRepo.findById(userId)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_EXIST));

        if (user.getStatus() != UserStatus.ACTIVATED)
            throw new BusinessException(ErrorCode.USER_ILLEGAL_STATUS);

        if (currentPassword.equals(user.getPassword())) {
            changePassword(user, newPassword);
        } else throw new BusinessException(ErrorCode.USER_WRONG_CURRENT_PASSWORD);
    }

    @Override
    public BankWithdrawInfoDto getLatestBankInfo() {
        final var userId = authFacade.getAuthentication().getUserId();
        List<BankWithdraw> bankWithdraws = bankWithdrawRepository.getBankByUser(userId);
        bankWithdraws.add(new BankWithdraw());
        return mapper.map(bankWithdraws.get(0), BankWithdrawInfoDto.class);
    }

    @Override
    public UserShortInfoDto findUserByPhone(String phone) {
        if (StringUtils.isEmpty(phone)) throw new BusinessException(ErrorCode.ILLEGAL_ARGUMENTS);
        Optional<User> userOptional = userRepo.findUserByPhone(phone, SNSType.MAIL);
        if (userOptional.isEmpty()) throw new BusinessException(ErrorCode.USER_NOT_FOUND);
        return mapper.map(userOptional.get(), UserShortInfoDto.class);
    }


    @Override
    @Transactional
    public void resetPassword(ResetPasswordDto resetPasswordDto) {
        if (StringUtils.isEmpty(resetPasswordDto.getEmail()) || StringUtils.isEmpty(resetPasswordDto.getPhone()))
            throw new BusinessException(ErrorCode.ILLEGAL_ARGUMENTS);
        Optional<User> userOptional = userRepo.findUserByEmailAndPhone(resetPasswordDto.getEmail(), resetPasswordDto.getPhone(), SNSType.MAIL);
        if (userOptional.isEmpty()) throw new BusinessException(ErrorCode.USER_NOT_FOUND);
        User user = userOptional.get();
        user.setPassword(resetPasswordDto.getPassword());
        userRepo.save(user);
    }

    @Override
    public void logOut() {
        final var userId = authFacade.getAuthentication().getUserId();
        var user = userRepo.findById(userId).orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_EXIST));
        try {
            fcmTokenRepo.deleteById(userId);
            refTokenRepo.deleteById(userId);
        } catch (Exception ignored) {
        }
    }

    @Override
    public UserExistByMailDto existByMail(UserExistByMailDto existByMailDto) {
        boolean available = !userRepo.existsByEmail(existByMailDto.getEmail(), existByMailDto.getSnsType());
        existByMailDto.setAvailable(available);
        return existByMailDto;
    }

    @Override
    public UserExistByPhoneDto existByPhone(UserExistByPhoneDto existByPhoneDto) {
        boolean available = !userRepo.existsByPhone(existByPhoneDto.getPhone());
        if(existByPhoneDto.getPhone().equals(APPLE_PHONE_TEST)) {
            // Apple phone test >> available
            available = true;
        }
        existByPhoneDto.setAvailable(available);
        return existByPhoneDto;
    }

    /**
     * web amdmin
     */
    @Override
    public PageResponse<UserDTO> findAllBySearch(Pageable pageable, String keyword) {
        if (keyword.trim().isEmpty()) keyword = null;
        Page<User> userPage = userRepo.findAllBySearch(pageable, keyword);
        Page<UserDTO> userDtoPage = userPage.map(new Function<User, UserDTO>() {
            @Override
            public UserDTO apply(User user) {
                UserDTO dto = mapper.map(user, UserDTO.class);
//                dto.setNoticeSettings(Arrays.asList(user.getNoticeSetting()));
                return dto;
            }
        });
        PageResponse<UserDTO> response = new PageResponse(userDtoPage);
        return response;
    }

    @Override
    public UserDTO findById(Integer id) {
        User user = userRepo.findById(id).orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_EXIST));
        UserDTO dto = mapper.map(user, UserDTO.class);
        return dto;
    }



    @Override
    public UserDTO updateUserInWeb(UserUpdateDTO dto, Integer userId) {
        User UserEnt = userRepo.findById(userId).orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));

        ArrayList<ErrorCode> errorCodes = new ArrayList<>();

        //Check if existed
        if (dto.getEmail() != null && !dto.getEmail().isBlank() && !dto.getEmail().equalsIgnoreCase(UserEnt.getEmail())) {
            if (userRepo.existsByEmailAndUser(dto.getEmail(), SNSType.MAIL, userId)) {
                errorCodes.add(ErrorCode.EMAIL_USED);
            }

            UserEnt.setEmail(dto.getEmail());
        }

        if (dto.getPhone() != null && !dto.getPhone().isBlank() && !dto.getPhone().equalsIgnoreCase(UserEnt.getPhone())) {
            if (!dto.getPhone().equals(APPLE_PHONE_TEST) && userRepo.existsByPhoneAndUser(dto.getPhone(), userId)) {
                errorCodes.add(ErrorCode.PHONE_USED);
            }
            UserEnt.setPhone(dto.getPhone());
        }

        if (!StringUtils.isEmpty(dto.getEmail())) {
            UserEnt.setEmail(dto.getEmail());
        }

        if (!StringUtils.isEmpty(dto.getName())) {
            UserEnt.setName(dto.getName());
        }

        UserEnt.setPointAmount(dto.getPointAmount());

        Set<Favorite> favorites = dto.getFavorites().stream().map(favoriteDTO -> {
            return mapper.map(favoriteDTO, Favorite.class);
        }).collect(Collectors.toSet());
        UserEnt.setFavorites(favorites);

        if(errorCodes.size() > 0) {
            throw new BusinessException(HttpStatus.BAD_REQUEST,  errorCodes);
        }

        userRepo.save(UserEnt);

        UserDTO userDTO = mapper.map(UserEnt, UserDTO.class);
        return userDTO;
    }

    @Override
    @Transactional
    public UserDTO update(UserUpdateDTO dto, Integer id) {
        User user = userRepo.findById(id)
                .map(u -> {
                    u.setName(dto.getName());
                    u.setEmail(dto.getEmail());
                    u.setPhone(dto.getPhone());
                    Set<Favorite> favorites = dto.getFavorites().stream().map(favoriteDTO -> {
                        return mapper.map(favoriteDTO, Favorite.class);
                    }).collect(Collectors.toSet());
                    u.setFavorites(favorites);
                    return userRepo.save(u);
                })
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_EXIST));

        UserDTO userDTO = mapper.map(user, UserDTO.class);
        return userDTO;
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        userRepo.findById(id).map(u -> {
            u.setStatus(UserStatus.DELETED);
            return userRepo.save(u);
        }).orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_EXIST));
    }

    @Override
    public void deletes(List<Integer> ids) {

    }

    @Override
    @Transactional
    public void changeUserPassword(PasswordWebDto passwordWebDto) {
        final UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        var user = userRepo.findByName(userDetails.getUsername()).orElseThrow(() -> new BusinessException(ErrorCode.ADMIN_NOT_EXIT));

        if (!checkIfValidOldPassword(user, passwordWebDto.getOld_password())) {
            throw new BusinessException(ErrorCode.ADMIN_INVALID);
        }

        user.setPassword(passwordEncoder.encode(passwordWebDto.getNew_password()));
        userRepo.save(user);
    }

    @Override
    public boolean checkIfValidOldPassword(final User user, final String oldPassword) {
        return passwordEncoder.matches(oldPassword, user.getPassword());
    }

    /**
     * end web web
     */
    @Transactional
    void changePassword(User user, String newPassword) {
        if (user.getStatus() != UserStatus.ACTIVATED)
            throw new BusinessException(ErrorCode.USER_ILLEGAL_STATUS);

        user.setPassword(newPassword);
        userRepo.save(user);
    }
}
