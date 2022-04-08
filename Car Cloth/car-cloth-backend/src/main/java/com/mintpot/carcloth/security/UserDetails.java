package com.mintpot.carcloth.security;

import com.mintpot.carcloth.constant.UserStatus;
import com.mintpot.carcloth.entity.User;
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

    private String memberId;

    private String username;

    private String password;

    private boolean isAccountNonExpired;

    private boolean isAccountNonLocked;

    private boolean isCredentialsNonExpired;

    private boolean isEnabled;


    private Collection<? extends GrantedAuthority> authorities;

    public UserDetails(User user) {
        this.memberId = user.getMemberId();
        this.userId = user.getId();
        this.isEnabled = user.getStatus() == UserStatus.ACTIVATED;
        this.isAccountNonLocked = user.getStatus() != UserStatus.INACTIVATED;
        this.isCredentialsNonExpired = true;
        this.isAccountNonExpired = true;
        this.authorities = Stream.of(new SimpleGrantedAuthority(user.getType().getValue()))
                                 .collect(Collectors.toList());
    }

    public UserDetails(User user, Collection<? extends GrantedAuthority> authorities) {
        this.memberId = user.getMemberId();
        this.userId = user.getId();
        this.isEnabled = user.getStatus() == UserStatus.ACTIVATED;
        this.isAccountNonLocked = user.getStatus() != UserStatus.INACTIVATED;
        this.isCredentialsNonExpired = true;
        this.isAccountNonExpired = true;
        this.authorities = authorities;
    }
}
