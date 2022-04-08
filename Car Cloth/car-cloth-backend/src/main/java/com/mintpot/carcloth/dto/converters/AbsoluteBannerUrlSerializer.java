package com.mintpot.carcloth.dto.converters;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import com.mintpot.carcloth.utils.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;

import java.io.IOException;

public class AbsoluteBannerUrlSerializer extends StdSerializer<String> {

    @Autowired
    private StorageService storageService;

    public AbsoluteBannerUrlSerializer() {
        this(null);
        SpringBeanAutowiringSupport.processInjectionBasedOnCurrentContext(this);
    }

    public AbsoluteBannerUrlSerializer(Class<String> t) {
        super(t);
    }

    @Override
    public void serialize(String key, JsonGenerator jsonGenerator,
                          SerializerProvider serializerProvider) throws IOException {

        jsonGenerator.writeObject(storageService.generateAbsoluteUrl(key).toString());
    }
}
