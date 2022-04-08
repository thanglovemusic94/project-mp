package com.mintpot.readingm.backend.converter;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import com.mintpot.storage.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;

import java.io.IOException;

@Component
public class ImageUrlSerializer extends StdSerializer<String> {

    @Autowired
    private StorageService storageService;

    public ImageUrlSerializer() {
        this(null);
        SpringBeanAutowiringSupport.processInjectionBasedOnCurrentContext(this);
    }

    public ImageUrlSerializer(Class<String> t) {
        super(t);
    }

    @Override
    public void serialize(String value, JsonGenerator jGen, SerializerProvider serializerProvider) throws IOException {
        if(value != null && value.trim().length() != 0) {
            String absoluteUrl = storageService.generateAbsolutePhotoUrl(value);
            jGen.writeObject(absoluteUrl);
        }
    }
}