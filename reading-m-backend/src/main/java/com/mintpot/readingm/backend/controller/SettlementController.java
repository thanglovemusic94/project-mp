package com.mintpot.readingm.backend.controller;

import com.mintpot.readingm.backend.dto.settlement.SettlementListDto;
import com.mintpot.readingm.backend.dto.settlement.SettlementWrapDetailDto;
import com.mintpot.readingm.backend.dto.settlement.TutorSettlementDto;
import com.mintpot.readingm.backend.entity.constant.ClassType;
import com.mintpot.readingm.backend.entity.constant.SettlementStatus;
import com.mintpot.readingm.backend.entity.user.Tutor;
import com.mintpot.readingm.backend.exception.CommonException;
import com.mintpot.readingm.backend.exception.ErrorCode;
import com.mintpot.readingm.backend.repository.TutorRepository;
import com.mintpot.readingm.backend.security.AuthenticationFacade;
import com.mintpot.readingm.backend.service.SettlementService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/settlement")
@Api(tags = {"Settlement"})
@RequiredArgsConstructor
public class SettlementController {
    private final SettlementService settlementService;

    private final AuthenticationFacade authenticationFacade;

    private final TutorRepository tutorRepo;

    @GetMapping
    @ApiOperation(value = "" , notes = "date format yyyy-MM-dd")
    public Page<SettlementListDto> settlementViews(
            @RequestParam(required = false) ClassType classType,
            @RequestParam(required = false) SettlementStatus settlementStatus,
            @RequestParam(required = false) String tutorName,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startTime,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endTime,
            @RequestParam(required = false) String optionSearch,
            @RequestParam(required = false) String term,
            Pageable pageable) {

        authenticationFacade.assertAdmin();
        return settlementService.searchSettlement(classType, settlementStatus, tutorName,
            startTime, endTime, optionSearch, term, pageable);
    }

    @GetMapping("/byTutor")
    public Page<TutorSettlementDto> findByTutor(Pageable page) {
        long userId = 0L;
        try {
            userId = authenticationFacade.getAuthentication().getUserId();
        } catch (ClassCastException ex) {

        }

        var tutor = tutorRepo.findById(userId);
        if (tutor.isEmpty() || userId == 0L) {
            throw new CommonException(ErrorCode.USER_NOT_ALLOWED);
        }
        return settlementService.findByTutor(userId, page);
    }

    @GetMapping("/detail/{id}")
    public SettlementWrapDetailDto getDetail(@PathVariable long id) {
        return new SettlementWrapDetailDto(settlementService.getDetail(id), settlementService.groupAttend(id));
    }

    @PatchMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void completeSettlement(@PathVariable long id) {
        authenticationFacade.assertAdmin();
        settlementService.completeSettlement(id);
    }

    @GetMapping("/download")
    public ResponseEntity<Resource> download(@RequestParam List<Long> ids) throws Exception {
        authenticationFacade.assertAdmin();
        String fileName = String.format("SettlementList_%s.xlsx", new SimpleDateFormat("yyyyMMdd").format(new Date()));
        ByteArrayResource resource = new ByteArrayResource(settlementService.exportExcel(ids));
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                .contentLength(resource.contentLength())
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
    }
}
