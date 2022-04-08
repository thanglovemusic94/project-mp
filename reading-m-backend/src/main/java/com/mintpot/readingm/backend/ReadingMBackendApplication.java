package com.mintpot.readingm.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication(scanBasePackages = {"com.mintpot"})
@EnableConfigurationProperties(StorageConfiguration.class)
@ConfigurationPropertiesScan("com.mintpot.readingm.backend")
@EnableScheduling
public class ReadingMBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ReadingMBackendApplication.class, args);
	}

}
