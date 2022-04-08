package com.mintpot.carcloth.dto.company;

import com.mintpot.carcloth.entity.embeddable.Address;
import com.mintpot.carcloth.entity.embeddable.ConstructableType;
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
public class CompanyEditInfo implements Serializable {

    @NotBlank
    @Size(max = 40)
    private String companyName;

    @NotNull
    private Address address;

    @NotBlank
    private String workingTime;

    @NotNull
    private ConstructableType constructableType;

    @NotNull
    private FileInfo attachFile;

    private String introduction;
}
