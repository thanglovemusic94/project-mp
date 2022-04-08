package com.mintpot.pii.repository;

import com.mintpot.pii.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ContactRepository extends JpaRepository<Contact, Long> {
    public Optional<Contact> findByEmail(String email);
}
