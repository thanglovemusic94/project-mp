package com.mintpot.pii.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class BookmarkDto {

    private long userId;

    private long branchId;
}
