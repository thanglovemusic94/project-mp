package com.mintpot.busking.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class SliceDto<T> {

    @JsonIgnore
    public static final SliceDto<?> EMPTY = new SliceDto<>(new ArrayList<>(), false);

    @JsonSerialize
    private List<T> content;

    private Boolean hasNext;

    private Object additionalInfo;

    private SliceDto(List<T> content, boolean hasNext) {
        this.content = content;
        this.hasNext = hasNext;
    }

    public static <Y> SliceDto<Y> of(List<Y> content, boolean hasNext) {
        if(content.size() > 0) {
            return new SliceDto<>(content, hasNext);
        } else return (SliceDto<Y>) EMPTY;
    }
}
