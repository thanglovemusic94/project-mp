package com.mintpot.busking.controller.web;

import com.mintpot.busking.dto.AnnouncementDTO;
import com.mintpot.busking.dto.FAQEditDto;
import com.mintpot.busking.dto.FaqRegDto;
import com.mintpot.busking.dto.PageResponse;
import com.mintpot.busking.dto.web.response.FAQWebDTO;
import com.mintpot.busking.model.Announcement;
import com.mintpot.busking.service.FaqService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = {"${settings.cors_origin}"})
@RestController
@RequestMapping(path = "/web/faq")
@Api(tags = {"Web FAQ Api"})
@Log4j2
public class FAQWebController {

    @Autowired
    private FaqService faqService;

    @ApiOperation(value = "Api Page FAQ")
    @GetMapping("")
    public PageResponse<FAQWebDTO> pageFAQs(@RequestParam(defaultValue = "0", required = false) Integer page,
                                            @RequestParam(defaultValue = "10", required = false) Integer size
                                            ){
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdOn").descending());
        return faqService.pageFAQs(pageable);
    }

    @ApiOperation("Get FAQ By Id")
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public FAQWebDTO getFAQById(@PathVariable("id") Integer id) {
       return faqService.getFaqDetails(id);
    }

    @ApiOperation("create FAQ")
    @PostMapping("")
    @ResponseStatus(HttpStatus.CREATED)
    public FAQWebDTO create(@Valid @RequestBody FaqRegDto body) {
        return faqService.createFaq(body);
    }


    @ApiOperation("Put FAQ")
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public FAQWebDTO update(@Valid @RequestBody FAQEditDto body, @PathVariable Integer id) {
        return  faqService.editFAQ(id,body);
    }

    @ApiOperation("Delete FAQ by id")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable Integer id) {
        faqService.deleteFAQById(id);
    }
}
