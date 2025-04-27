package io.github.abbassizied.sms.services;

import io.github.abbassizied.sms.dtos.requests.ProductRequest;
import io.github.abbassizied.sms.dtos.responses.ProductResponse;
import io.github.abbassizied.sms.entities.Product;
import io.github.abbassizied.sms.entities.Image;
import io.github.abbassizied.sms.entities.Supplier;
import io.github.abbassizied.sms.exceptions.ResourceNotFoundException;
import io.github.abbassizied.sms.mappers.ProductMapper;
import io.github.abbassizied.sms.repositories.ProductRepository;
import io.github.abbassizied.sms.repositories.SupplierRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.IOException;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final SupplierRepository supplierRepository;
    private final ProductMapper productMapper;
    private final FileService fileService;

    @Override
    @Transactional
    public ProductResponse createProduct(ProductRequest productRequest, MultipartFile mainImage, List<MultipartFile> images) throws IOException {
        // Convert DTO to entity
        Product product = productMapper.productRequestToProduct(productRequest);
        
        // Set supplier
        Supplier supplier = supplierRepository.findById(productRequest.supplierId())
                .orElseThrow(() -> new ResourceNotFoundException("Supplier not found with id: " + productRequest.supplierId()));
        product.setSupplier(supplier);
        
        // Save main image
		if (mainImage != null) {
			String mainImageUrl = fileService.saveFile(mainImage);
			product.setMainImage(mainImageUrl);
		}
        
        // Save additional images
        if (images != null && !images.isEmpty()) {
            List<String> imageUrls = fileService.saveFiles(images);
            List<Image> productImages = imageUrls.stream()
                    .map(url -> Image.builder()
                            .url(url)
                            .product(product)
                            .build())
                    .toList();
            product.setImages(productImages);
        }
        
        // Save product
        Product savedProduct = productRepository.save(product);
        log.info("Created new product with ID: {}", savedProduct.getId());
        return productMapper.productToProductResponse(savedProduct);
    }

    @Override
    @Transactional
    public ProductResponse updateProduct(Long id, ProductRequest productRequest, MultipartFile mainImage, List<MultipartFile> images) throws IOException {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        
        // Update basic fields
        existingProduct.setName(productRequest.name());
        existingProduct.setDescription(productRequest.description());
        existingProduct.setPrice(productRequest.price());
        existingProduct.setQuantity(productRequest.quantity());
        
        // Update supplier if changed
        if (!existingProduct.getSupplier().getId().equals(productRequest.supplierId())) {
            Supplier supplier = supplierRepository.findById(productRequest.supplierId())
                    .orElseThrow(() -> new ResourceNotFoundException("Supplier not found with id: " + productRequest.supplierId()));
            existingProduct.setSupplier(supplier);
        }
        
        // Update main image if provided
        if (mainImage != null && !mainImage.isEmpty()) {
            fileService.deleteFile(existingProduct.getMainImage());
            String newMainImageUrl = fileService.saveFile(mainImage);
            existingProduct.setMainImage(newMainImageUrl);
        }
        
        // Update additional images if provided
        if (images != null && !images.isEmpty()) {
            // Delete old images
            List<String> oldImageUrls = existingProduct.getImages().stream()
                    .map(Image::getUrl)
                    .toList();
            fileService.deleteFiles(oldImageUrls);
            
            // Save new images
            List<String> newImageUrls = fileService.saveFiles(images);
            List<Image> productImages = newImageUrls.stream()
                    .map(url -> Image.builder()
                            .url(url)
                            .product(existingProduct)
                            .build())
                    .toList();
            existingProduct.setImages(productImages);
        }
        
        Product updatedProduct = productRepository.save(existingProduct);
        log.info("Updated product with ID: {}", id);
        return productMapper.productToProductResponse(updatedProduct);
    }

    @Override
    @Transactional(readOnly = true)
    public ProductResponse getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        log.info("Deleted product with ID: {}", id);
        return productMapper.productToProductResponse(product);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponse> getAllProducts() {
        return productRepository.findAll().stream()
                .map(productMapper::productToProductResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)    
    public Page<ProductResponse> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable)
                .map(productMapper::productToProductResponse);
    }    

    @Override
    @Transactional
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        
        // Delete main image
        fileService.deleteFile(product.getMainImage());
        
        // Delete additional images
        if (product.getImages() != null && !product.getImages().isEmpty()) {
            List<String> imageUrls = product.getImages().stream()
                    .map(Image::getUrl)
                    .toList();
            fileService.deleteFiles(imageUrls);
        }
        
        productRepository.delete(product);
    }
}