package com.mintpot.readingm.backend.dto.admin;

import com.mintpot.readingm.api.rams.book.School;
import com.mintpot.readingm.backend.entity.constant.ClassSource;
import com.mintpot.readingm.backend.entity.constant.TutorType;
import com.mintpot.readingm.backend.entity.user.Address;
import com.mintpot.readingm.backend.user.Role;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
// TODO change to a more specific name as this belongs to Admin Member List page and cannot be reused i.e. AdUserListDto
public class AdMemListDto {
    protected long id;

    protected String name;

    protected String email;

    protected String phone;

    protected ClassSource classSource;

    protected Role role;

    protected int grade;

    protected School clazz;

    protected TutorType tutorType;

    protected Date createdOn;

    protected boolean receivedSms;

    private boolean receivedEmail;

    protected Address address;

    protected String memberId;
}
