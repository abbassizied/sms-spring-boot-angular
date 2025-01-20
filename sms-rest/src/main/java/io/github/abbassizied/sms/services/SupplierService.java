package io.github.abbassizied.sms.services;

import java.io.IOException;
import java.util.List;

import io.github.abbassizied.sms.dtos.requests.SupplierRequest;
import io.github.abbassizied.sms.dtos.responses.SupplierResponse;
import org.springframework.web.multipart.MultipartFile;

public interface SupplierService {

    SupplierResponse getSupplierById(Long id);

    List<SupplierResponse> getAllSuppliers();

    SupplierResponse createSupplier(SupplierRequest supplierRequest, MultipartFile logoUrl) throws IOException;

    SupplierResponse updateSupplier(Long id, SupplierRequest supplierRequest, MultipartFile logoUrl) throws IOException;

    SupplierResponse deleteSupplier(Long id);
}
