package com.mintpot.carcloth.dto.admin;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mintpot.carcloth.constant.enums.ESNSType;
import com.mintpot.carcloth.dto.converters.TimeZoneSerializer;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class MemberDetailDto {

    private long id;

    private String memberId;

    private ESNSType sns;

    private String name;

    private LocalDate birthday;

    @ApiModelProperty(notes = "Last login date")
    @JsonSerialize(using = TimeZoneSerializer.class)
    private LocalDateTime lastLoggedIn;

    @ApiModelProperty(name = "Consent to Advertisement Notifications")
    private boolean isAdNotified;

    private String memo;

    @ApiModelProperty(notes = "Contact")
    private String phone;

    @ApiModelProperty(notes = "Signup date")
    @JsonSerialize(using = TimeZoneSerializer.class)
    private LocalDateTime createdOn;

    private String carInfo;

    private String carNumber;

    private long requestQuotes;

    private long totalReviews;

    private boolean companyMember;

    private CompanyGroupView group;
}
