package com.mintpot.readingm.backend.security;

import com.mintpot.readingm.backend.user.User;
import com.mintpot.readingm.backend.user.UserStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class UserDetails implements org.springframework.security.core.userdetails.UserDetails {

    private long userId;

    private String email;

    private String username;

    private String password;

    private boolean isAccountNonExpired;

    private boolean isAccountNonLocked;

    private boolean isCredentialsNonExpired;

    private boolean isEnabled;


    private Collection<? extends GrantedAuthority> authorities;

    public UserDetails(User user) {
        this.email = user.getEmail();
        this.userId = user.getId();
        this.isEnabled = user.getStatus() == UserStatus.ACTIVATED;
        this.isAccountNonLocked = user.getStatus() != UserStatus.UNACTIVATED;
        this.isCredentialsNonExpired = true;
        this.isAccountNonExpired = true;
        this.authorities = Stream.of(new SimpleGrantedAuthority(user.getRole().toString()))
                                 .collect(Collectors.toList());
    }

    public UserDetails(User user, Collection<? extends GrantedAuthority> authorities) {
        this.email = user.getEmail();
        this.userId = user.getId();
        this.isEnabled = user.getStatus() == UserStatus.ACTIVATED;
        this.isAccountNonLocked = user.getStatus() != UserStatus.UNACTIVATED;
        this.isCredentialsNonExpired = true;
        this.isAccountNonExpired = true;
        this.authorities = authorities;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
