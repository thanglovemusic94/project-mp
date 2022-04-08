package com.mintpot.carcloth.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class RegConstructionExample {

    @NotNull
    private Long quoteId;

    private LocalDateTime completedDate;

    @Size(min = 10, max = 500)
    @NotBlank
    private String content;

    @Size(min = 1, max = 4)
    private List<String> images;
}
