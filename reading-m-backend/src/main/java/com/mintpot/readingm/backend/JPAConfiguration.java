package com.mintpot.readingm.backend;

import com.mintpot.readingm.backend.repository.ExtendedRepositoryImpl;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(
        basePackages = {
                "com.mintpot.readingm.backend.repository",
                "com.mintpot.readingm.backend.user",
                "com.mintpot.readingm.backend.security"
        },
        repositoryBaseClass = ExtendedRepositoryImpl.class
)
public class JPAConfiguration {
}
