package com.mintpot.busking.api.apple.auth.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class KeyInfo {

    private String kty;

    private String kid;

    private String use;

    private String alg;

    private String n;

    private String e;
}
