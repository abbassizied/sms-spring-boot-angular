package io.github.abbassizied.sms;

import java.io.File;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class SmsRestApplication {

	public static String uploadDirectory = System.getProperty("user.dir") + "/src/main/resources/static/uploads";

	public static void main(String[] args) {
		new File(uploadDirectory).mkdir();
		SpringApplication.run(SmsRestApplication.class, args);
	}

}
