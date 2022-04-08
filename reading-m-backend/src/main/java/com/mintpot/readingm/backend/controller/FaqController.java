package com.mintpot.readingm.backend.controller;

import com.mintpot.readingm.backend.dto.admin.AdFaqView;
import com.mintpot.readingm.backend.dto.admin.SaveFaqDto;
import com.mintpot.readingm.backend.entity.Faq;
import com.mintpot.readingm.backend.repository.FaqRepository;
import com.mintpot.readingm.backend.security.AuthenticationFacade;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@Api(tags = {"FAQ"})
@RequestMapping("/api/faqs")
@RequiredArgsConstructor
public class FaqController {

    private final FaqRepository faqRepo;
    private final AuthenticationFacade authenticationFacade;
    private final ModelMapper mapper;

    @GetMapping
    Page<AdFaqView> findByQuery(@RequestParam(required = false) String query, Pageable page) {
        return faqRepo.search(query, page);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    void postNewFaq(@RequestBody SaveFaqDto newFaqDto) {
        authenticationFacade.assertAdmin();
        var newFaq = mapper.map(newFaqDto, Faq.class);
        newFaq.setId(0);

        faqRepo.save(newFaq);
    }

    @GetMapping("/{faqId}")
    Optional<Faq> findById(@PathVariable long faqId) {
        authenticationFacade.assertAdmin();
        return faqRepo.findById(faqId);
    }

    @PatchMapping("/{faqId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void editFaq(@RequestBody SaveFaqDto faqDto, @PathVariable long faqId) {
        authenticationFacade.assertAdmin();
        var editFaq = mapper.map(faqDto, Faq.class);
        editFaq.setId(faqId);
        faqRepo.save(editFaq);
    }

    @DeleteMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void deleteById(@RequestParam List<Long> ids) {
        authenticationFacade.assertAdmin();
        if (ids != null) {
            ids.stream().forEach(id -> faqRepo.deleteById(id));
        }
    }
}
