package com.mintpot.carcloth.controller.admin;

import com.mintpot.carcloth.constant.NotificationType;
import com.mintpot.carcloth.dto.NotificationList;
import com.mintpot.carcloth.dto.admin.AdNotificationList;
import com.mintpot.carcloth.dto.admin.SaveNoticeDto;
import com.mintpot.carcloth.entity.Notification;
import com.mintpot.carcloth.exception.CommonException;
import com.mintpot.carcloth.exception.ErrorCode;
import com.mintpot.carcloth.repository.MemberRepository;
import com.mintpot.carcloth.repository.NotificationRepository;
import com.mintpot.carcloth.security.AuthenticationFacade;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
@Api(tags={"Notice"})
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationRepository notificationRepo;
    private final AuthenticationFacade authenticationFacade;
    private final MemberRepository memberRepository;
    private final ModelMapper mapper;

    @GetMapping("/admin/notifications")
    public Page<AdNotificationList> noticeList(@RequestParam(required = false) NotificationType type,
                                         @RequestParam(required = false) String term,
                                         Pageable page) {
        return notificationRepo.find(type, term, page)
                .map(notification -> mapper.map(notification, AdNotificationList.class));
    }

//    @GetMapping("/app/notifications")
//    public Page<NotificationList> appNotificationList(Pageable page) {
//        NotificationType notificationType = null;
//        long userId = authenticationFacade.getAuthentication().getUserId();
//        var user = memberRepository.findById(userId).orElseThrow(() -> new CommonException(ErrorCode.USER_NOT_EXIST));
//        if (!user.isCompanyUser()) {
//            notificationType = NotificationType.COMPANY;
//        }
//        return notificationRepo.findExcludeType(notificationType, null, page)
//                .map(n -> mapper.map(n, NotificationList.class));
//    }

    @PostMapping("/admin/notifications")
    public Notification register(@RequestBody @Valid SaveNoticeDto notificationDto) {
        var notice = mapper.map(notificationDto, Notification.class);
        return notificationRepo.save(notice);
    }

    @GetMapping("/admin/notifications/{notificationId}")
    public Notification detail(@PathVariable long notificationId) {
        return notificationRepo.findById(notificationId)
                .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));
    }

    @PutMapping("/admin/notifications/{notificationId}")
    public Notification update(@PathVariable long notificationId,
                               @RequestBody @Valid SaveNoticeDto noticeDto) {
        return notificationRepo.findById(notificationId)
                .map(notification -> {
                    notification.setType(noticeDto.getType());
                    notification.setTitle(noticeDto.getTitle());
                    notification.setContent(noticeDto.getContent());
                    return notificationRepo.save(notification);
                })
                .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));
    }

    @DeleteMapping("/admin/notifications/{noticeId}")
    public void delete(@PathVariable long noticeId) {
        var notification = notificationRepo.findById(noticeId)
                .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));
        notificationRepo.delete(notification);
    }
}