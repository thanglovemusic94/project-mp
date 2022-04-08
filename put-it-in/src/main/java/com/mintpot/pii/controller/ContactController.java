package com.mintpot.pii.controller;

import com.mintpot.pii.dto.ContactDto;
import com.mintpot.pii.entity.Contact;
import com.mintpot.pii.exception.BusinessException;
import com.mintpot.pii.exception.error.ErrorCode;
import com.mintpot.pii.repository.ContactRepository;
import io.swagger.annotations.Api;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/api/contact")
@Api("Contact Us")
public class ContactController {
    private final ContactRepository contactRepository;

    private final ModelMapper modelMapper;

    public ContactController(ContactRepository companyRepo, ContactRepository contactRepository, ModelMapper modelMapper) {
        this.contactRepository = contactRepository;
        this.modelMapper = modelMapper;
    }

    @PostMapping
    ResponseEntity<Void> addNewContact(@Valid @RequestBody ContactDto dto) {
        try {
            Optional<Contact> contactByEmail = contactRepository.findByEmail(dto.getEmail());
            if(contactByEmail.isPresent()){
                return new ResponseEntity<>(HttpStatus.FOUND);
            }
            Contact contact = modelMapper.map(dto, Contact.class);
            contactRepository.save(contact);
            return new ResponseEntity<>(HttpStatus.CREATED);
        }
        catch (Exception ex){
            throw new BusinessException(ErrorCode.INTERNAL_SERVER_ERROR);
        }
    }
}
