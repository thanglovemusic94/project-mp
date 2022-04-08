package com.mintpot.readingm.backend.converter;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import com.mintpot.readingm.backend.entity.constant.CourseStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;

import java.io.IOException;

@Component
public class CourseStatusSerializer extends StdSerializer<String> {

    public CourseStatusSerializer() {
        this(null);
        SpringBeanAutowiringSupport.processInjectionBasedOnCurrentContext(this);
    }

    public CourseStatusSerializer(Class<String> t) {
        super(t);
    }

    @Override
    public void serialize(String value, JsonGenerator jGen, SerializerProvider serializerProvider) throws IOException {
        if(value != null && value.trim().length() != 0) {
            String absoluteUrl = CourseStatus.valueOf(Integer.valueOf(value)).name();
            jGen.writeObject(absoluteUrl);
        }
    }
}