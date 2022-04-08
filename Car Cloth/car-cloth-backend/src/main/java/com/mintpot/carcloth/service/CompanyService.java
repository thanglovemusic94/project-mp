package com.mintpot.carcloth.service;

import com.mintpot.carcloth.constant.enums.ERegistrationStatus;
import com.mintpot.carcloth.constant.enums.EUsageStatus;
import com.mintpot.carcloth.dto.Review;
import com.mintpot.carcloth.dto.company.*;
import com.mintpot.carcloth.dto.enums.EAdApplicantFilterSearch;
import com.mintpot.carcloth.dto.enums.EAdCompanyFilterSearch;
import com.mintpot.carcloth.entity.Company;
import com.mintpot.carcloth.entity.embeddable.FileInfo;
import org.quartz.SchedulerException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CompanyService {
    Page<AdminCompany> getCompanyList(EUsageStatus usageStatus, EAdCompanyFilterSearch optionSearch,
                                      String term, Pageable pageable);

    AdminCompanyDetail getCompanyById(long id);

    Page<AdminApplicant> getApplicantList(ERegistrationStatus processingStatus,
                                          EAdApplicantFilterSearch optionSearch, String term, Pageable pageable);

    AdminApplicantDetail getApplicantById(long id);

    CompanyDetail getCompany(long id);

    FileInfo registerCompany(CompanyRegistration dto);

    CompanyRegistrationHistory getRegistrationHistory();

    FileInfo updateCompany(CompanyEditInfo dto);

    void withdraw();

    FileInfo reApply(CompanyRegistration dto);

    void cancelRegistration();

    void process(long id, AdminProcessDto dto);

    Company getCurrentCompany();

    void extension() throws SchedulerException;
}
