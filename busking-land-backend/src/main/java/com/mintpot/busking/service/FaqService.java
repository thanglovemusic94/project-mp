package com.mintpot.busking.service;

import com.mintpot.busking.dto.FAQEditDto;
import com.mintpot.busking.dto.FaqRegDto;
import com.mintpot.busking.dto.PageResponse;
import com.mintpot.busking.dto.web.response.FAQWebDTO;
import com.mintpot.busking.model.FAQ;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface FaqService {

    List<FAQ> getAllFaq();

    PageResponse<FAQWebDTO> pageFAQs (Pageable pageable);

    FAQWebDTO createFaq(FaqRegDto dto);

    FAQWebDTO getFaqDetails(int faqId);

    void deleteFAQById(int faqId);

    FAQWebDTO editFAQ(int faqId, FAQEditDto dto);
}
