package io.github.abbassizied.sms.controllers;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import io.github.abbassizied.sms.dtos.requests.SupplierRequest;
import io.github.abbassizied.sms.dtos.responses.SupplierResponse;
import io.github.abbassizied.sms.services.SupplierService;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/suppliers")
public class SupplierRestController {

    private final SupplierService supplierService;

    public SupplierRestController(SupplierService supplierService) {
        this.supplierService = supplierService;
    }

    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public SupplierResponse createSupplier( 
            @RequestParam("supplier") String supplierJson,
            @RequestParam( required = false) MultipartFile logoUrl
    		) throws IOException {
/*
        System.out.println("Received JSON: " + supplierJson);
        System.out.println("Received File: " + (logoUrl != null ? logoUrl.getOriginalFilename() : "No file uploaded"));
*/    	
        // Convert JSON String to SupplierRequest object
        SupplierRequest request = convertJsonToSupplierRequest(supplierJson);
        return supplierService.createSupplier(request, logoUrl);
    }

    @PutMapping(value = "/{id}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public SupplierResponse updateSupplier(
            @PathVariable Long id,
            @RequestParam("supplier") String supplierJson,
            @RequestParam( required = false) MultipartFile logoUrl
    ) throws IOException {
        SupplierRequest request = convertJsonToSupplierRequest(supplierJson);
        return supplierService.updateSupplier(id, request, logoUrl);
    }

    @DeleteMapping("/{id}")
    public SupplierResponse deleteSupplier(@PathVariable Long id) {
        return supplierService.deleteSupplier(id);
    }

    @GetMapping("/{id}")
    public SupplierResponse getSupplierById(@PathVariable Long id) {
        return supplierService.getSupplierById(id);
    }

    @GetMapping
    public List<SupplierResponse> getAllSuppliers() {
        return supplierService.getAllSuppliers();
    }

    // Helper method to convert JSON string to SupplierRequest
    private SupplierRequest convertJsonToSupplierRequest(String supplierJson) throws IOException {
        return new com.fasterxml.jackson.databind.ObjectMapper().readValue(supplierJson, SupplierRequest.class);
    }
}
