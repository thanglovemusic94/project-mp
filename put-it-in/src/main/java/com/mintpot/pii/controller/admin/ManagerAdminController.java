package com.mintpot.pii.controller.admin;

import com.mintpot.pii.dto.ManagerDto;
import com.mintpot.pii.dto.ManagerRpDto;
import com.mintpot.pii.repository.ManagerRepository;
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
@RequestMapping("/api/admin/manager")
@Api(tags = {"Admin-Company", "Manager Management"})
//@PreAuthorize("hasAnyRole('ADMIN')")
@RequiredArgsConstructor
public class ManagerAdminController {
    private final CompanyAdminService companyService;
    private final ManagerRepository managerRepo;
    
    
    @GetMapping
    public Slice<ManagerRpDto> listBranch(Pageable pageable) {
        return companyService.listManager(pageable);
    }
    
    //2. search
    @GetMapping("/searchManager")
    public Slice<ManagerRpDto> searchManager(@RequestParam String term, Pageable pageable) {
        return companyService.searchManager(term,pageable);
    }
    
      //3. delete
    @DeleteMapping("/{managerId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<?> deleteCompany(@PathVariable final long managerId){
        managerRepo.deleteById(managerId);
        return ResponseEntity.ok("{\"message\":\"Delete success\"}");
    }   
    
    //4. update
    @PatchMapping("/{managerId}")
    public ResponseEntity<Void> updateManager(@PathVariable long managerId, @RequestBody  ManagerDto managerDto) {
        managerDto.setManagerId(managerId);
        companyService.updateManager(managerDto);
        return ResponseEntity.noContent().build();
    }
    
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    void createBranch(@RequestBody ManagerDto managerDto) {
        companyService.createManager(managerDto);
    }
}
