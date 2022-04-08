package com.mintpot.busking;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger.web.*;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.ArrayList;
import java.util.List;

@Profile("!prd")
@Configuration
@EnableSwagger2
public class SwaggerConfiguration {

    /**
     * Springfox swagger
     */
    @Bean
    public Docket api() {
        var docket = new Docket(DocumentationType.SWAGGER_2)
                .useDefaultResponseMessages(false).select()
                .apis(RequestHandlerSelectors.basePackage("com.mintpot.busking"))
                .paths(PathSelectors.any()).build();

        var lstApiKey = new ArrayList<ApiKey>();
        lstApiKey.add(apiKey());

        var lstSecCxt = new ArrayList<SecurityContext>();
        lstSecCxt.add(securityContext());

        return docket.securitySchemes(lstApiKey).securityContexts(lstSecCxt);
        //} else return docket;
    }

    private ApiKey apiKey() {
        return new ApiKey("Bearer", "Authorization", "header");
    }

    private SecurityContext securityContext() {
        return SecurityContext.builder()
                .securityReferences(defaultAuth())
                .forPaths(PathSelectors.regex("/.*"))
                .build();
    }

    List<SecurityReference> defaultAuth() {
        AuthorizationScope authorizationScope
                = new AuthorizationScope("global", "accessEverything");
        AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
        authorizationScopes[0] = authorizationScope;
        var lstSecRef = new ArrayList<SecurityReference>();
        lstSecRef.add(new SecurityReference("Bearer", authorizationScopes));
        return lstSecRef;
    }

    /**
     * Springfox UI Config
     */
    @Bean
    UiConfiguration uiConfig() {
        return UiConfigurationBuilder.builder().deepLinking(true).displayOperationId(false).defaultModelsExpandDepth(1)
                .defaultModelExpandDepth(1).defaultModelRendering(ModelRendering.EXAMPLE).displayRequestDuration(false)
                .docExpansion(DocExpansion.NONE).filter(false).maxDisplayedTags(null)
                .operationsSorter(OperationsSorter.ALPHA).showExtensions(false).tagsSorter(TagsSorter.ALPHA)
                .supportedSubmitMethods(UiConfiguration.Constants.DEFAULT_SUBMIT_METHODS).validatorUrl(null).build();
    }
}
