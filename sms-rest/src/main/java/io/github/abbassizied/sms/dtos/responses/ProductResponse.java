package io.github.abbassizied.sms.dtos.responses;

import java.time.LocalDateTime;
import java.util.List; 

public record ProductResponse( Long id,
		 					   String name, 
		 					   String description, 
		 					   Double price, 
		 					   Integer quantity,  
		 					   String mainImage, // Main image URL
		 				       List<ImageResponse> images, // List of additional image URLs
		 				       SupplierResponse supplier,
		 					   LocalDateTime dateCreated,
		 					   LocalDateTime lastUpdated ) {}
