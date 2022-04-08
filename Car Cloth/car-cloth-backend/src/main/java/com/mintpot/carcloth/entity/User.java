package com.mintpot.carcloth.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mintpot.carcloth.constant.Role;
import com.mintpot.carcloth.constant.UserStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type", discriminatorType = DiscriminatorType.STRING)
@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "type", insertable = false, updatable = false, nullable = false)
    @Enumerated(EnumType.STRING)
    private Role type;

    @Column(unique = true, nullable = false)
    private String memberId;

    @Column
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @Column(nullable = false, columnDefinition = "tinyint(1) default " + UserStatus.Constant.ACTIVATED_VALUE)
    private UserStatus status = UserStatus.ACTIVATED;

    private LocalDateTime lastLoggedIn;

    @Column(updatable = false)
    @CreationTimestamp
    private LocalDateTime createdOn;

    @UpdateTimestamp
    private LocalDateTime updatedOn;

    public User(long userId) {
        this.id = userId;
    }

    public User(String memberId, String password) {
        this.memberId = memberId;
        this.password = password;
    }
}
