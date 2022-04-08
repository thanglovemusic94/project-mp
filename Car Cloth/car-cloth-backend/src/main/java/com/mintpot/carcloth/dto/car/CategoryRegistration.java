package com.mintpot.carcloth.dto.car;

import com.mintpot.carcloth.entity.embeddable.FileInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CategoryRegistration implements Serializable {

    @Size(max = 40)
    @NotBlank
    private String title;

    @NotNull
    private FileInfo icon;
}
