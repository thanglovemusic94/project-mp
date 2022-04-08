package com.mintpot.carcloth;

import ch.vorburger.exec.ManagedProcessException;
import ch.vorburger.mariadb4j.springframework.MariaDB4jSpringService;
import com.mintpot.carcloth.exception.ConfigurationException;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Configuration
@Profile("dev")
public class DBDevConfig {

    private int port;
    private String dbName;

    @Bean
    MariaDB4jSpringService mariaDB4jSpringService(DataSourceProperties dataSourceProperties) {
        // jdbc:mariadb://localhost:3306/pii_backend
        Pattern regex = Pattern.compile("jdbc:mariadb://localhost:(\\d+)/([0-9a-zA-Z_-]+)");
        // Pattern regex = Pattern.compile("[0-9a-zA-z:/_]*");
        Matcher matcher = regex.matcher(dataSourceProperties.getUrl());
        if (matcher.matches()) {
            this.port = Integer.parseInt(matcher.group(1));
            this.dbName = matcher.group(2);
            var args = new ArrayList<>(
                    Arrays.asList("--character-set-server=utf8",
                                  "--collation-server=utf8_general_ci",
                                  "--user=root")
            );
            return new com.mintpot.carcloth.CustMariaDB4jSpringService(port, args);
        } else throw new ConfigurationException("database url has wrong format");

    }

    @Bean
    DataSource dataSource(
            MariaDB4jSpringService mariaDB4jSpringService,
            DataSourceProperties dataSrcProperties) throws ManagedProcessException {
        mariaDB4jSpringService.getDB().createDB(dbName);

        return DataSourceBuilder
                .create()
                .username(dataSrcProperties.getUsername())
                .password(dataSrcProperties.getPassword())
                .url(dataSrcProperties.getUrl())
                .driverClassName(dataSrcProperties.getDriverClassName())
                .build();
    }
}
