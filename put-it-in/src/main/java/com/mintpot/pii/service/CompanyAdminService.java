package com.mintpot.pii.service;

import com.mintpot.pii.dto.ManagerDto;
import com.mintpot.pii.dto.ManagerRpDto;
import com.mintpot.pii.dto.RegBranchDto;
import com.mintpot.pii.dto.request.CompanyRQ;
import com.mintpot.pii.dto.request.UpdBranchDto;
import com.mintpot.pii.dto.response.BranchAdminRP;
import com.mintpot.pii.dto.response.BrandSearchAdminRP;
import com.mintpot.pii.dto.response.CompanyAdminRP;
import com.mintpot.pii.s3.dto.PresignedImagesInfoDto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

/* @author LinhNC */

public interface CompanyAdminService {
    Slice<CompanyAdminRP> listCompany(Pageable pageable);

    Slice<CompanyAdminRP> searchCompany(String term, Pageable pageable);

    public void update(CompanyRQ company);

    public long create(CompanyRQ company);

    public Slice<BranchAdminRP> listBranch(Pageable pageable);

    public Slice<BranchAdminRP> searchBranch(String term, Pageable pageable);

    public PresignedImagesInfoDto createBranch(RegBranchDto regBranchDto);

    public Slice<BrandSearchAdminRP> searchBrand(String codeOrName, Pageable pageable);

    public void updateBranch(UpdBranchDto updBranchDto);

    public Slice<ManagerRpDto> listManager(Pageable pageable);

    public void createManager(ManagerDto managerDto);

    public Slice<ManagerRpDto> searchManager(String term, Pageable pageable);

    public void updateManager(ManagerDto managerDto);
}
