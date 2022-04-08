package com.mintpot.busking.controller.api;


import com.mintpot.busking.controller.ApiController;
import com.mintpot.busking.dto.*;
import com.mintpot.busking.dto.api.*;
import com.mintpot.busking.exception.BusinessException;
import com.mintpot.busking.exception.constant.ErrorCode;
import com.mintpot.busking.facade.AuthenticationFacade;
import com.mintpot.busking.model.Favorite;
import com.mintpot.busking.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Api(tags = "Users")
@RequestMapping(path = "/users")
public class UserController extends ApiController {

    private final UserService userService;

    private final AuthenticationFacade authFacade;

    public UserController(UserService userService, AuthenticationFacade authFacade) {
        this.userService = userService;
        this.authFacade = authFacade;
    }

//    @GetMapping("/users")
//    @ApiOperation("Get List Users")
//    PageResponse<UserDto> getUsers(@RequestParam(value = "page",defaultValue = "1") int page,
//                                   @RequestParam(value = "size", defaultValue = "10") int size) {
//        return userService.findAll(page, size);
//    }

//    @PostMapping(value = "")
//    @ApiOperation("Registration User Email Type")
//    @ResponseStatus(HttpStatus.CREATED)
//    void registrationUser (@RequestBody UserRegDto regDto) {
//        userService.createUser(regDto);
//    }

    @GetMapping("")
    @ApiOperation("Get User Details")
    UserDto getUserDetails() {
      final var userId = authFacade.getAuthentication().getUserId();
        return userService.findUserDetail(userId);
    }


    @PatchMapping(value = "")
    @ApiOperation("Edit User Info")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void editUser(@RequestBody UserEditDto dto) {
        final var userId = authFacade.getAuthentication().getUserId();
        userService.editUser(userId, dto);
    }

    @PatchMapping(value = "/noticeSettings")
    @ApiOperation(value = "Change Notice Settings", notes = "Change my notice settings")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void changeNoticeSettings(@ApiParam(example = "{'noticeSettings' = [1,0]}") @RequestBody NoticeSettingRegDto regDto) {
        List<Integer> noticeSettings = regDto.getNoticeSettings();
        if (noticeSettings.size() != 2 || noticeSettings.stream().anyMatch(i -> (i != 1 && i != 0))) {
            throw new BusinessException(ErrorCode.ILLEGAL_ARGUMENTS);
        }
        userService.changeNoticeSettings(regDto.getNoticeSettings());
    }

    @DeleteMapping("")
    @ApiOperation("Delete User Info")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void deleteUser(@RequestBody UserWithdrawRequestDto withdrawRequestDto) {
        userService.deleteUserById(withdrawRequestDto);
    }

    @PatchMapping("/favorite")
    @ApiOperation("Reg User Favorite")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void editFavorite (@RequestBody FavoriteRegDto dto) {
        userService.editFavorites(dto);
    }

    @GetMapping("/favorite")
    @ApiOperation("Get User Favorite")
    SliceDto<Favorite> getFavorite () {
        return userService.getFavorites();
    }

    @PatchMapping("/password")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @ApiOperation("Change My Password")
    void changePassword(@RequestBody PasswordDto passDto) {
        userService.changePassword(passDto.getCurrentPassword(), passDto.getNewPassword());
    }

    @GetMapping("/bank_info")
    @ApiOperation("Get Bank Info")
    BankWithdrawInfoDto bankInfo () {
        return userService.getLatestBankInfo();
    }

    @GetMapping("/find_by_phone")
    @ApiOperation("Find User By Phone")
    UserShortInfoDto findUserByPhone (String phone) {
        return userService.findUserByPhone(phone);
    }

    @PatchMapping("/password_reset")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @ApiOperation("Reset My Password")
    void resetPassword (@RequestBody ResetPasswordDto resetPasswordDto) {
        userService.resetPassword(resetPasswordDto);
    }

    @GetMapping("/logout")
    @ApiOperation("User Logout")
    void logout() {
        userService.logOut();
    }

    @PostMapping("/existByMail")
    @ApiOperation("Check Exist By Mail")
    UserExistByMailDto existByMail (@RequestBody UserExistByMailDto existByMailDto) {
        userService.existByMail(existByMailDto);
        return existByMailDto;
    }

    @PostMapping("/existByPhone")
    @ApiOperation("Check Exist By Phone")
    UserExistByPhoneDto existByPhone(@RequestBody UserExistByPhoneDto existByPhoneDto) {
        return userService.existByPhone(existByPhoneDto);
    }

}
