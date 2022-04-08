package com.mintpot.busking;

import com.mintpot.busking.repository.UserRepository;
import org.dom4j.rule.Mode;
import org.hibernate.collection.spi.PersistentCollection;
import org.locationtech.jts.geom.GeometryFactory;
import org.modelmapper.Condition;
import org.modelmapper.ModelMapper;
import org.modelmapper.spi.MappingContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.i18n.AcceptHeaderLocaleResolver;

import javax.annotation.PostConstruct;
import java.util.Locale;
import java.util.TimeZone;

@SpringBootApplication(
        exclude = { SecurityAutoConfiguration.class },
        scanBasePackages = "com.mintpot.busking"
)
@EnableScheduling
@EnableJpaRepositories("com.mintpot.busking.repository")
public class BuskingBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BuskingBackendApplication.class, args);
    }

    @Value( "${settings.cors_origin}" )
    private String cors_origin;

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/web/").allowedOrigins(cors_origin).allowedOrigins("http://localhost:3000");
            }
        };
    }

    @PostConstruct
    void started() {
//        TimeZone.setDefault(TimeZone.getTimeZone("Etc/UTC"));
    }

    /**
     * Model Mapper Automatic mapping between entities and DTOs.
     */
    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        //modelMapper.getConfiguration().setPropertyCondition(context -> !(context.getSource() instanceof PersistentCollection));
        return modelMapper;
    }

    /**
     * Resolve requests' Locale
     */
    @Bean
    public LocaleResolver localeResolver() {
        var hlr = new AcceptHeaderLocaleResolver();
        hlr.setDefaultLocale(Locale.KOREA);
        return hlr;
    }

    @Bean("geoFac")
    public GeometryFactory geometryFactory() {
        return new GeometryFactory();
    }

}
