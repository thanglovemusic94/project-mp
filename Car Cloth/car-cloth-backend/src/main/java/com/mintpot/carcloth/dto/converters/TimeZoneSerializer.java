package com.mintpot.carcloth.dto.converters;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

public class TimeZoneSerializer extends StdSerializer<LocalDateTime> {

    public TimeZoneSerializer() {
        this(null);
        SpringBeanAutowiringSupport.processInjectionBasedOnCurrentContext(this);
    }

    public TimeZoneSerializer(Class<LocalDateTime> t) {
        super(t);
    }

    @Override
    public void serialize(LocalDateTime localDateTime, JsonGenerator jsonGenerator,
                          SerializerProvider serializerProvider) throws IOException {

        if(localDateTime == null) return;

        ZonedDateTime zonedDateTime = localDateTime.atZone(ZoneId.systemDefault());
        jsonGenerator.writeObject(zonedDateTime);
    }
}
