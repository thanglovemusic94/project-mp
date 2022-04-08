package com.mintpot.busking.service.impl;

import com.mintpot.busking.dto.FAQEditDto;
import com.mintpot.busking.dto.FaqRegDto;
import com.mintpot.busking.dto.PageResponse;
import com.mintpot.busking.dto.web.response.FAQWebDTO;
import com.mintpot.busking.exception.BusinessException;
import com.mintpot.busking.exception.constant.ErrorCode;
import com.mintpot.busking.model.FAQ;
import com.mintpot.busking.repository.FaqRepository;
import com.mintpot.busking.repository.UserRepository;
import com.mintpot.busking.security.services.UserDetailsImpl;
import com.mintpot.busking.service.FaqService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

@Service
public class FaqServiceImpl implements FaqService {

    private final FaqRepository faqRepo;

    private final ModelMapper mapper;

    private final UserRepository userRepository;


    public FaqServiceImpl(FaqRepository faqRepo, ModelMapper mapper, UserRepository userRepository) {
        this.faqRepo = faqRepo;
        this.mapper = mapper;
        this.userRepository = userRepository;
    }

    @Override
    public List<FAQ> getAllFaq() {
        return faqRepo.getAllActivated();
    }

    @Override
//    @PreAuthorize("authentication.principal != null")
    public PageResponse<FAQWebDTO> pageFAQs(Pageable pageable) {
        Page<FAQ> faqs = faqRepo.findAll(pageable);
//        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        var user = userRepository.findByName(userDetails.getUsername()).orElseThrow(() -> new BusinessException(ErrorCode.ADMIN_NOT_EXIT));
        Page<FAQWebDTO> pageDTOs = faqs.map(new Function<FAQ, FAQWebDTO>() {
            @Override
            public FAQWebDTO apply(FAQ faq) {
                FAQWebDTO faqWebDTO = mapper.map(faq, FAQWebDTO.class);
                faqWebDTO.setUsername("admin");
                return faqWebDTO;
            }
        });

        return new PageResponse<>(pageDTOs);
    }

    @Override
    @Transactional
    public FAQWebDTO createFaq(FaqRegDto dto) {
        FAQ faqEnt = mapper.map(dto, FAQ.class);
        faqRepo.save(faqEnt);
        return getFaqWebDTO(faqEnt);
    }

    @Override
    public FAQWebDTO getFaqDetails(int faqId) {
        FAQ faq = faqRepo.findById(faqId).orElseThrow(() -> new BusinessException(ErrorCode.FAQ_NOT_FOUND));
        return getFaqWebDTO(faq);
    }

    @Override
    @Transactional
    public void deleteFAQById(int faqId) {
        faqRepo.deleteById(faqId);
    }

    @Override
    @Transactional
    public FAQWebDTO editFAQ(int faqId, FAQEditDto dto) {
        var faqEnt = faqRepo.findById(faqId)
                .orElseThrow(() -> new BusinessException(ErrorCode.FAQ_NOT_FOUND));

        if(!StringUtils.isEmpty(dto.getAnswer())) {
            faqEnt.setAnswer(dto.getAnswer());
        }

        if(!StringUtils.isEmpty(dto.getQuestion())) {
            faqEnt.setQuestion(dto.getQuestion());
        }

        FAQ faq = faqRepo.save(faqEnt);
        return getFaqWebDTO(faq);
    }

    private FAQWebDTO getFaqWebDTO(FAQ faq) {
        FAQWebDTO faqWebDTO = mapper.map(faq, FAQWebDTO.class);
//        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        var user = userRepository.findByName(userDetails.getUsername()).orElseThrow(() -> new BusinessException(ErrorCode.ADMIN_NOT_EXIT));
        faqWebDTO.setUsername("admin");
        return faqWebDTO;
    }


}
