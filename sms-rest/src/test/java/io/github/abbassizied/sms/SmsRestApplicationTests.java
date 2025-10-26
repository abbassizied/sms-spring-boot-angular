package io.github.abbassizied.sms;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@SpringBootTest
class SmsRestApplicationTests {

	@Test
	void contextLoads() {
		// Test passes if Spring context loads successfully
		log.debug("Spring application context loaded successfully - all configurations are valid");
	}

}
