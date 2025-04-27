package io.github.abbassizied.sms.exceptions;

import java.util.Date;
import java.util.Map;

//Use records (Java 16+) for immutable DTOs
public record ErrorResponse(
 int statusCode,
 Date timestamp,
 String message,
 Map<String, String> validationErrors,
 String details
) {
 // Constructor for regular errors (without validationErrors)
 public ErrorResponse(int statusCode, Date timestamp, String message, String details) {
     this(statusCode, timestamp, message, null, details);
 }
}