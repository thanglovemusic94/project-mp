package com.mintpot.busking.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class JwtRequest implements Serializable {

	/*@ApiModelProperty(example = "mintpot@gmail.com")
	private String email;

	@ApiModelProperty(example = "Aa@12345")
	private String password;*/

	private String token;

}
