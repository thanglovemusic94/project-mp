package com.mintpot.carcloth.service.impl;

import com.mintpot.carcloth.constant.enums.ENoticeType;
import com.mintpot.carcloth.entity.AppNotice;
import com.mintpot.carcloth.entity.Member;
import com.mintpot.carcloth.repository.AppNoticeRepository;
import com.mintpot.carcloth.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class NoticeServiceImpl implements NoticeService {

    private final AppNoticeRepository appNoticeRepo;

    @Override
    @Transactional
    public void createNotice(ENoticeType type, Member recipient, String content,Long detailId) {
        var notice = new AppNotice();
        notice.setRecipient(recipient);
        notice.setType(type);
        notice.setContent(content);
        notice.setDetailId(detailId);

        appNoticeRepo.save(notice);
    }
}
