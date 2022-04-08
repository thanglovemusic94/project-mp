package com.mintpot.readingm.backend.controller;

import com.mintpot.readingm.backend.dto.admin.AdTutorApplicationView;
import com.mintpot.readingm.backend.entity.constant.TutorApplicationStatus;
import com.mintpot.readingm.backend.entity.constant.TutorType;
import com.mintpot.readingm.backend.entity.user.Tutor;
import com.mintpot.readingm.backend.exception.CommonException;
import com.mintpot.readingm.backend.exception.ErrorCode;
import com.mintpot.readingm.backend.repository.TutorApplicationRepository;
import com.mintpot.readingm.backend.repository.TutorRepository;
import com.mintpot.readingm.backend.security.AuthenticationFacade;
import com.mintpot.readingm.backend.user.UserStatus;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.util.Strings;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@Api(tags = {"Tutor Application"})
@RequestMapping("/api/tutorApplications")
@RequiredArgsConstructor
public class TutorApplicationController {

    private final TutorApplicationRepository tutorApplicationRepo;
    private final AuthenticationFacade authenticationFacade;

    private final TutorRepository tutorRepository;
    @GetMapping
    Page<AdTutorApplicationView> findByQuery(@RequestParam(required = false) TutorApplicationStatus status,
                                             @RequestParam(required = false) String optionSearch,
                                             @RequestParam(required = false) String query,
                                             Pageable page) {
        authenticationFacade.assertAdmin();
        String tutorName = null;
        String phone = null;
        String email = null;

        if(!Strings.isBlank(optionSearch)) {
            if("tutorName".equals(optionSearch)) {
                tutorName = query;
                query = null;
            }else if("phone".equals(optionSearch)) {
                phone = query;
                query = null;
            }else if("email".equals(optionSearch)) {
                email = query;
                query = null;
            }
        }
        return tutorApplicationRepo.search(status, tutorName, phone, email, query, page);
    }

    @PostMapping("/{tutorApplicationId}/approve")
    @Transactional
    @ApiOperation(value = "Approve or Refuse Application", notes = "approvedType is null means that is a refusal.")
    void approve(@PathVariable long tutorApplicationId, @RequestBody ApplicationApprovalDto type) {
        authenticationFacade.assertAdmin();
        var tutorApp = tutorApplicationRepo.findById(tutorApplicationId).orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));

        if (type.getApprovedType() != null) {
            // Approve
            tutorApp.setStatus(TutorApplicationStatus.APPROVED);
            long tutorId = tutorApp.getTutor().getId();
            Tutor tutor = tutorRepository.findById(tutorId).orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));
            tutor.setStatus(UserStatus.ACTIVATED);
            tutor.setTutorType(type.getApprovedType());
            tutorRepository.save(tutor);
        } else {
            // Refuse
            tutorApp.setStatus(TutorApplicationStatus.REFUSED);
        }

        tutorApplicationRepo.save(tutorApp);

    }

   @Data
   @AllArgsConstructor
   @NoArgsConstructor
    static
    class ApplicationApprovalDto {
        private TutorType approvedType;
    }
}
