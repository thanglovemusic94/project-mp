package com.mintpot.readingm.backend;

import com.mintpot.storage.StorageService;
import lombok.extern.log4j.Log4j2;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.unit.DataSize;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import java.lang.reflect.InvocationTargetException;

@Configuration
@Log4j2
@ConfigurationProperties("mintpot")
public class StorageConfiguration {

    private Class<StorageService> storage;

    public void setStorage(Class<StorageService> storage) {
        this.storage = storage;
    }

    @Bean
    public StorageService storageService() throws NoSuchMethodException,
                                                  IllegalAccessException,
                                                  InvocationTargetException,
                                                  InstantiationException {
        return storage.getDeclaredConstructor().newInstance();
    }
}