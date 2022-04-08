package com.mintpot.carcloth.dto.review;

import com.mintpot.carcloth.constant.ShowStatus;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class ReviewStatus {

    private long id;

    @NotNull
    private ShowStatus status;
}