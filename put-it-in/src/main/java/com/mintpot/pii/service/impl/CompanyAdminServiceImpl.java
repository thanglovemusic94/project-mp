package com.mintpot.pii.service.impl;

import com.mintpot.pii.dto.ManagerDto;
import com.mintpot.pii.dto.ManagerRpDto;
import com.mintpot.pii.dto.RegBranchDto;
import com.mintpot.pii.dto.request.CompanyRQ;
import com.mintpot.pii.dto.request.UpdBranchDto;
import com.mintpot.pii.dto.response.BranchAdminRP;
import com.mintpot.pii.dto.response.BrandSearchAdminRP;
import com.mintpot.pii.dto.response.CompanyAdminRP;
import com.mintpot.pii.entity.Branch;
import com.mintpot.pii.entity.Company;
import com.mintpot.pii.entity.Keyword;
import com.mintpot.pii.entity.Manager;
import com.mintpot.pii.entity.constant.CrudStatus;
import com.mintpot.pii.entity.embeddable.Representative;
import com.mintpot.pii.repository.BranchRepository;
import com.mintpot.pii.repository.CompanyRepository;
import com.mintpot.pii.repository.ManagerRepository;
import com.mintpot.pii.s3.dto.PresignedImagesInfoDto;
import com.mintpot.pii.service.CompanyAdminService;
import com.mintpot.pii.service.ImageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/* @author LinhNC */
@Service
@Log4j2
@RequiredArgsConstructor
public class CompanyAdminServiceImpl implements CompanyAdminService{

    private final CompanyRepository companyRepo;
    private final BranchRepository branchRepo;
    private final ImageService imageService;
    private final GeometryFactory geoFac;
    private final ManagerRepository managerRepo;

    @Override
    public Slice<CompanyAdminRP> listCompany(Pageable pageable) {
//        Slice<Company> company = companyRepo.findAllByCrudStatus(CrudStatus.CREATED,pageable);
        Slice<Company> company = companyRepo.findAll(pageable);
        List<CompanyAdminRP> content = company.get().map(com-> new CompanyAdminRP(com)).collect(Collectors.toList());
        Slice<CompanyAdminRP> comDto = new SliceImpl(content, company.getPageable(), company.hasNext());
        return comDto;
    }

    @Override
    public Slice<CompanyAdminRP> searchCompany(String term, Pageable pageable) {
        Slice<Company> company = companyRepo.findAllByTerm(term,CrudStatus.CREATED,pageable);
        List<CompanyAdminRP> content = company.get().map(com-> new CompanyAdminRP(com)).collect(Collectors.toList());
        Slice<CompanyAdminRP> comDto = new SliceImpl(content, company.getPageable(), company.hasNext());
        return comDto;
    }

    @Override
    public void update(CompanyRQ cNew) {
        log.info(">>>select Company by id");
        Company entity = companyRepo.getOne(cNew.getId());
//        Company entity = new Company(company.getId());
//        entity.setCode(company.getCode());            //Read ONLY
//        entity.setBrandName(company.getBrandName()); //Read ONLY
        if (cNew.getRegistrationName() != null) entity.setRegistrationName(cNew.getRegistrationName());
        if (cNew.getRegistrationNumber() != null) entity.setRegistrationNumber(cNew.getRegistrationNumber());
        if (cNew.getAddress() != null) entity.setAddress(cNew.getAddress());
        Representative represenNew = null;
        if (cNew.getRepresentativeName() != null || cNew.getRepresentativeEmail()!= null || cNew.getRepresentativeContact() != null){ 
            represenNew = new Representative(cNew.getRepresentativeName(), cNew.getRepresentativeContact(), cNew.getRepresentativeEmail());        
        }
        if (entity.getRepresentative() == null){
            entity.setRepresentative(represenNew);
        } else{
            Representative represenOld = entity.getRepresentative();
            if (cNew.getRepresentativeContact() != null) represenOld.setPhone(cNew.getRepresentativeContact());
            if (cNew.getRepresentativeEmail()!= null) represenOld.setEmail(cNew.getRepresentativeEmail());
            if (cNew.getRepresentativeName()!= null) represenOld.setName(cNew.getRepresentativeName());
        }
        entity.setSettlementCreditAccount(cNew.getSettlementCreditAccount());
        log.info(">>>select compan done, start Insert!"+cNew.getId());
        companyRepo.save(entity);
    }

    @Override
    public long create(CompanyRQ company) { 
        Company entity = new Company(); 
        //entity.setCode(code); Automatic assigned by: CompanyEntityListener.java before insert to DB
//        if (cNew.getBrandName() != null) entity.setBrandName(cNew.getBrandName());

        entity.setBrandName(company.getBrandName()); 
        entity.setRegistrationName(company.getRegistrationName());
        entity.setRegistrationNumber(company.getRegistrationNumber());
        entity.setAddress(company.getAddress());
        entity.setRepresentative(new Representative(company.getRepresentativeName(), company.getRepresentativeContact(), company.getRepresentativeEmail()));
        entity.setSettlementCreditAccount(company.getSettlementCreditAccount());
        log.info(">>>select compan done, start Insert!"+company.getId());
        companyRepo.save(entity);
        log.debug(">> save company done. id:"+entity.getId());
        return entity.getId();
    }
    
