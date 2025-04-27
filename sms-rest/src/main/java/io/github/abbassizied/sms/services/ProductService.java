package io.github.abbassizied.sms.services;

import io.github.abbassizied.sms.dtos.requests.ProductRequest;
import io.github.abbassizied.sms.dtos.responses.ProductResponse;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.IOException;
import java.util.List;

public interface ProductService {

	ProductResponse createProduct(ProductRequest productRequest, MultipartFile mainImage, List<MultipartFile> images)
			throws IOException;

	ProductResponse updateProduct(Long id, ProductRequest productRequest, MultipartFile mainImage,
			List<MultipartFile> images) throws IOException;

	ProductResponse getProductById(Long id);

	List<ProductResponse> getAllProducts();
	
	Page<ProductResponse> getAllProducts(Pageable pageable);

	void deleteProduct(Long id);
}
