package com.mintpot.pii.repository;

import com.mintpot.pii.entity.Inquiry;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.access.prepost.PreAuthorize;

public interface InquiryRepository extends JpaRepository<Inquiry, Long> {

    @PreAuthorize("#userId == authentication.principal.userId || hasRole('ADMIN')")
    Page<Inquiry> findByUserId(long userId, Pageable page);
}
