package io.github.abbassizied.sms.dtos.responses; 

public record SupplierResponse(
	    Long id,
		String name, 
		String email,
		String phone,
		String address,
		String logoUrl
	) {}