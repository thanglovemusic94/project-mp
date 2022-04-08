package com.mintpot.carcloth.dto.converters;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import com.mintpot.carcloth.entity.embeddable.FileInfo;
import com.mintpot.carcloth.utils.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;

import java.io.IOException;
import java.util.Set;

public class AbsoluteUrlsSerializer extends StdSerializer<Set<FileInfo>> {

    @Autowired
    private StorageService storageService;

    public AbsoluteUrlsSerializer() {
        this(null);
        SpringBeanAutowiringSupport.processInjectionBasedOnCurrentContext(this);
    }

    public AbsoluteUrlsSerializer(Class<Set<FileInfo>> t) {
        super(t);
    }

    @Override
    public void serialize(Set<FileInfo> files, JsonGenerator jsonGenerator,
                          SerializerProvider serializerProvider) throws IOException {

        jsonGenerator.writeStartArray();
        for (FileInfo f : files) {
            f.setObjectKey(storageService.generateAbsoluteUrl(f.getObjectKey()).toString());
            jsonGenerator.writeObject(f);
        }
        jsonGenerator.writeEndArray();
    }
}
