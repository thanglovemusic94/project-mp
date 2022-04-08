package com.mintpot.carcloth.dto.converters;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import com.mintpot.carcloth.constant.enums.EQuoteStatus;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;

import java.io.IOException;

public class QuoteStatusSerializer extends StdSerializer<Integer> {

    public QuoteStatusSerializer() {
        this(null);
        SpringBeanAutowiringSupport.processInjectionBasedOnCurrentContext(this);
    }

    public QuoteStatusSerializer(Class<Integer> t) {
        super(t);
    }

    @Override
    public void serialize(Integer code, JsonGenerator jsonGenerator,
                          SerializerProvider serializerProvider) throws IOException {

        if(code == null) return;

        jsonGenerator.writeObject(EQuoteStatus.valueOf(code));
    }
}
