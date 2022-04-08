package com.mintpot.readingm.backend.dto.tutorApplication;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import com.mintpot.readingm.backend.entity.clazz.LiveClass;
import com.mintpot.readingm.backend.entity.constant.ClassSource;
import com.mintpot.readingm.backend.entity.constant.Gender;
import com.mintpot.readingm.backend.entity.constant.TutorApplicationStatus;
import com.mintpot.readingm.backend.entity.constant.TutorType;
import com.mintpot.readingm.backend.entity.tutorApplication.Certificate;
import com.mintpot.readingm.backend.entity.tutorApplication.Experience;
import com.mintpot.readingm.backend.entity.tutorApplication.bookClass.BookClassInfo;
import com.mintpot.readingm.backend.entity.tutorApplication.goalClass.GoalClassInfo;
import com.mintpot.readingm.backend.entity.user.Address;
import com.mintpot.readingm.backend.user.Role;
import com.mintpot.readingm.backend.user.UserStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
public class RegTutorAppDto {
    private Long id;

    private TutorDto tutor;

    private AcademicInfo academicInfo;

    private Set<Certificate> certs;

    private List<Experience> experiences;

    private BookClassInfo bookClassInfo;

    private GoalClassInfo goalClassInfo;

    private String introduction;

    private TutorApplicationStatus status;

    @JsonIgnore
    private MultipartFile imagePc;

    @JsonIgnore
    private MultipartFile[] files;

    private Date createdOn;

    private Date updatedOn;

    @Getter
    @Setter
    @NoArgsConstructor
    public static class TutorDto {

        private Long id;

        private String name;

        @JsonDeserialize(using = LocalDateDeserializer.class)
        @JsonSerialize(using = LocalDateSerializer.class)
        private LocalDate birth;

        private Gender gender;

        private String password;

        private String phone;

        private String email;

        private String bank;

        private String bankAccount;

        private boolean receivedSms;

        private boolean receivedEmail;

        private Address address;

        private TutorType tutorType;

        private String memberId;

        private UserStatus status = UserStatus.ACTIVATED;

        private Role role;

        private ClassSource classSource = ClassSource.READINGM;

        private Date createdOn;

        private Date updatedOn;

        private String profileImageUrl;

        private String bookTextIntroduction;

        private Set<LiveClass> classes;

    }
}
