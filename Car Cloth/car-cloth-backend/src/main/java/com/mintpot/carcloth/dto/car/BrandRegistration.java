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
public class BrandRegistration implements Serializable {

    private Long id;

    private long categoryId;

    @NotBlank
    @Size(max = 40)
    private String brandName;

    @NotBlank
    private String connectionURL;

    @NotNull
    private FileInfo attachFile;

    private String introduction;
}
