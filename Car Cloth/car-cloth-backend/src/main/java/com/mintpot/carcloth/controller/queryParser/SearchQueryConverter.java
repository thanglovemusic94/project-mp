package com.mintpot.carcloth.controller.queryParser;

import lombok.RequiredArgsConstructor;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SearchQueryConverter implements Converter<String, Specification<?>> {

    private final CriteriaParser criteriaParser;

    @Override
    public Specification<?> convert(String s) {
        var specBuilder = new GenericSpecificationBuilder<>();
        return specBuilder.build(criteriaParser.parse(s), GenericSpecification::new);
    }
}
