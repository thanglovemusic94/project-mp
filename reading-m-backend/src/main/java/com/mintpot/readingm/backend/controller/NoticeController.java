package com.mintpot.readingm.backend.controller;

import com.mintpot.readingm.backend.dto.admin.AdNoticeView;
import com.mintpot.readingm.backend.dto.admin.NoticeDetailView;
import com.mintpot.readingm.backend.dto.admin.NoticeListView;
import com.mintpot.readingm.backend.dto.notice.SaveNoticeDto;
import com.mintpot.readingm.backend.entity.notification.Notice;
import com.mintpot.readingm.backend.exception.CommonException;
import com.mintpot.readingm.backend.exception.ErrorCode;
import com.mintpot.readingm.backend.repository.NoticeRepository;
import com.mintpot.readingm.backend.security.AuthenticationFacade;
import com.mintpot.readingm.backend.user.Role;
import com.mintpot.storage.PresignedImagesInfoDto;
import com.mintpot.storage.StorageService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URL;
import java.util.ArrayList;
import java.util.UUID;

@RestController
@RequestMapping("/api/notices")
@Api(tags = {"Notice"})
@RequiredArgsConstructor
public class NoticeController {

    private final NoticeRepository noticeRepo;

    private final ModelMapper mapper;
    private final AuthenticationFacade authFacade;
    private final StorageService storageService;

    @GetMapping
    Page<AdNoticeView> findByQuery(@RequestParam(required = false) Role role,
                                   @RequestParam(required = false) String query,
                                   Pageable page) {

        authFacade.assertAdmin();
        return noticeRepo.findByQuery(role, query, page);
    }

    @PatchMapping("/{noticeId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @ApiOperation(value = "Edit notice", notes = "Edit notice")
    @Transactional
    void editNotice(@RequestBody SaveNoticeDto adNoticeDto, @PathVariable long noticeId) {
        authFacade.assertAdmin();
        var notice = noticeRepo.findById(noticeId).orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));
        mapper.map(adNoticeDto, notice);
        noticeRepo.save(notice);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @ApiOperation(value = "Register new notice", notes = "Register new notice")
    @Transactional
    PresignedImagesInfoDto regNotice(@RequestBody @Valid SaveNoticeDto saveNoticeDto) {
        authFacade.assertAdmin();
        var nClass = mapper.map(saveNoticeDto, Notice.class);
        final var uid = UUID.randomUUID().toString().replace("-", "");
        final var fileUrl = String.format("notices/%s/%s", uid, saveNoticeDto.getFileName());
        nClass.setFileUrl(fileUrl);
        noticeRepo.save(nClass);

        var objKeys = new ArrayList<String>();
        objKeys.add(fileUrl);
        return storageService.getPresignedUrls(objKeys);
    }

    @GetMapping("/byRole")
        //@PostAuthorize("authentication.getPrincipal() == returnObject.role || null == returnObject.role")
    Page<NoticeListView> getNoticeList(Pageable page) {
        final var usrRoles = authFacade.getAuthentication().getAuthorities();
        Role usrRole;
        if (usrRoles.size() == 0)
            usrRole = null;

        else {
            final ArrayList<GrantedAuthority> roleList = new ArrayList<>(usrRoles);
            usrRole = Role.valueOf(roleList.get(0).getAuthority());
        }
        return noticeRepo.getNoticesListByRoleAndStatus(usrRole, page)
                         .map(notice -> mapper.map(notice, NoticeListView.class));
    }

    @GetMapping("/{noticeId}")
        //@PostAuthorize("authentication.getPrincipal() == returnObject.role || null == returnObject.role")
    NoticeDetailView getNoticeDetailView(@PathVariable long noticeId) {
        final var notice = noticeRepo.findById(noticeId).orElseThrow();
        return mapper.map(notice, NoticeDetailView.class);
    }

    @DeleteMapping("/{noticeId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
        //@PreAuthorize("hasRole('ROLE_ADMIN')")
    void deleteNoticeById(@PathVariable long noticeId) {
        authFacade.assertAdmin();
        noticeRepo.deleteById(noticeId);
    }

    @DeleteMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Transactional
    void deleteNotices(@RequestBody Long[] ids){
        authFacade.assertAdmin();
        for (Long i:ids
             ) {
            noticeRepo.deleteById(i);
        }
    }

}
