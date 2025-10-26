package io.github.abbassizied.sms.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
// import org.mapstruct.factory.Mappers;

import io.github.abbassizied.sms.dtos.requests.SupplierRequest;
import io.github.abbassizied.sms.dtos.responses.SupplierResponse;
import io.github.abbassizied.sms.entities.Supplier;

@Mapper(componentModel = "spring")
public interface SupplierMapper {
    // Remove the INSTANCE line - conflicting with Spring component model
    // SupplierMapper INSTANCE = Mappers.getMapper( SupplierMapper.class );

    @Mapping(target = "id", ignore = true) // Ignore id since it's auto-generated
    @Mapping(target = "logoUrl", ignore = true) // File handling in service
    @Mapping(target = "products", ignore = true) // Ignore products mapping (not present in request)
    @Mapping(target = "dateCreated", ignore = true) // Ignore dateCreated
    @Mapping(target = "lastUpdated", ignore = true) // Ignore lastUpdated
    Supplier supplierRequestToSupplier(SupplierRequest dto);

    SupplierResponse supplierToSupplierResponse(Supplier supplier);
}
