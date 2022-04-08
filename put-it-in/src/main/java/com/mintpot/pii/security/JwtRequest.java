package com.mintpot.pii.security;

import com.mintpot.pii.constant.GrantType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class JwtRequest implements Serializable {

	private static final long serialVersionUID = 1L;

	private String email;

	private String password;

	private String refreshToken;

	private GrantType grantType;

}
