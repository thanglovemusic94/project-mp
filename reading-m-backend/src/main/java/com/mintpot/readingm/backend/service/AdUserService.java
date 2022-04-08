package com.mintpot.readingm.backend.service;

import com.mintpot.readingm.backend.dto.admin.AdMemListDto;
import com.mintpot.readingm.backend.entity.constant.TutorType;
import com.mintpot.readingm.backend.user.Role;
import com.mintpot.readingm.backend.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Date;
import java.util.List;

public interface AdUserService {
    AdMemListDto getDetailMember(Long id);

    Page<AdMemListDto> getMemberList(TutorType tutorType, Role memberType, Date signupFrom, Date signupTo, String term, Pageable page);

    byte[] exportMembers(List<Long> ids) throws Exception;

    List<? extends User> transformUserByRole(List<User> users, Role role);
}
