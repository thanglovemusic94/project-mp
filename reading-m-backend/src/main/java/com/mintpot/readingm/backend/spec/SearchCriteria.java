package com.mintpot.readingm.backend.spec;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class SearchCriteria {

    private String key;

    private SearchOperation operation;

    private Object value;
}
