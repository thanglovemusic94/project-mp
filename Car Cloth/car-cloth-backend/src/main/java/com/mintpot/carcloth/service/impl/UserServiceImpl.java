package com.mintpot.carcloth.service.impl;

import com.mintpot.carcloth.constant.SNSType;
import com.mintpot.carcloth.constant.UserStatus;
import com.mintpot.carcloth.constant.enums.ESNSType;
import com.mintpot.carcloth.entity.Member;
import com.mintpot.carcloth.entity.SNSInfo;
import com.mintpot.carcloth.repository.MemberRepository;
import com.mintpot.carcloth.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;

@Service
@Log4j2
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final MemberRepository memberRepo;

    @Override
    @Transactional
    public Member createUserWithSNSInfo(String name,
                                        String snsId,
                                        String email,
                                        String mobile,
                                        SNSType type,
                                        String token) {

        Member newMember = new Member();
        newMember.setName(name);
        newMember.setStatus(UserStatus.ACTIVATED);
        newMember.setMemberId(email);
        if (!StringUtils.isEmpty(mobile)) {
            newMember.setPhone(mobile);
        }
        SNSInfo snsInfo = new SNSInfo();
        snsInfo.setType(type);
        snsInfo.setSnsId(snsId);
        snsInfo.setMember(newMember);
        snsInfo.setToken(token);
        newMember.setSnsInfo(snsInfo);
        newMember.setSns(ESNSType.convert(type));
        newMember.setLastLoggedIn(LocalDateTime.now());
        newMember = memberRepo.save(newMember);
        return newMember;
    }
}
