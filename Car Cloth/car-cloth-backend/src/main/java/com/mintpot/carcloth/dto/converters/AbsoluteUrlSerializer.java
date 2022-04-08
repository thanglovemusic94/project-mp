package com.mintpot.carcloth.dto.converters;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import com.mintpot.carcloth.entity.embeddable.FileInfo;
import com.mintpot.carcloth.utils.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class AbsoluteUrlSerializer extends StdSerializer<FileInfo> {

    @Autowired
    private StorageService storageService;

    public AbsoluteUrlSerializer() {
        this(null);
        SpringBeanAutowiringSupport.processInjectionBasedOnCurrentContext(this);
    }

    public AbsoluteUrlSerializer(Class<FileInfo> t) {
        super(t);
    }

    @Override
    public void serialize(FileInfo f, JsonGenerator jsonGenerator,
                          SerializerProvider serializerProvider) throws IOException {

        f.setObjectKey(storageService.generateAbsoluteUrl(f.getObjectKey()).toString());

        jsonGenerator.writeObject(f);
    }
}
