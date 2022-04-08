package com.mintpot.busking.service;

import com.mintpot.busking.dto.*;
import com.mintpot.busking.dto.api.*;
import com.mintpot.busking.dto.web.UserDTO;
import com.mintpot.busking.dto.web.request.PasswordWebDto;
import com.mintpot.busking.dto.web.request.UserCreateDTO;
import com.mintpot.busking.dto.web.request.UserUpdateDTO;
import com.mintpot.busking.model.Favorite;
import com.mintpot.busking.model.User;
import com.mintpot.busking.model.constant.SNSType;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface UserService {

    PageResponse<UserDto> findAll(int page, int size);

    PageResponse<UserDto> search(int page, int size, String name, String email, SNSType snsType);

    Optional<User> getUserDetails(int userId);

    void deleteUserById(int id);

    UserDto findUserDetail (int userId);

    void editUser(int userId, UserEditDto dto);

    void deleteUserById(UserWithdrawRequestDto withdrawRequestDto);

    void changeNoticeSettings (List<Integer> noticeSettings);

    @Transactional
    User createUserWithSNSInfo(String name, String snsId, String email, String mobile, SNSType type, String token);

    User createUser(UserRegDto dto);

    User createUserInWeb (UserRegDto dto);

    void editFavorites (FavoriteRegDto favoriteRegDto);

    SliceDto<Favorite> getFavorites ();

    void changePassword (String currentPassword, String newPassword);

    BankWithdrawInfoDto getLatestBankInfo ();

    UserShortInfoDto findUserByPhone (String phone);

    void resetPassword (ResetPasswordDto resetPasswordDto);

    void logOut ();

    UserExistByMailDto existByMail (UserExistByMailDto existByMailDto);

    UserExistByPhoneDto existByPhone (UserExistByPhoneDto existByPhoneDto);


    /**
     * Web web
     */

    PageResponse<UserDTO> findAllBySearch(Pageable pageable,String keyword);
    UserDTO findById(Integer id);
    UserDTO updateUserInWeb (UserUpdateDTO dto, Integer id);
    UserDTO update(UserUpdateDTO dto, Integer id);
    void delete(Integer id);
    void deletes(List<Integer> ids);

    void changeUserPassword(PasswordWebDto dto);
    boolean checkIfValidOldPassword(User user, String password);
    /**
     * end
     */

}
