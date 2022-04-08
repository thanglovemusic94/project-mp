package com.mintpot.busking.dto.api;

import com.mintpot.busking.exception.BusinessException;
import com.mintpot.busking.exception.constant.ErrorCode;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class BuskingFilterDto {

    private int cityId = 0;

    private int landId = 0;

    public void validate () {
        if(cityId == landId && landId == 0)  throw new BusinessException(ErrorCode.ILLEGAL_ARGUMENTS);
        if(cityId > 0 && landId > 0) throw new BusinessException(ErrorCode.ILLEGAL_ARGUMENTS);
    }

}
