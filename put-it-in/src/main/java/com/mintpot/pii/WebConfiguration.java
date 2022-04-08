package com.mintpot.pii;

import com.bedatadriven.jackson.datatype.jts.JtsModule;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.hibernate5.Hibernate5Module;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
public class WebConfiguration implements WebMvcConfigurer {

	@Override
	public void extendMessageConverters(List<HttpMessageConverter<?>> converters) {
		for (HttpMessageConverter<?> converter : converters) {
			if (converter instanceof MappingJackson2HttpMessageConverter) {
				ObjectMapper mapper = ((MappingJackson2HttpMessageConverter) converter).getObjectMapper();
				/*SimpleModule module = new SimpleModule();
				module.addSerializer(VerifyReceiptReq.class, new VerifyReceiptReqSerializer());
				mapper.registerModule(module);*/
				var hb5Mod = new Hibernate5Module();
				hb5Mod.disable(Hibernate5Module.Feature.FORCE_LAZY_LOADING);
				hb5Mod.enable(Hibernate5Module.Feature.SERIALIZE_IDENTIFIER_FOR_LAZY_NOT_LOADED_OBJECTS);
				hb5Mod.disable(Hibernate5Module.Feature.USE_TRANSIENT_ANNOTATION);
				hb5Mod.enable(Hibernate5Module.Feature.REPLACE_PERSISTENT_COLLECTIONS);
				mapper.registerModule(hb5Mod);
				mapper.registerModule(new JtsModule());
			}
		}
	}

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/**")
				.addResourceLocations("classpath:/static/");
	}

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/api/**").allowedMethods(HttpMethod.DELETE.name(), HttpMethod.POST.name(),
				HttpMethod.GET.name(), HttpMethod.HEAD.name(), HttpMethod.OPTIONS.name(), HttpMethod.PUT.name(),
				HttpMethod.PATCH.name()).allowedOrigins("*");
	}
}
