package com.mintpot.busking.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRawValue;
import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.Data;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Data
public class PageResponse<T> {

    @JsonProperty("total_pages")
    private int totalPages;

    @JsonProperty("total_elements")
    private long totalElements;

    private int page;

    private int size;

    private Sort sort;

    @JsonProperty("records")
    private List<T> result;

    @JsonIgnore
    private List<Integer> listTotalPages;

    public PageResponse(Page<T> page) {
        this.result = page.getContent();
        this.totalElements = page.getTotalElements();
        this.totalPages = page.getTotalPages();
        this.page = page.getNumber();
        this.size = page.getSize();
        this.sort = page.getSort();
        this.listTotalPages = IntStream.rangeClosed(1, totalPages)
                .boxed()
                .collect(Collectors.toList());
    }

    public PageResponse(List<T> result, int totalPages, long totalElements, int page, int size) {
        this.totalPages = totalPages;
        this.totalElements = totalElements;
        this.page = page;
        this.size = size;
        this.result = result;
        this.sort = sort;
        this.listTotalPages = IntStream.rangeClosed(1, totalPages)
                .boxed()
                .collect(Collectors.toList());
    }

    public static <T> PageResponse<T> create(Page<T> page) {
        return new PageResponse(page);
    }

}

