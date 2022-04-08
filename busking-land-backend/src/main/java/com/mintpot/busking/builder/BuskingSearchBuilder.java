package com.mintpot.busking.builder;

import com.mintpot.busking.model.User;
import com.mintpot.busking.model.constant.BuskingStatus;
import com.mintpot.busking.model.constant.BuskingType;
import io.swagger.annotations.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ApiModel
public class BuskingSearchBuilder {
    public String start;
    public String end;
    public String [] buskingStatus;
    public String buskingType;
    public String name;
}
