package com.mintpot.busking.controller.api;

import com.mintpot.busking.dto.SliceDto;
import com.mintpot.busking.model.FAQ;
import com.mintpot.busking.service.FaqService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Api(tags = { "FAQ Api" })
@RequestMapping(path = "/faq")
@Log4j2
public class FAQController {

    private final FaqService faqService;


    public FAQController(FaqService faqService) {
        this.faqService = faqService;
    }

    @GetMapping("")
    @ApiOperation("Get All FAQ")
    SliceDto<FAQ> getAllFAQ ()  {
        List<FAQ> faqs = faqService.getAllFaq();
        return SliceDto.of(faqs, false);
    }
}
