package com.mintpot.carcloth.controller.queryParser;

import lombok.Getter;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class SpecificationBuilder<E> {

    @Getter
    private List<Specification<E>> specs;

    public SpecificationBuilder<E> add(Specification<E> spec) {
        if(specs == null)
            specs = new ArrayList<>();

        specs.add(spec);

        return this;
    }

    public Specification<E> build() {
        if(specs == null || specs.isEmpty())
            return null;

        var res = specs.get(0);
        for(int i = 1; i < specs.size(); i++) {
            res = Specification.where(res).and(specs.get(i));
        }

        return res;
    }
}
