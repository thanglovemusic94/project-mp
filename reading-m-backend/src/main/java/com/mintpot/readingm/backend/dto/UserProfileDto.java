package com.mintpot.readingm.backend.dto;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.mintpot.readingm.backend.dto.student.StudentProfileDto;
import com.mintpot.readingm.backend.entity.user.Address;
import com.mintpot.readingm.backend.user.Role;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor

@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        property = "role")
@JsonSubTypes({
        @JsonSubTypes.Type(value = ParentProfileDto.class, name = "PARENT"),
        @JsonSubTypes.Type(value = StudentProfileDto.class, name = "STUDENT"),
        @JsonSubTypes.Type(value = TutorProfileDto.class, name = "TUTOR")
})
public class UserProfileDto {
    private long id;

    @NotBlank
    protected Role role;

    protected String name;

    protected String memberId;

    protected String phone;

    protected String email;

    protected Address address;

    protected Boolean receivedSms;

    protected Boolean receivedEmail;
}
