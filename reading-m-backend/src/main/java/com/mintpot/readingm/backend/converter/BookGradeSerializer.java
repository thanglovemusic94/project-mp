package com.mintpot.readingm.backend.converter;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import com.mintpot.readingm.api.rams.book.Grade;
import com.mintpot.readingm.api.rams.book.School;
import org.springframework.stereotype.Component;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;

import java.io.IOException;

@Component
public class BookGradeSerializer extends StdSerializer<Integer> {

    public BookGradeSerializer() {
        this(null);
        SpringBeanAutowiringSupport.processInjectionBasedOnCurrentContext(this);
    }

    public BookGradeSerializer(Class<Integer> t) {
        super(t);
    }

    @Override
    public void serialize(Integer value, JsonGenerator jGen, SerializerProvider serializerProvider) throws IOException {
        if(value != null) {
            String absoluteUrl = Grade.valueOf(value).name();
            jGen.writeObject(absoluteUrl);
        }
    }
}