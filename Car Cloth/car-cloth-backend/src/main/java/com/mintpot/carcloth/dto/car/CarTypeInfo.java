package com.mintpot.carcloth.dto.car;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CarTypeInfo implements Serializable {

    private Long id;

    @NotBlank
    @Size(max = 40)
    private String name;
}
