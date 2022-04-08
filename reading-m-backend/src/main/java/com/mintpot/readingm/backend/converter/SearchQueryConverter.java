package com.mintpot.readingm.backend.converter;

import com.mintpot.readingm.backend.spec.GenericSpecification;
import com.mintpot.readingm.backend.spec.GenericSpecificationBuilder;
import com.mintpot.readingm.backend.util.CriteriaParser;
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
