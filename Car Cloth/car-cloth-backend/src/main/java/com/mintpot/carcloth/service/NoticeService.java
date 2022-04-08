package com.mintpot.carcloth.service;

import com.mintpot.carcloth.constant.enums.ENoticeType;
import com.mintpot.carcloth.entity.Member;

public interface NoticeService {

    void createNotice(ENoticeType type, Member recipient, String content, Long detailId);
}
