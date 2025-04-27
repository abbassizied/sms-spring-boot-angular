package io.github.abbassizied.sms.mappers; 

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import io.github.abbassizied.sms.dtos.requests.ProductRequest;
import io.github.abbassizied.sms.dtos.responses.ProductResponse;
import io.github.abbassizied.sms.entities.Product;

@Mapper(componentModel = "spring", uses = {ImageMapper.class, SupplierMapper.class})
public interface ProductMapper { 
	
	// No need for INSTANCE if using Spring
	ProductMapper INSTANCE = Mappers.getMapper(ProductMapper.class);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "mainImage", ignore = true) // Will be set separately
    @Mapping(target = "images", ignore = true) // Will be set separately
    @Mapping(target = "supplier", ignore = true) // Will be set using supplierId
    @Mapping(target = "dateCreated", ignore = true)
    @Mapping(target = "lastUpdated", ignore = true)
    Product productRequestToProduct(ProductRequest productDto); 

    @Mapping(target = "mainImage", source = "mainImage")
    @Mapping(target = "images", source = "images")
    @Mapping(target = "supplier", source = "supplier")
    ProductResponse productToProductResponse(Product product);  
}
