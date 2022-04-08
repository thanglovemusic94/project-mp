package com.mintpot.readingm.backend.service;

import com.mintpot.readingm.backend.dto.admin.RefundDto;
import com.mintpot.readingm.backend.dto.admin.SaveRefundDto;
import com.mintpot.readingm.backend.entity.Refund;
import com.mintpot.readingm.backend.entity.constant.PaymentMethod;
import com.mintpot.readingm.backend.entity.constant.RefundStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.util.Optional;

public interface RefundService {
    RefundDto convertEntityToDto(Refund entity);

    void createRefund(SaveRefundDto dto);

    void updateRefundStatus(long id, RefundStatus status);

    Optional<Refund> getRefundById(Long refundId);

    Page<RefundDto> findBySpec(Specification<Refund> query, Pageable page);

    Page<RefundDto> search(LocalDate start, LocalDate end, RefundStatus status, PaymentMethod method,
                           String optionSearch, String query, Pageable page);

}
