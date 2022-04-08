package com.mintpot.readingm.backend.controller;

import com.mintpot.readingm.backend.dto.SaveInquiryDto;
import com.mintpot.readingm.backend.dto.admin.AdInquiryView;
import com.mintpot.readingm.backend.entity.Inquiry;
import com.mintpot.readingm.backend.entity.constant.InquiryStatus;
import com.mintpot.readingm.backend.entity.constant.InquiryType;
import com.mintpot.readingm.backend.exception.CommonException;
import com.mintpot.readingm.backend.exception.ErrorCode;
import com.mintpot.readingm.backend.repository.InquiryRepository;
import com.mintpot.readingm.backend.security.AuthenticationFacade;
import com.mintpot.readingm.backend.user.Role;
import com.mintpot.readingm.backend.user.UserRepository;
import io.swagger.annotations.Api;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.apache.logging.log4j.util.Strings;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@RestController
@Api(tags = {"Inquiry"})
@RequestMapping("/api/inquiries")
@RequiredArgsConstructor
public class InquiryController {

    private final InquiryRepository inquiryRepo;
    private final AuthenticationFacade authenticationFacade;
    private final ModelMapper mapper;
    private final UserRepository userRepo;

    @GetMapping
    Page<AdInquiryView> findByQuery(@RequestParam(required = false) String term,
                                    @RequestParam(required = false) String optionSearch,
                                    @RequestParam(required = false) InquiryType type,
                                    @RequestParam(required = false) Role role,
                                    @RequestParam(required = false) InquiryStatus status,
                                    Pageable page) {

        authenticationFacade.assertAdmin();
        String inquiry = null;
        String writer = null;

        if(!Strings.isBlank(optionSearch)) {
            if("inquiry".equals(optionSearch)) {
                inquiry = term;
                term = null;
            }else if("writer".equals(optionSearch)) {
                writer = term;
                term = null;
            }
        }

        Page<AdInquiryView> rsSearch = inquiryRepo.search(type, role, status, inquiry, writer, term, page);

        return rsSearch;

    }

    @GetMapping("/{inquiryId}")
    Optional<Inquiry> findById(@PathVariable long inquiryId) {
        authenticationFacade.assertAdmin();
        return inquiryRepo.findById(inquiryId);
    }

    @GetMapping("/byQuestioner")
    Page<AdInquiryView> findByQuestioner(Pageable page) {
        long userId = 0L;
        try {
            userId = authenticationFacade.getAuthentication().getUserId();
        } catch (ClassCastException ex) {

        }

        return inquiryRepo.findByQuestioner_Id(userId, page);
    }

    @GetMapping("/types")
    List<InquiryType> getTypes() {
        return Arrays.asList(InquiryType.values());
    }

    @PostMapping
    public void createInquiry(@RequestBody @Valid SaveInquiryDto inquiryDto) {
        var inquiry = mapper.map(inquiryDto, Inquiry.class);
        long userId = authenticationFacade.getAuthentication().getUserId();
        var user = userRepo.findById(userId).orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));
        inquiry.setStatus(InquiryStatus.UNANSWERED);
        inquiry.setQuestioner(user);
        inquiryRepo.save(inquiry);
    }

    @PostMapping("/{inquiryId}/answer")
    void answerInquiry(@PathVariable long inquiryId, @RequestBody AnswerInquiryDto answerDto) {
        authenticationFacade.assertAdmin();
        var inquiry = inquiryRepo.findById(inquiryId).orElseThrow();
        inquiry.setAnswer(answerDto.getAnswer());
        inquiry.setStatus(InquiryStatus.ANSWERED);
        inquiryRepo.save(inquiry);
    }

    @DeleteMapping("/{inquiryId}")
    public void delete(@PathVariable long inquiryId) {
        long userId = authenticationFacade.getAuthentication().getUserId();
        var inquiry = inquiryRepo.findById(inquiryId).orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));
        if (inquiry.getQuestioner().getId() != userId
                || inquiry.getStatus() == InquiryStatus.ANSWERED) {
            throw new CommonException(ErrorCode.USER_NOT_ALLOWED);
        }

        inquiryRepo.delete(inquiry);
    }

    @Getter
    @Setter
    static class AnswerInquiryDto {

        private String answer;

    }
}
