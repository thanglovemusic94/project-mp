package com.mintpot.readingm.backend.converter;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import com.mintpot.readingm.api.rams.book.Grade;
import com.mintpot.readingm.backend.entity.constant.SchoolStage;
import org.springframework.stereotype.Component;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;

import java.io.IOException;

@Component
public class GradeSerializer extends StdSerializer<String> {

    public GradeSerializer() {
        this(null);
        SpringBeanAutowiringSupport.processInjectionBasedOnCurrentContext(this);
    }

    public GradeSerializer(Class<String> t) {
        super(t);
    }

    @Override
    public void serialize(String value, JsonGenerator jGen, SerializerProvider serializerProvider) throws IOException {
        if(value != null && value.trim().length() != 0) {
            String absoluteUrl = Grade.valueOf(Integer.valueOf(value)).name();
            jGen.writeObject(absoluteUrl);
        }
    }
}