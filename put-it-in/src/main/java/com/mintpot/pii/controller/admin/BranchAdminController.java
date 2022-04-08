package com.mintpot.pii.controller.admin;

import com.mintpot.pii.dto.RegBranchDto;
import com.mintpot.pii.dto.request.UpdBranchDto;
import com.mintpot.pii.dto.response.BranchAdminRP;
import com.mintpot.pii.repository.BranchRepository;
import com.mintpot.pii.s3.dto.PresignedImagesInfoDto;
import com.mintpot.pii.service.CompanyAdminService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/* @author linhnc@mintpot.vn */

@Log4j2
@RestController
@RequestMapping("/api/admin/branches")
@Api(tags = {"Admin-Company", "Branch Management"})
//@PreAuthorize("hasAnyRole('ADMIN')")
@RequiredArgsConstructor
public class BranchAdminController {
    private final BranchRepository branchRepo;
    private final CompanyAdminService companyService;
    
    //---- BRANCH -----
    @GetMapping
    public Slice<BranchAdminRP> listBranch(Pageable pageable) {
        return companyService.listBranch(pageable);
    }
    
    // search branch for ADMIN branch_manage.home
    @GetMapping("/searchBranch")
    public Slice<BranchAdminRP> searchBranch(@RequestParam String term, Pageable pageable) {
        return companyService.searchBranch(term,pageable);
    }

    @DeleteMapping("/{branchId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<?> deleteCompany(@PathVariable final long branchId){
        branchRepo.deleteById(branchId);
        return ResponseEntity.ok("{\"message\":\"Delete success\"}");
    }
    
    @PatchMapping("/{branchId}")
    public ResponseEntity<?> updateBranch(@PathVariable long branchId, @RequestBody UpdBranchDto updBranchdto) {
        updBranchdto.setBranchId(branchId);
        companyService.updateBranch(updBranchdto);
        return ResponseEntity.noContent().build();
    }
    
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    PresignedImagesInfoDto createBranch(@RequestBody RegBranchDto regBranchDto) {
        PresignedImagesInfoDto output ;
        output = companyService.createBranch(regBranchDto);
        return output;
    }
}
