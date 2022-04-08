package com.mintpot.carcloth.dto.admin;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
public class EditMemberDto {
    private long id;

    private Long groupId;

    @Size(max = 100)
    private String memo;
}
