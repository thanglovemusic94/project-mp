package com.mintpot.carcloth.dto.car;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BrandDetail extends BrandInfo {

    private String introduction;

    private String connectionURL;
}
