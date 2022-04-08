package com.mintpot.readingm.backend.converter;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import com.mintpot.storage.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

public class ListImageUrlSerializer extends StdSerializer<Set<String>> {

    @Autowired
    private StorageService storageService;

    public ListImageUrlSerializer() {
        this(null);
        SpringBeanAutowiringSupport.processInjectionBasedOnCurrentContext(this);
    }

    public ListImageUrlSerializer(Class<Set<String>> t) {
        super(t);
    }

    @Override
    public void serialize(Set<String> strings, JsonGenerator jGen, SerializerProvider serializerProvider) throws IOException {

        if(strings != null && !strings.isEmpty()) {
            Set<String> absoluteUrls = new HashSet<>();
            for (String str: strings) {
                absoluteUrls.add(storageService.generateAbsolutePhotoUrl(str));
            }

            jGen.writeObject(absoluteUrls);
        }
    }
}
