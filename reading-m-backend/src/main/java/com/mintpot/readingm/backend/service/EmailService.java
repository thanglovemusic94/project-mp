package com.mintpot.readingm.backend.service;

import com.mintpot.readingm.backend.dto.EmailDto;

import javax.mail.MessagingException;

public interface EmailService {
    void sendSimpleMail(EmailDto emailDto, String template) throws MessagingException;
}
