package com.mintpot.carcloth.dto.admin;

import com.mintpot.carcloth.constant.ShowStatus;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class SaveBannerDto {
    @Min(1)
    private int position;

    @NotNull
    private ShowStatus status;

    private String connectionLink;

    private boolean imgChanged = true;
}