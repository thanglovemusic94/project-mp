package com.mintpot.carcloth.controller.admin;

import com.mintpot.carcloth.dto.admin.SaveFaqDto;
import com.mintpot.carcloth.dto.admin.SaveFaqOrder;
import com.mintpot.carcloth.entity.FAQ;
import com.mintpot.carcloth.exception.CommonException;
import com.mintpot.carcloth.exception.ErrorCode;
import com.mintpot.carcloth.repository.FAQRepository;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@Api(tags = {"FAQ"})
@RequiredArgsConstructor
public class FAQController {

    private final FAQRepository faqRepo;
    private final ModelMapper mapper;


//    public Page<FAQ> list(Pageable page) {
//        var sort = Sort.by("position").descending().and(Sort.by("createdOn").descending());
//        page = PageRequest.of(page.getPageNumber(), page.getPageSize(), sort);
//        return faqRepo.findAll(page);
//    }

    @GetMapping("/api/faqs")
    public List<FAQ> list() {
        var sort = Sort.by("position").descending().and(Sort.by("createdOn").descending());
        return faqRepo.findAll(sort);
    }

    @PatchMapping("/api/admin/faqs")
    @Transactional
    public void changeOrder(@RequestBody List<SaveFaqOrder> faqs) {
        var maxPosition = Long.MIN_VALUE;
        for (var faq : faqs) {
            if (faq.getPosition() > maxPosition) {
                maxPosition = faq.getPosition();
            }
        }

        for (var faq : faqs) {
            var faqEntity = faqRepo.findById(faq.getId())
                    .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));
            faqEntity.setPosition(maxPosition--);
            faqRepo.save(faqEntity);
        }
    }

    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/api/admin/faqs")
    @ResponseStatus(HttpStatus.CREATED)
    public FAQ register(@RequestBody @Valid SaveFaqDto faqDto) {
        var faq = mapper.map(faqDto, FAQ.class);
        faq.setPosition(0L);
        var highestFaq = faqRepo.findFirstByOrderByPositionDesc();
        highestFaq.ifPresent(value -> faq.setPosition(value.getPosition() + 1));
        return faqRepo.save(faq);
    }

    @GetMapping("/api/admin/faqs/{faqId}")
    public FAQ detail(@PathVariable long faqId) {
        var faq = faqRepo.findById(faqId)
                .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));
        return faq;
    }

    @PutMapping("/api/admin/faqs/{faqId}")
    public FAQ edit(@PathVariable long faqId,
                    @RequestBody @Valid SaveFaqDto faqDto) {
        var faq = faqRepo.findById(faqId)
                .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));
        faq.setContent(faqDto.getContent());
        faq.setTitle(faqDto.getTitle());
        return faqRepo.save(faq);
    }

    @DeleteMapping("/api/admin/faqs/{faqId}")
    public void removeFaq(@PathVariable long faqId) {
        var faq = faqRepo.findById(faqId)
                .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));
        faqRepo.delete(faq);
    }
}