package com.mintpot.busking.service.impl;

import com.google.gson.Gson;
import com.mintpot.busking.api.SNSInfoDto;
import com.mintpot.busking.exception.BusinessException;
import com.mintpot.busking.exception.constant.ErrorCode;
import com.mintpot.busking.model.SNSInfo;
import com.mintpot.busking.model.User;
import com.mintpot.busking.repository.RefreshTokenRepository;
import com.mintpot.busking.repository.SNSInfoRepository;
import com.mintpot.busking.repository.UserRepository;
import com.mintpot.busking.service.UserService;
import com.mintpot.busking.utils.JwtUtils;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class MailAuthenticator extends AbstractAuthenticator{

    private final UserRepository userRepository;

    private final SNSInfoRepository snsInfoRepository;

    private final ModelMapper modelMapper;

    protected MailAuthenticator(JwtUtils jwtUtils, RefreshTokenRepository refTokenRepo, UserService userService, UserRepository userRepo, UserRepository userRepository, SNSInfoRepository snsInfoRepository, ModelMapper modelMapper) {
        super(jwtUtils, refTokenRepo, userService, userRepo);
        this.userRepository = userRepository;
        this.snsInfoRepository = snsInfoRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    SNSInfoDto verifyToken(String token) {
        User user = new Gson().fromJson(token, User.class);
        if(user.getEmail().isEmpty() || user.getPassword().isEmpty()) {
            throw new BusinessException(ErrorCode.AUTH_INVALID_TOKEN);
        }

        Optional<User> userOptional = userRepository.getUserByEmailAndPassword(user.getEmail(), user.getPassword());
        if (userOptional.isEmpty()) {
            throw new BusinessException(ErrorCode.AUTH_INVALID_TOKEN);
        }

        Optional<SNSInfo> snsInfo = snsInfoRepository.getSNSInfoByUser(userOptional.get().getId());
        if (snsInfo.isEmpty()) {
            throw new BusinessException(ErrorCode.AUTH_INVALID_TOKEN);
        }

        return new SNSInfoDto(userOptional.get().getId());

    }
}
