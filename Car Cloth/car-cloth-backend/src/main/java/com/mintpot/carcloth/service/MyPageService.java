package com.mintpot.carcloth.service;

import com.mintpot.carcloth.dto.AccountSetting;
import com.mintpot.carcloth.dto.FAQInfo;
import com.mintpot.carcloth.dto.MemberInfo;
import com.mintpot.carcloth.entity.embeddable.NoticeSetting;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MyPageService {

    MemberInfo getMemberInfo();

    AccountSetting getAccountInfo();

    NoticeSetting getNoticeSetting();

    void setupNoticeSetting(NoticeSetting setting);

    Page<FAQInfo> getFAQs(Pageable pageable);

    void withdraw();
}
