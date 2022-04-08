package com.mintpot.busking;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;

import java.io.IOException;

@Configuration
@Log4j2
public class FirebaseConfiguration {

    @Value("classpath:buskingland-service-account.json")
    private Resource serviceAcc;

    @Bean
    public void initFirebase() throws IOException {
        GoogleCredentials credentials = GoogleCredentials.fromStream(serviceAcc.getInputStream());
        FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(credentials).setDatabaseUrl("https://buskingland-channel" +
                        ".firebaseio.com").build();
        FirebaseApp.initializeApp(options);
    }
}
