package com.mintpot.carcloth.service.impl;

import com.mintpot.carcloth.constant.Constants;
import com.mintpot.carcloth.constant.UserStatus;
import com.mintpot.carcloth.constant.enums.EActivateStatus;
import com.mintpot.carcloth.dto.AccountSetting;
import com.mintpot.carcloth.dto.FAQInfo;
import com.mintpot.carcloth.dto.MemberInfo;
import com.mintpot.carcloth.entity.Member;
import com.mintpot.carcloth.entity.Notification;
import com.mintpot.carcloth.entity.embeddable.NoticeSetting;
import com.mintpot.carcloth.exception.CommonException;
import com.mintpot.carcloth.exception.ErrorCode;
import com.mintpot.carcloth.repository.CompanyGroupRepository;
import com.mintpot.carcloth.repository.FAQRepository;
import com.mintpot.carcloth.repository.MemberRepository;
import com.mintpot.carcloth.security.AuthenticationFacade;
import com.mintpot.carcloth.security.UserDetails;
import com.mintpot.carcloth.service.CompanyService;
import com.mintpot.carcloth.service.MyPageService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class MyPageServiceImpl implements MyPageService {

    private final CompanyService companyService;
    private final AuthenticationFacade authenticationFacade;
    private final MemberRepository memberRepo;
    private final CompanyGroupRepository companyGroupRepo;
    private final FAQRepository faqRepo;
    private final ModelMapper mapper;

    @Override
    public MemberInfo getMemberInfo() {
        var member = getCurrentUser();
        var memberInfo = mapper.map(member, MemberInfo.class);

        var companyGroup = member.getGroup();
        if(companyGroup == null) {
            companyGroup = companyGroupRepo.findByName(Constants.GENERAL_GROUP)
                    .orElseThrow(() -> new CommonException(ErrorCode.COMPANY_GROUP_NOT_FOUND_GG));
        }

        memberInfo.setFee(companyGroup.getFee());
        memberInfo.setDeliveryCost(companyGroup.getDeliveryCost());

        var company = member.getCompany();
        if(company != null) {
            memberInfo.setCompanyId(company.getId());
            memberInfo.setRegisteredCompany(true);
            memberInfo.setCompanyStatus(company.getProcessingStatus());
            if(company.getExpiredDateTime() != null) {
                memberInfo.setExpired(company.getExpiredDateTime().toLocalDate().isAfter(LocalDate.now())
                        ? false : true);
            } else {
                memberInfo.setExpired(true);
            }
        }

        return memberInfo;
    }

    @Override
    public AccountSetting getAccountInfo() {
        var account = getCurrentUser();

        return mapper.map(account, AccountSetting.class);
    }

    @Override
    public NoticeSetting getNoticeSetting() {
        return getCurrentUser().getNoticeSetting() == null ?
                new NoticeSetting() :
                mapper.map(getCurrentUser().getNoticeSetting(), NoticeSetting.class);
    }

    @Override
    public void setupNoticeSetting(NoticeSetting setting) {
        var user = getCurrentUser();

        user.setNoticeSetting(setting);
        memberRepo.save(user);
    }

    @Override
    public Page<FAQInfo> getFAQs(Pageable pageable) {
        var sort = Sort.by("position").descending().and(Sort.by("createdOn").descending());
        Pageable paging = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort);

        var faqs = faqRepo.findAll(paging);

        return faqs.map(f -> mapper.map(f, FAQInfo.class));
    }

    @Override
    public void withdraw() {
        var user = getCurrentUser();

        user.setStatus(UserStatus.INACTIVATED);

        memberRepo.save(user);
    }

    private Member getCurrentUser() {
        UserDetails userDetails = authenticationFacade.getAuthentication();

        return memberRepo.findById(userDetails.getUserId())
                .orElseThrow(() -> new CommonException(ErrorCode.USER_NOT_FOUND));
    }
}
