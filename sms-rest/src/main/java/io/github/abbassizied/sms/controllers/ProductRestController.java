package io.github.abbassizied.sms.controllers;

import io.github.abbassizied.sms.dtos.requests.ProductRequest;
import io.github.abbassizied.sms.dtos.responses.ProductResponse;
import io.github.abbassizied.sms.services.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/products")
public class ProductRestController {

	private final ProductService productService;

	@PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<ProductResponse> createProduct(
			@Valid @RequestParam("product") String productJson,
			@RequestPart MultipartFile mainImage,
			@RequestPart(required = false) List<MultipartFile> images) throws IOException {

		// Convert JSON String to ProductRequest object
		ProductRequest productRequest = convertJsonToProductRequest(productJson);

		log.info("Creating new product: {}", productRequest.name());
		ProductResponse response = productService.createProduct(productRequest, mainImage, images);
		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}

	@GetMapping("/{id}")
	public ResponseEntity<ProductResponse> getProductById(@PathVariable Long id) {
		log.info("Fetching product with ID: {}", id);
		return ResponseEntity.ok(productService.getProductById(id));
	}

	@GetMapping
	public ResponseEntity<Page<ProductResponse>> getAllProducts(
			@PageableDefault(size = 20, sort = "name") Pageable pageable) {

		log.info("Fetching all products with pagination: {}", pageable);
		return ResponseEntity.ok(productService.getAllProducts(pageable));
	}

	@GetMapping("/all")
	public ResponseEntity<List<ProductResponse>> getAllProductsWithoutPagination() {
		log.info("Fetching all products without pagination");
		return ResponseEntity.ok(productService.getAllProducts());
	}

	@PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<ProductResponse> updateProduct(
			@PathVariable Long id,
			@Valid @RequestParam("product") String productJson,
			@RequestPart(required = false) MultipartFile mainImage,
			@RequestPart(required = false) List<MultipartFile> images) throws IOException {

		// Convert JSON String to ProductRequest object
		ProductRequest productRequest = convertJsonToProductRequest(productJson);

		log.info("Updating product with ID: {}", id);
		ProductResponse response = productService.updateProduct(id, productRequest, mainImage, images);
		return ResponseEntity.ok(response);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
		log.info("Deleting product with ID: {}", id);
		productService.deleteProduct(id);
		return ResponseEntity.noContent().build();
	}

	// Helper method to convert JSON string to ProductRequest
	private ProductRequest convertJsonToProductRequest(String productJson) throws IOException {
		return new com.fasterxml.jackson.databind.ObjectMapper().readValue(productJson, ProductRequest.class);
	}
}