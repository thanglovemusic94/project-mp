package com.mintpot.readingm.backend.service;

import com.mintpot.readingm.backend.dto.payment.AdPaymentDetailDto;
import com.mintpot.readingm.backend.dto.payment.AdPaymentListView;
import com.mintpot.readingm.backend.dto.payment.SavePaymentDto;
import com.mintpot.readingm.backend.entity.Payment;
import com.mintpot.readingm.backend.entity.constant.ClassType;
import com.mintpot.readingm.backend.entity.constant.PaymentMethod;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

public interface PaymentService {
    AdPaymentDetailDto convertEntityToDto(Payment entity);

    Page<AdPaymentDetailDto> findBySpec(Specification<Payment> query, Pageable page);

    Page<AdPaymentListView> find(ClassType classType, PaymentMethod method, String tutorName,
                                 LocalDate startTime, LocalDate endTime,
                                 String optionSearch, String term, Pageable page);

    AdPaymentDetailDto getPaymentById(Long paymentId);

    Payment findEntityById(Long paymentId);

    Payment createPayment(SavePaymentDto paymentDto);

    Payment completePayment(Payment payment);

    byte[] exportExcel(List<Long> ids) throws IOException;
}
