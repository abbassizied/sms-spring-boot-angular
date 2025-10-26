package io.github.abbassizied.sms.controllers;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/public")
@CrossOrigin(origins = "*", maxAge = 3600)
public class IndexController {

	@GetMapping
	String index() {
		return "A REST API with Spring Boot for a stock management application.";
	}

}
