package com.mintpot.carcloth.service;

import com.mintpot.carcloth.constant.SNSType;
import com.mintpot.carcloth.entity.Member;

public interface UserService {

    public Member createUserWithSNSInfo(String name, String snsId, String email, String mobile, SNSType type, String token);

}
