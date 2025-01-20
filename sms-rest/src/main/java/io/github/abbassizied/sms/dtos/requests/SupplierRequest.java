package io.github.abbassizied.sms.dtos.requests;

public record SupplierRequest(
		String name, 
		String email,
		String phone,
		String address
		) {}