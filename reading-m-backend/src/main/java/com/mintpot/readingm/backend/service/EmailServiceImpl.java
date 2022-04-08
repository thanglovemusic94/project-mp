package com.mintpot.readingm.backend.service;

import com.mintpot.readingm.backend.dto.EmailDto;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.nio.charset.StandardCharsets;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender javaMailSender;

    private final SpringTemplateEngine templateEngine;

    @Override
    public void sendSimpleMail(EmailDto emailDto, String template) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, StandardCharsets.UTF_8.name());
        helper.setSubject(emailDto.getSubject());
        helper.setTo(emailDto.getAddressTo());
        Context context = new Context();
        context.setVariables(emailDto.getProps());
        String contents = templateEngine.process(template, context);
        helper.setText(contents, true);
        javaMailSender.send(message);
    }
}
