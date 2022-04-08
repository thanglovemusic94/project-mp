package com.mintpot.carcloth.dto.car;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdminBrandDetail extends BrandInfo{

    private CategoryInfo category;

    private String connectionURL;

    private String introduction;

    private LocalDateTime createdOn;
}
