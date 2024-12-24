package org.example.final_oop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan("org.example.final_oop.model")
@EnableJpaRepositories("org.example.final_oop.repository")
public class FinalOopApplication {
    public static void main(String[] args) {
        SpringApplication.run(FinalOopApplication.class, args);
    }
}