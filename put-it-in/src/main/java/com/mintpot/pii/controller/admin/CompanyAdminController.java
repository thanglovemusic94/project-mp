package com.mintpot.pii.controller.admin;

import com.mintpot.pii.dto.request.CompanyRQ;
import com.mintpot.pii.dto.response.BrandSearchAdminRP;
import com.mintpot.pii.dto.response.CompanyAdminRP;
import com.mintpot.pii.repository.CompanyRepository;
import com.mintpot.pii.service.CompanyAdminService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/* @author LinhNC */

@Log4j2
@RestController
@RequestMapping("/api/admin/companies")
@Api(tags = {"Admin-Company", "Store Company Management"})
//@PreAuthorize("hasAnyRole('ADMIN')")
@RequiredArgsConstructor
public class CompanyAdminController {
    private final CompanyAdminService companyService;
    private final CompanyRepository companyRepo;
    
    @GetMapping
    public Slice<CompanyAdminRP> listCompany(Pageable pageable) {
        return companyService.listCompany(pageable);
    }
    
    @GetMapping("/search")
    public Slice<CompanyAdminRP> search(@RequestParam String term, Pageable pageable) {
        return companyService.searchCompany(term,pageable);
    }
    
    @GetMapping("/searchBrand")
    public Slice<BrandSearchAdminRP> searchBrand(@RequestParam("term") String codeOrName, Pageable pageable) {
        return companyService.searchBrand(codeOrName,pageable);
    }
    
    // api detail Company exist in Customer User
    @DeleteMapping("/{companyId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<?> deleteCompany(@PathVariable final long companyId){
        companyRepo.deleteById(companyId);
        return ResponseEntity.ok("{\"message\":\"Delete success\"}");
    }

    @PatchMapping("/{companyId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateCompany(@PathVariable long companyId, @RequestBody CompanyRQ company){
        // throw BusinessException(ErrorCode....);
        company.setId(companyId);
        companyService.update(company);
    }
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED) 
    public void createCompany(@RequestBody @Valid CompanyRQ company){
        companyService.create(company);
    }
}
