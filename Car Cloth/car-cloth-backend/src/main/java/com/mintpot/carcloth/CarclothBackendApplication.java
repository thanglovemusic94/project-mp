package com.mintpot.carcloth;

import com.mintpot.carcloth.repository.ExtendedRepositoryImpl;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication(scanBasePackages = {"com.mintpot"})
@EnableJpaRepositories(repositoryBaseClass = ExtendedRepositoryImpl.class)
@EnableScheduling
public class CarclothBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(CarclothBackendApplication.class, args);
	}

}
