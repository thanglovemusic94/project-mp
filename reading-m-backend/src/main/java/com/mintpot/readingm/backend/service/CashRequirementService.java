package com.mintpot.readingm.backend.service;

import com.mintpot.readingm.backend.dto.admin.SaveCashRequirementDto;
import com.mintpot.readingm.backend.dto.admin.CashRequirementDto;
import com.mintpot.readingm.backend.entity.CashRequirement;
import com.mintpot.readingm.backend.entity.CashStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.util.Optional;

public interface CashRequirementService {
    CashRequirementDto convertEntityToDto(CashRequirement entity);

    void createCashRequirement(SaveCashRequirementDto dto);

    void updateCashRequirementStatus(long id, CashStatus status);

    Optional<CashRequirement> getCashRequirementById(Long id);

    Page<CashRequirementDto> findBySpec(CashStatus status, String optionSearch, String query,
                                        LocalDate start, LocalDate end, Pageable page);
}
