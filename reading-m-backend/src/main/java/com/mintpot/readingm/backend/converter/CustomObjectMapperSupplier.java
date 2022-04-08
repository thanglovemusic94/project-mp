package com.mintpot.readingm.backend.converter;

import com.fasterxml.jackson.core.Version;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.vladmihalcea.hibernate.type.util.ObjectMapperSupplier;

import java.util.TimeZone;

public class CustomObjectMapperSupplier implements ObjectMapperSupplier {
    @Override
    public ObjectMapper get() {

        ObjectMapper om = new ObjectMapper().findAndRegisterModules();
        om.setTimeZone(TimeZone.getTimeZone("GMT"));

        SimpleModule simpleModule = new SimpleModule("SimpleModule", new Version(1, 0, 0, null, null, null));
//        simpleModule.addDeserializer(Certificate.class, new CertificateDeserializer());
        om.registerModule(simpleModule);

        return om;
    }
}
