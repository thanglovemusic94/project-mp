package com.mintpot.carcloth;

import ch.vorburger.mariadb4j.springframework.MariaDB4jSpringService;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
public class CustMariaDB4jSpringService extends MariaDB4jSpringService {

    public CustMariaDB4jSpringService(int port, List<String> args) {

        this.setDefaultPort(port);
        args.forEach(arg -> this.getConfiguration().addArg(arg));
    }

    @Override
    public void start() {
        super.start();
    }
}
