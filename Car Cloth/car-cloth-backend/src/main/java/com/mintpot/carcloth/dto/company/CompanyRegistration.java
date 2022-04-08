package com.mintpot.carcloth.dto.company;

import com.mintpot.carcloth.entity.embeddable.Address;
import com.mintpot.carcloth.entity.embeddable.ConstructableType;
import com.mintpot.carcloth.entity.embeddable.EntryRoute;
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
public class CompanyRegistration implements Serializable {

    @NotNull
    private ConstructableType constructableType;

    @NotBlank
    @Size(max = 40)
    private String companyName;

    @NotNull
    private Address address;

    @NotBlank
    private String representativeName;

    @NotBlank
    private String contact;

    @NotBlank
    private String workingTime;

    @NotNull
    private FileInfo attachFile;

    private EntryRoute entryRoute;
}
