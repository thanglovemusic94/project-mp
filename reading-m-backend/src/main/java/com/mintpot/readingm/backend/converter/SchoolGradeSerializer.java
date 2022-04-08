package com.mintpot.readingm.backend.converter;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import com.mintpot.readingm.backend.entity.constant.SchoolGrade;
import org.springframework.stereotype.Component;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;

import java.io.IOException;

@Component
public class SchoolGradeSerializer extends StdSerializer<Integer> {

    public SchoolGradeSerializer() {
        this(null);
        SpringBeanAutowiringSupport.processInjectionBasedOnCurrentContext(this);
    }

    public SchoolGradeSerializer(Class<Integer> t) {
        super(t);
    }

    @Override
    public void serialize(Integer value, JsonGenerator jGen, SerializerProvider serializerProvider) throws IOException {
        String absoluteUrl = SchoolGrade.values()[value].name();
        jGen.writeObject(absoluteUrl);
    }
}