package com.mintpot.busking.api.apple.auth.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class KeysInfo {

    private List<KeyInfo> keys;
}
