package io.github.abbassizied.sms.dtos.responses;

import java.time.LocalDateTime;

public record ImageResponse( Long id, 
		                     String url, 
		                     LocalDateTime dateCreated, 
		                     LocalDateTime lastUpdated) {}