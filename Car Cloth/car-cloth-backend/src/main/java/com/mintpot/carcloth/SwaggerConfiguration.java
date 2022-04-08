package com.mintpot.carcloth;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.data.domain.Pageable;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.oas.annotations.EnableOpenApi;
import springfox.documentation.service.*;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger.web.*;

import java.util.ArrayList;
import java.util.List;

@Profile({"dev", "stg"})
@Configuration
@EnableOpenApi
public class SwaggerConfiguration {

    /**
     * Springfox swagger
     */
    @Bean
    public Docket adminApi() {
        var docket =  new Docket(DocumentationType.OAS_30)
                .groupName("admin")
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.mintpot.carcloth.controller.admin"))
                .paths(PathSelectors.any())
                .build()
                .ignoredParameterTypes(Pageable.class).enableUrlTemplating(false)
                .apiInfo(new ApiInfoBuilder().version("1.0").title("Car Cloth").build());

        // If using dev profile, ignore authorization.
        //if(!"dev".equalsIgnoreCase(activeProfile)) {
        var lstSecuritySchemes = new ArrayList<SecurityScheme>();
        lstSecuritySchemes.add(authenticationScheme());

        var lstSecCxt = new ArrayList<SecurityContext>();
        lstSecCxt.add(securityContext());

        return docket.securitySchemes(lstSecuritySchemes).securityContexts(lstSecCxt);
        //} else return docket;
    }

    @Bean
    public Docket appApi() {
        var docket =  new Docket(DocumentationType.OAS_30)
                .groupName("app")
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.mintpot.carcloth.controller.app"))
                .paths(PathSelectors.any())
                .build()
                .ignoredParameterTypes(Pageable.class).enableUrlTemplating(false)
                .apiInfo(new ApiInfoBuilder().version("1.0").title("Car Cloth").build());

        // If using dev profile, ignore authorization.
        //if(!"dev".equalsIgnoreCase(activeProfile)) {
        var lstSecuritySchemes = new ArrayList<SecurityScheme>();
        lstSecuritySchemes.add(authenticationScheme());

        var lstSecCxt = new ArrayList<SecurityContext>();
        lstSecCxt.add(securityContext());

        return docket.securitySchemes(lstSecuritySchemes).securityContexts(lstSecCxt);
        //} else return docket;
    }

    @Bean
    public Docket commonApi() {
        var docket =  new Docket(DocumentationType.OAS_30)
                .groupName("common")
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.mintpot.carcloth.controller"))
                .paths(PathSelectors.ant("/storages/**").or(PathSelectors.ant("/api/auth/**")))
                .build()
                .ignoredParameterTypes(Pageable.class).enableUrlTemplating(false)
                .apiInfo(new ApiInfoBuilder().version("1.0").title("Car Cloth").build());

        // If using dev profile, ignore authorization.
        //if(!"dev".equalsIgnoreCase(activeProfile)) {
        var lstSecuritySchemes = new ArrayList<SecurityScheme>();
        lstSecuritySchemes.add(authenticationScheme());

        var lstSecCxt = new ArrayList<SecurityContext>();
        lstSecCxt.add(securityContext());

        return docket.securitySchemes(lstSecuritySchemes).securityContexts(lstSecCxt);
        //} else return docket;
    }

    private HttpAuthenticationScheme authenticationScheme() {
        return HttpAuthenticationScheme.JWT_BEARER_BUILDER.name("BearerToken").build();
    }

    private ApiKey apiKey() {
        return new ApiKey("Bearer", "Authorization", "header");
    }

    private SecurityContext securityContext() {
        return SecurityContext.builder()
                              .securityReferences(defaultAuth())
                              .operationSelector(operationContext -> operationContext.requestMappingPattern()
                                                                                     .startsWith("/api/"))
                              .build();
    }

    List<SecurityReference> defaultAuth() {
        AuthorizationScope authorizationScope
                = new AuthorizationScope("global", "accessEverything");
        AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
        authorizationScopes[0] = authorizationScope;
        var lstSecRef = new ArrayList<SecurityReference>();
        lstSecRef.add(new SecurityReference("BearerToken", authorizationScopes));
        return lstSecRef;
    }

    /**
     * Springfox UI Config
     */
    @Bean
    UiConfiguration uiConfig() {
        return UiConfigurationBuilder.builder()
                                     .deepLinking(true)
                                     .displayOperationId(false)
                                     .defaultModelsExpandDepth(2)
                                     .defaultModelExpandDepth(2)
                                     .defaultModelRendering(ModelRendering.EXAMPLE)
                                     .displayRequestDuration(false)
                                     .docExpansion(DocExpansion.NONE)
                                     .filter(false)
                                     .maxDisplayedTags(null)
                                     .operationsSorter(OperationsSorter.ALPHA)
                                     .showExtensions(false)
                                     .tagsSorter(TagsSorter.ALPHA)
                                     .supportedSubmitMethods(UiConfiguration.Constants.DEFAULT_SUBMIT_METHODS)
                                     .validatorUrl(null)
                                     .build();
    }
}
