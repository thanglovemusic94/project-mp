package com.mintpot.pii.controller;

import com.mintpot.pii.dto.InquiryDto;
import com.mintpot.pii.entity.Inquiry;
import com.mintpot.pii.entity.User;
import com.mintpot.pii.facade.AuthenticationFacade;
import com.mintpot.pii.repository.InquiryRepository;
import io.swagger.annotations.Api;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Pageable;
import java.util.List;

@RequestMapping("/api/inquiries")
@RestController
@Api("Inquiry")
public class InquiryController {

    private final AuthenticationFacade authFacade;

    private final InquiryRepository inquiryRepo;

    private final ModelMapper modelMapper;

    public InquiryController(AuthenticationFacade authFacade, InquiryRepository inquiryRepo, ModelMapper modelMapper) {
        this.authFacade = authFacade;
        this.inquiryRepo = inquiryRepo;
        this.modelMapper = modelMapper;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ROLE_USER')")
    Page<Inquiry> getInquiry(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ){
        var userId = authFacade.getAuthentication().getUserId();
        return inquiryRepo.findByUserId(userId, PageRequest.of(page, size, Sort.by("createdOn").descending()));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ADMIN')")
    void createInquiry(@RequestBody InquiryDto inquiryDto) {
        Inquiry inquiry = new Inquiry();
        if (authFacade.hasRole("ROLE_USER")) {
            inquiry = modelMapper.map(inquiryDto, Inquiry.class);
            final var userId = authFacade.getAuthentication().getUserId();
            inquiry.setUser(new User(userId));
        }
        inquiryRepo.save(inquiry);
    }
}
