package com.mintpot.carcloth.dto.company;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mintpot.carcloth.dto.converters.AbsoluteUrlSerializer;
import com.mintpot.carcloth.dto.converters.ConstructableTypeSerializer;
import com.mintpot.carcloth.dto.converters.EntryRouteSerializer;
import com.mintpot.carcloth.entity.embeddable.ConstructableType;
import com.mintpot.carcloth.entity.embeddable.EntryRoute;
import com.mintpot.carcloth.entity.embeddable.FileInfo;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminApplicantDetail extends AdminApplicant {

    private String representativeName;

    private AdminAddress address;

    private String workingTime;

    @JsonSerialize(using = AbsoluteUrlSerializer.class)
    private FileInfo attachFile;

    @JsonSerialize(using = ConstructableTypeSerializer.class)
    private ConstructableType constructableType;

    @JsonSerialize(using = EntryRouteSerializer.class)
    private EntryRoute entryRoute;

    private String reason;
}
