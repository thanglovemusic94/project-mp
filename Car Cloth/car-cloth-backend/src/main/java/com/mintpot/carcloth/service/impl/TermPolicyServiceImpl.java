package com.mintpot.carcloth.service.impl;

import com.mintpot.carcloth.dto.term.TermsPolicyDto;
import com.mintpot.carcloth.entity.TermsPolicy;
import com.mintpot.carcloth.repository.TermsPolicyRepository;
import com.mintpot.carcloth.service.TermsPolicyService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TermPolicyServiceImpl implements TermsPolicyService {

    private final TermsPolicyRepository termsPolicyRepo;
    private final ModelMapper mapper;

    @Override
    public TermsPolicy getTermsPolicy() {

        var termsPolicy = termsPolicyRepo.findAll();

        if(termsPolicy == null || termsPolicy.isEmpty()) {
            return new TermsPolicy();
        } else {
            return termsPolicy.get(0);
        }
    }

    @Override
    public void updateTermsPolicy(TermsPolicyDto dto) {
        var entity = new TermsPolicy();

        var termsPolicy = termsPolicyRepo.findAll();

        if(termsPolicy != null && !termsPolicy.isEmpty()) {
            entity = termsPolicy.get(0);
        }
        //set data update
        entity.setServicePolicy(dto.getServicePolicy());
        entity.setRefundPolicy(dto.getRefundPolicy());
        entity.setPrivacyStatement(dto.getPrivacyStatement());

        termsPolicyRepo.save(entity);
    }
}
