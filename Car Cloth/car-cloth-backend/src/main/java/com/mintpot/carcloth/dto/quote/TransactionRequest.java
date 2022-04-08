package com.mintpot.carcloth.dto.quote;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mintpot.carcloth.constant.enums.EConstructionType;
import com.mintpot.carcloth.dto.converters.AbsoluteUrlsSerializer;
import com.mintpot.carcloth.entity.embeddable.Address;
import com.mintpot.carcloth.entity.embeddable.FileInfo;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.Set;

@Getter
@Setter
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.PROPERTY, property = "type")
@JsonSubTypes({
        @JsonSubTypes.Type(value = PPFDto.class, name = EConstructionType.JsonProp.PPF),
        @JsonSubTypes.Type(value = PolishDto.class, name = EConstructionType.JsonProp.POLISH),
        @JsonSubTypes.Type(value = BlackBoxDto.class, name = EConstructionType.JsonProp.BLACK_BOX),
        @JsonSubTypes.Type(value = GlassFilmDto.class, name = EConstructionType.JsonProp.GLASS_FILM),
        @JsonSubTypes.Type(value = NewCarPackageDto.class, name = EConstructionType.JsonProp.NEW_CAR_PACKAGE),
        @JsonSubTypes.Type(value = TintingDto.class, name = EConstructionType.JsonProp.TINTING),
        @JsonSubTypes.Type(value = WindshieldDto.class, name = EConstructionType.JsonProp.WINDSHIELD),
        @JsonSubTypes.Type(value = WrappingDto.class, name = EConstructionType.JsonProp.WRAPPING),
})
@ApiModel(value = "TransactionRequest",
        subTypes = {BlackBoxDto.class,
        PPFDto.class,
        PolishDto.class,
        GlassFilmDto.class,
        NewCarPackageDto.class,
        TintingDto.class,
        WindshieldDto.class,
        WrappingDto.class},
        discriminator = "type")
@NoArgsConstructor
public abstract class TransactionRequest {

    private LocalDate desiredDate;

    @NotNull
    private Address address;

    private boolean insurance;

    @Size(max = 600)
    private String otherRequest;

    @NotNull
    @Size(min = 1, max = 4)
    @JsonSerialize(using = AbsoluteUrlsSerializer.class)
    private Set<FileInfo> attachImages;

    private String carInfo;
}