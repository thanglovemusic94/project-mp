package com.mintpot.readingm.backend.service;

import com.mintpot.readingm.backend.dto.admin.WithdrawReqDto;
import com.mintpot.readingm.backend.dto.admin.WithdrawalDto;
import com.mintpot.readingm.backend.entity.Withdrawal;
import com.mintpot.readingm.backend.user.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface WithdrawalService {
    WithdrawalDto convertEntityToDto(Withdrawal entity);

    Page<WithdrawalDto> find(Role memberType, String optionSearch,  String term, Pageable page);

    void requestWithdraw(Long userId, WithdrawReqDto reqDto);

    void approveTutorWithdrawal(Long id);
}
