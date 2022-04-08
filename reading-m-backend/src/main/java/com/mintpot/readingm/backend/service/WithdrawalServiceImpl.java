package com.mintpot.readingm.backend.service;

import com.mintpot.readingm.backend.dto.admin.WithdrawReqDto;
import com.mintpot.readingm.backend.dto.admin.WithdrawalDto;
import com.mintpot.readingm.backend.entity.Withdrawal;
import com.mintpot.readingm.backend.entity.constant.WithdrawalStatus;
import com.mintpot.readingm.backend.exception.CommonException;
import com.mintpot.readingm.backend.exception.ErrorCode;
import com.mintpot.readingm.backend.repository.WithdrawalRepository;
import com.mintpot.readingm.backend.user.Role;
import com.mintpot.readingm.backend.user.User;
import com.mintpot.readingm.backend.user.UserRepository;
import com.mintpot.readingm.backend.user.UserStatus;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.util.Strings;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WithdrawalServiceImpl implements WithdrawalService {

    private final WithdrawalRepository withdrawalRepository;

    private final UserRepository userRepository;

    private final ModelMapper mapper;

    private final PasswordEncoder passwordEncoder;

    @Override
    public WithdrawalDto convertEntityToDto(Withdrawal entity) {
        WithdrawalDto dto = mapper.map(entity, WithdrawalDto.class);
        User withdrawalPerson = entity.getWithdrawalPerson();
        dto.setName(withdrawalPerson.getName());
        dto.setMemberType(withdrawalPerson.getRole().toString());
        return dto;
    }

    @Override
    public Page<WithdrawalDto> find(Role memberType, String optionSearch, String term, Pageable page) {
        String userName = null;
        String reason = null;

        if(!Strings.isBlank(optionSearch)) {
            if("userName".equals(optionSearch)) {
                userName = term;
                term = null;
            } else if ("reason".equals(optionSearch)) {
                reason = term;
                term = null;
            }
        }
        return withdrawalRepository.findByTerm(memberType, userName, reason, term, page)
            .map(this::convertEntityToDto);
    }

    @Override
    public void requestWithdraw(Long userId, WithdrawReqDto reqDto) {
        Withdrawal entity = new Withdrawal();
        entity.setReason(reqDto.getReason());
        User user = userRepository.findById(userId).orElseThrow(() -> new CommonException(ErrorCode.USER_NOT_EXIST));
        entity.setWithdrawalPerson(user);

        if (!passwordEncoder.matches(reqDto.getPassword(), user.getPassword())) {
            throw new CommonException(ErrorCode.USER_WRONG_CURRENT_PASSWORD);
        }

        if (user.getRole() != Role.TUTOR) {
            user.setStatus(UserStatus.UNACTIVATED);
        }

        entity.setStatus(user.getRole() == Role.TUTOR ? WithdrawalStatus.WAITING : WithdrawalStatus.COMPLETED);
        userRepository.save(user);
        withdrawalRepository.save(entity);
    }

    @Override
    public void approveTutorWithdrawal(Long id) {
        Withdrawal withdrawal = withdrawalRepository.getOne(id);
        User user = withdrawal.getWithdrawalPerson();
        user.setStatus(UserStatus.UNACTIVATED);
        userRepository.save(user);
        withdrawal.setStatus(WithdrawalStatus.APPROVED);
        withdrawalRepository.save(withdrawal);
    }
}
