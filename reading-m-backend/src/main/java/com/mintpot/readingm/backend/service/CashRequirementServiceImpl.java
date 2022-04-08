package com.mintpot.readingm.backend.service;

import com.mintpot.readingm.backend.dto.admin.CashRequirementDto;
import com.mintpot.readingm.backend.dto.admin.SaveCashRequirementDto;
import com.mintpot.readingm.backend.entity.CashRequirement;
import com.mintpot.readingm.backend.entity.CashStatus;
import com.mintpot.readingm.backend.exception.CommonException;
import com.mintpot.readingm.backend.exception.ErrorCode;
import com.mintpot.readingm.backend.repository.CashRequirementRepository;
import com.mintpot.readingm.backend.repository.ParentRepository;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.util.Strings;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CashRequirementServiceImpl implements CashRequirementService {

    private final CashRequirementRepository cashRequirementRepository;

    private final ParentRepository parentRepository;

    private final ModelMapper modelMapper;

    @Override
    public CashRequirementDto convertEntityToDto(CashRequirement entity) {
        CashRequirementDto dto = modelMapper.map(entity, CashRequirementDto.class);
        dto.setRequirementTime(entity.getCreatedOn());
        return dto;
    }

    private CashRequirement convertDtoToEntity(SaveCashRequirementDto dto) {
        CashRequirement entity = modelMapper.map(dto, CashRequirement.class);
        entity.setStatus(CashStatus.CASH_REQUEST);
        entity.setUser(parentRepository.findById(dto.getParentId())
                .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND)));
        return entity;
    }

    @Override
    public void createCashRequirement(SaveCashRequirementDto dto) {
        cashRequirementRepository.save(convertDtoToEntity(dto));
    }

    @Override
    @Transactional
    public void updateCashRequirementStatus(long id, CashStatus status) {
        var cashRequire = cashRequirementRepository.findById(id)
                .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));
        if (status == CashStatus.CASH_COMPLETE) {
            cashRequire.setCompletionTime(LocalDateTime.now());
        }
        cashRequirementRepository.updateStatusById(id, status);
    }

    @Override
    public Optional<CashRequirement> getCashRequirementById(Long id) {
        return cashRequirementRepository.findById(id);
    }

    @Override
    public Page<CashRequirementDto> findBySpec(CashStatus status, String optionSearch, String term,
                                               LocalDate start, LocalDate end, Pageable page) {

        String userName = null;
        String point = null;

        if(!Strings.isBlank(optionSearch)) {
            if("userName".equals(optionSearch)) {
                userName = term;
                term = null;
            } else if("point".equals(optionSearch)) {
                point = term;
                term = null;
            }
        }

        LocalDateTime startTime = start != null ? LocalDateTime.of(start, LocalTime.of(0, 0, 0)) : null;
        LocalDateTime endTime = end != null ? LocalDateTime.of(end, LocalTime.of(23, 59, 59)) : null;

        return cashRequirementRepository.search(status, userName, point, term, startTime, endTime, page)
                .map(this::convertEntityToDto);
    }
}
