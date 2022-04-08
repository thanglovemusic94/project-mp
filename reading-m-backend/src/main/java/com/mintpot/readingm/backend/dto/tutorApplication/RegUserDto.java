package com.mintpot.readingm.backend.dto.tutorApplication;

import com.mintpot.readingm.backend.entity.user.Address;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RegUserDto {
    protected String name;

    protected String memberId;

    protected String password;

    protected String phone;

    protected String email;

    protected Address address;

    protected boolean receivedSms;

    protected boolean receivedEmail;
}
