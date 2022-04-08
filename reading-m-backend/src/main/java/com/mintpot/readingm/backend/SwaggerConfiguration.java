package com.mintpot.readingm.backend;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.data.domain.Pageable;
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

//@Profile("!prd")
@Configuration
@EnableOpenApi
public class SwaggerConfiguration {

    /*@Value("${spring.profiles.active}")
    private String activeProfile;*/

    /**
     * Springfox swagger
     */
    @Bean
    public Docket api() {
        var docket = new Docket(DocumentationType.OAS_30)
                .useDefaultResponseMessages(false).select()
                .apis(RequestHandlerSelectors.basePackage("com.mintpot.readingm.backend"))
                .paths(PathSelectors.any()).build().ignoredParameterTypes(Pageable.class).enableUrlTemplating(false);

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
