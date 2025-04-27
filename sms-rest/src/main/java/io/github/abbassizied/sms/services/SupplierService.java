package io.github.abbassizied.sms.services;

import java.io.IOException;
import java.util.List;

import io.github.abbassizied.sms.dtos.requests.SupplierRequest;
import io.github.abbassizied.sms.dtos.responses.SupplierResponse;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SupplierService {

    List<SupplierResponse> getAllSuppliers();
    
    Page<SupplierResponse> getAllSuppliers(Pageable pageable);

    SupplierResponse getSupplierById(Long id);

    SupplierResponse createSupplier(SupplierRequest supplierRequest, MultipartFile logoUrl) throws IOException;

    SupplierResponse updateSupplier(Long id, SupplierRequest supplierRequest, MultipartFile logoUrl) throws IOException;

    SupplierResponse deleteSupplier(Long id);
}
