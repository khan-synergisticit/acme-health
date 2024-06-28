package com.synergistic.acmehealth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
@SpringBootApplication(exclude = org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration.class)

//@SpringBootApplication
public class AcmeHealthApplication {

    public static void main(String[] args) {
        SpringApplication.run(AcmeHealthApplication.class, args);
    }

}
