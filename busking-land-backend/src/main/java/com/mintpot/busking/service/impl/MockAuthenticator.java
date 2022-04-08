package com.mintpot.busking.service.impl;

import com.mintpot.busking.api.SNSInfoDto;
import com.mintpot.busking.exception.BusinessException;
import com.mintpot.busking.exception.constant.ErrorCode;
import com.mintpot.busking.model.SNSInfo;
import com.mintpot.busking.model.User;
import com.mintpot.busking.model.constant.SNSType;
import com.mintpot.busking.repository.RefreshTokenRepository;
import com.mintpot.busking.repository.SNSInfoRepository;
import com.mintpot.busking.repository.UserRepository;
import com.mintpot.busking.service.UserService;
import com.mintpot.busking.utils.JwtUtils;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@Profile("!prd")
public class MockAuthenticator extends AbstractAuthenticator {


    private final UserRepository userRepository;

    private final SNSInfoRepository snsInfoRepository;

    private final ModelMapper modelMapper;

    protected MockAuthenticator(JwtUtils jwtUtils, RefreshTokenRepository refTokenRepo, UserService userService,
                                UserRepository userRepo, SNSInfoRepository snsInfoRepo, UserRepository userRepository, SNSInfoRepository snsInfoRepository, ModelMapper modelMapper) {
        super(jwtUtils, refTokenRepo, userService, userRepo);
        this.userRepository = userRepository;
        this.snsInfoRepository = snsInfoRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    SNSInfoDto verifyToken(String userIdStr) {
        int userId = Integer.parseInt(userIdStr);

        Optional<User> userOptional = userRepository.findById(userId);

        if(userOptional.isEmpty()) throw new BusinessException(ErrorCode.AUTH_INVALID_TOKEN);

        Optional<SNSInfo> snsInfo = snsInfoRepository.getSNSInfoByUser(userId);

        if(snsInfo.isEmpty()) throw new BusinessException(ErrorCode.AUTH_INVALID_TOKEN);

        return modelMapper.map(snsInfo.get(), SNSInfoDto.class);
    }
}
