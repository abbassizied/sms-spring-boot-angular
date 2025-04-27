package io.github.abbassizied.sms.exceptions;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.support.MissingServletRequestPartException;

import java.util.Date;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

    // Constants for error messages
    private static final String VALIDATION_FAILED = "Validation failed";
    private static final String UNEXPECTED_ERROR = "An unexpected error occurred";
    private static final String FILE_TOO_LARGE = "File too large!";
    private static final String BAD_REQUEST_MESSAGE = "Bad request";
    private static final String METHOD_NOT_ALLOWED_MESSAGE = "Method not allowed";
    private static final String UNSUPPORTED_MEDIA_TYPE_MESSAGE = "Unsupported media type";

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFound(ResourceNotFoundException ex, WebRequest request) {
        log.error("Resource not found: {}", ex.getMessage());
        return buildErrorResponse(ex, HttpStatus.NOT_FOUND, request);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationErrors(MethodArgumentNotValidException ex, WebRequest request) {
        log.error("Validation error: {}", ex.getMessage());

        Map<String, String> errors = ex.getBindingResult().getFieldErrors().stream()
                .collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage));

        return ResponseEntity.badRequest().body(new ErrorResponse(
                HttpStatus.BAD_REQUEST.value(),
                new Date(),
                VALIDATION_FAILED,
                errors,
                request.getDescription(false)
        ));
    }

    @ExceptionHandler({
            IllegalArgumentException.class,
            MissingServletRequestParameterException.class,
            HttpMessageNotReadableException.class,
            MissingServletRequestPartException.class
    })
    public ResponseEntity<ErrorResponse> handleBadRequestExceptions(Exception ex, WebRequest request) {
        log.error("Bad request: {}", ex.getMessage());
        return buildErrorResponse(BAD_REQUEST_MESSAGE, HttpStatus.BAD_REQUEST, request);
    }

    @ExceptionHandler(HttpMediaTypeNotSupportedException.class)
    public ResponseEntity<ErrorResponse> handleHttpMediaTypeNotSupported(HttpMediaTypeNotSupportedException ex, WebRequest request) {
        log.error("Unsupported media type: {}", ex.getMessage());
        String message = UNSUPPORTED_MEDIA_TYPE_MESSAGE + ". Supported types: " + ex.getSupportedMediaTypes();
        return buildErrorResponse(message, HttpStatus.UNSUPPORTED_MEDIA_TYPE, request);
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ErrorResponse> handleMethodNotSupported(HttpRequestMethodNotSupportedException ex, WebRequest request) {
        log.error("Method not allowed: {}", ex.getMessage());
        return buildErrorResponse(METHOD_NOT_ALLOWED_MESSAGE, HttpStatus.METHOD_NOT_ALLOWED, request);
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<ErrorResponse> handleMaxSizeException(MaxUploadSizeExceededException ex, WebRequest request) {
        log.error("File size exceeded: {}", ex.getMessage());
        return buildErrorResponse(FILE_TOO_LARGE, HttpStatus.PAYLOAD_TOO_LARGE, request);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGlobalException(Exception ex, WebRequest request) {
        log.error("Unexpected error: {}", ex.getMessage(), ex);
        return buildErrorResponse(UNEXPECTED_ERROR, HttpStatus.INTERNAL_SERVER_ERROR, request);
    }

    // Helper method to build an error response with an exception
    private ResponseEntity<ErrorResponse> buildErrorResponse(Exception ex, HttpStatus status, WebRequest request) {
        return buildErrorResponse(ex.getMessage(), status, request);
    }

    // Helper method to build an error response with a custom message
    private ResponseEntity<ErrorResponse> buildErrorResponse(String message, HttpStatus status, WebRequest request) {
        ErrorResponse response = new ErrorResponse(
                status.value(),
                new Date(),
                message,
                request.getDescription(false)
        );
        return ResponseEntity.status(status).body(response);
    }
}