    // --- BRANCH ---
    @Override
    public Slice<BranchAdminRP> listBranch(Pageable pageable) {
        Slice<Branch> branch = branchRepo.findAllByCrudStatus(CrudStatus.CREATED,pageable);
        List<BranchAdminRP> content = branch.get().map(com-> new BranchAdminRP(com)).collect(Collectors.toList());
        Slice<BranchAdminRP> branchDto = new SliceImpl(content, branch.getPageable(), branch.hasNext());
        return branchDto;
    }

    @Override
    public Slice<BranchAdminRP> searchBranch(String term, Pageable pageable) {
        Slice<Branch> branch = branchRepo.findAllByTerm(term, CrudStatus.CREATED, pageable);
        List<BranchAdminRP> content = branch.get().map(com-> new BranchAdminRP(com)).collect(Collectors.toList());
        Slice<BranchAdminRP> branchRP = new SliceImpl(content, branch.getPageable(), branch.hasNext());
        return branchRP;
    }

    @Override
    public Slice<BrandSearchAdminRP> searchBrand(String codeOrName, Pageable pageable) {
        log.info(">>> key word:"+codeOrName);
        Slice<Company> coms = companyRepo.findAllByCodeOrName(codeOrName, CrudStatus.CREATED, pageable);
        List<BrandSearchAdminRP> content = coms.get().map(com-> new BrandSearchAdminRP(com)).collect(Collectors.toList());
        Slice<BrandSearchAdminRP> brandRP = new SliceImpl(content, coms.getPageable(), coms.hasNext());
        return brandRP;
    }
    
    @Override
    public PresignedImagesInfoDto createBranch(RegBranchDto regBranchDto) {
        var nBranch = regBranchDto.toEntity();
        
        // WARNING: location of branch is missing in ADMIN GUI!!!!
        nBranch.setLocation(geoFac.createPoint(new Coordinate(regBranchDto.getLatitude(), regBranchDto.getLongitude())));
        nBranch = branchRepo.save(nBranch);
        
        // update url img after general company_code and branch_code
        Branch branchFetch = branchRepo.getOne(nBranch.getId());
        branchFetch.setKeywords(regBranchDto.getKeywords().stream().map(key->new Keyword(key,branchFetch)).collect(Collectors.toSet()));
        List<String> branchSubUrl = imageService.generateBranchSubPhotoUrls(branchFetch.getCompany().getCode(),branchFetch.getCode(),regBranchDto.getImageCount());
        branchFetch.setSubPhotoUrls(branchSubUrl);
        branchRepo.save(branchFetch);
        return imageService.getBranchPhotoPresignedUrl(branchFetch.getCompany().getCode(),branchFetch.getCode());
    }

    @Override
    public void updateBranch(UpdBranchDto bNew) {
        Branch branch = branchRepo.getOne(bNew.getBranchId());
        if (bNew.getMainPhotoUrl() != null) branch.setMainPhotoUrl(bNew.getMainPhotoUrl());
        if (bNew.getAddressSimple() != null) branch.setAddressSimple(bNew.getAddressSimple());
        if (bNew.getAddressDetailed() != null) branch.setAddressDetailed(bNew.getAddressDetailed());
        if (bNew.getPhone() != null) branch.setPhone(bNew.getPhone());
        if (bNew.getAnnouncement() != null) branch.setAnnouncement(bNew.getAnnouncement());
        if (bNew.getBusinessInfo() != null) branch.setBusinessInfo(bNew.getBusinessInfo());
        if (bNew.getRefundPolicy() != null) branch.setRefundPolicy(bNew.getRefundPolicy());
        if (bNew.getKeywords()!= null) branch.setKeywords(bNew.getKeywords().stream().map(key->new Keyword(key,branch)).collect(Collectors.toSet()));
        
        //img_count = 0 for: delete all old img url
        List<String> branchSubUrl = imageService.generateBranchSubPhotoUrls(branch.getCompany().getCode(),branch.getCode(),bNew.getImageCount());
        branch.setSubPhotoUrls(branchSubUrl);
        branchRepo.save(branch);
    }

    //--- MANAGER ---
    @Override
    public Slice<ManagerRpDto> listManager(Pageable pageable) {
        Slice<Manager> manager = managerRepo.findAll(pageable);
        List<ManagerRpDto> content = manager.get().map(m-> new ManagerRpDto(m)).collect(Collectors.toList());
        Slice<ManagerRpDto> branchDto = new SliceImpl(content, manager.getPageable(), manager.hasNext());
        return branchDto;
    }
    @Override
    public Slice<ManagerRpDto> searchManager(String term, Pageable pageable) {
        Slice<Manager> manager = managerRepo.findAllByTerm(term, pageable);
        List<ManagerRpDto> content = manager.get().map(item-> new ManagerRpDto(item)).collect(Collectors.toList());
        Slice<ManagerRpDto> managers = new SliceImpl(content, manager.getPageable(), manager.hasNext());
        return managers;
    }

    @Override
    public void createManager(ManagerDto managerDto) {
        Manager mEntity = managerDto.toEntity();
        managerRepo.save(mEntity);
    }

    @Override
    public void updateManager(ManagerDto manager) {
    Manager managerOld = managerRepo.getOne(manager.getManagerId());
        managerOld.setCompany(new Company(manager.getCompanyId()));
        if (manager.getManagerName()!= null ) managerOld.setName(manager.getManagerName());
        if (manager.getPosition() != null ) managerOld.setPosition(manager.getPosition());
        if (manager.getEmail() != null ) managerOld.setEmail(manager.getEmail());
        if (manager.getPhone() != null ) managerOld.setPhone(manager.getPhone());
        managerRepo.save(managerOld);
    }
}
