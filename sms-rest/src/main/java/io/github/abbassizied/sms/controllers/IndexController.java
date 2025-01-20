package io.github.abbassizied.sms.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class IndexController {

	@GetMapping("/")
	String index() {
		return "A REST API with Spring Boot for a stock management application.";
	}

}
