package com.mintpot.readingm.backend.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mintpot.readingm.backend.entity.constant.ClassSource;
import com.mintpot.readingm.backend.entity.user.Address;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String phone;

    @Column(nullable = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @Column(nullable = false, columnDefinition = "tinyint(1) default " + UserStatus.Constant.ACTIVATED_VALUE)
    private UserStatus status = UserStatus.ACTIVATED;

    @Column(nullable = false)
    private Role role;

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean receivedSms;

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean receivedEmail;

    @Embedded
    private Address address;

    private ClassSource classSource;

    @Column(nullable = false, unique = true)
    private String memberId;

    @Column(updatable = false)
    @CreationTimestamp
    private Date createdOn;

    @UpdateTimestamp
    private Date updatedOn;

    public User(long userId) {
        this.id = userId;
    }

    public User(String email, String password, Role role, String name) {
        this.email = email;
        this.password = password;
        this.role = role;
        this.name = name;
    }
}
