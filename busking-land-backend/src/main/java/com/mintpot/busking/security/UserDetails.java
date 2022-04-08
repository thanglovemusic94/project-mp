package com.mintpot.busking.security;

import com.mintpot.busking.constant.UserStatus;
import com.mintpot.busking.model.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Collection;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class UserDetails implements org.springframework.security.core.userdetails.UserDetails {

    private int userId;

    private String email;

    private String username;

    private String password;

    private boolean isAccountNonExpired;

    private boolean isAccountNonLocked;

    private boolean isCredentialsNonExpired;

    private boolean isEnabled;

    private int age;

    private int ageGroup;

    private Collection<? extends GrantedAuthority> authorities;

    public UserDetails(User user) {
        this.email = user.getEmail();
        this.userId = user.getId();
        this.isEnabled = user.getStatus() == UserStatus.ACTIVATED;
        this.isAccountNonLocked = user.getStatus() != UserStatus.LOCKED;
        this.isCredentialsNonExpired = true;
        this.isAccountNonExpired = true;
        LocalDate birthday = user.getBirthday();
        if(birthday == null) {
            this.age = -1;
            this.ageGroup = -1;
        } else {
            LocalDate now = LocalDate.now();
            this.age = (int) ChronoUnit.YEARS.between(birthday, now);
            this.ageGroup = (int)(age / 10) * 10;
        }
    }
}
