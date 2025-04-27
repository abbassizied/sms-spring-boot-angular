package io.github.abbassizied.sms.dtos.requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

public record ProductRequest( @NotBlank String name, 
		                      @Size(min = 2, max = 1000) String description, 
		                      @Positive Double price, 
		                      @PositiveOrZero Integer quantity, 
		                      @NotNull Long supplierId) {}
