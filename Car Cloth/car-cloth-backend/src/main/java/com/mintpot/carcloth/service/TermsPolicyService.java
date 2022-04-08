package com.mintpot.carcloth.service;

import com.mintpot.carcloth.dto.term.TermsPolicyDto;
import com.mintpot.carcloth.entity.TermsPolicy;

public interface TermsPolicyService {

    TermsPolicy getTermsPolicy();

    void updateTermsPolicy(TermsPolicyDto dto);
}
