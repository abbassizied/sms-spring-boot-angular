package io.github.abbassizied.sms.services;

import io.github.abbassizied.sms.dtos.requests.SupplierRequest;
import io.github.abbassizied.sms.dtos.responses.SupplierResponse;
import io.github.abbassizied.sms.entities.Supplier;
import io.github.abbassizied.sms.exceptions.ResourceNotFoundException;
import io.github.abbassizied.sms.mappers.SupplierMapper;
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
public class SupplierServiceImpl implements SupplierService {

    private final SupplierRepository supplierRepository;
    private final SupplierMapper supplierMapper;
    private final FileService fileService;

    @Override
    @Transactional
    public SupplierResponse createSupplier(SupplierRequest supplierRequest, MultipartFile logoUrl) throws IOException {
        
    	Supplier supplier = supplierMapper.supplierRequestToSupplier(supplierRequest);

        if (logoUrl != null && !logoUrl.isEmpty()) {
            supplier.setLogoUrl(fileService.saveFile(logoUrl));
        }

        Supplier savedSupplier = supplierRepository.save(supplier);
        log.info("Created new supplier with ID: {}", savedSupplier.getId());
        return supplierMapper.supplierToSupplierResponse(savedSupplier);
    }

    @Override
    @Transactional
    public SupplierResponse updateSupplier(Long id, SupplierRequest supplierRequest, MultipartFile logoUrl) throws IOException {
        
        Supplier existingSupplier = supplierRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Supplier not found with id: " + id));

        existingSupplier.setName(supplierRequest.name());
        existingSupplier.setEmail(supplierRequest.email());
        existingSupplier.setPhone(supplierRequest.phone());
        existingSupplier.setAddress(supplierRequest.address());

        // Handle logo file update
        String newLogoUrl = fileService.updateFile(logoUrl, existingSupplier.getLogoUrl());
        existingSupplier.setLogoUrl(newLogoUrl); // Save new file
        /*
        if (logoUrl != null && !logoUrl.isEmpty()) {
            fileService.deleteFile(existingSupplier.getLogoUrl()); // Delete old file
            existingSupplier.setLogoUrl(fileService.saveFile(logoUrl)); // Save new file
        }
        */
        
        Supplier updatedSupplier = supplierRepository.save(existingSupplier);
        log.info("Updated supplier with ID: {}", id);
        return supplierMapper.supplierToSupplierResponse(updatedSupplier);
    }

    @Override
    @Transactional
    public SupplierResponse deleteSupplier(Long id) {
    	
        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Supplier not found with id: " + id));

        fileService.deleteFile(supplier.getLogoUrl());
        supplierRepository.deleteById(id);
        log.info("Deleted supplier with ID: {}", id);
        return supplierMapper.supplierToSupplierResponse(supplier);
    }

    @Override
    @Transactional(readOnly = true)
    public SupplierResponse getSupplierById(Long id) {
    	
        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Supplier not found with id: " + id));
        return supplierMapper.supplierToSupplierResponse(supplier);
    }

    @Override
    @Transactional(readOnly = true)
    public List<SupplierResponse> getAllSuppliers() {
        return supplierRepository.findAll()
                .stream()
                .map(supplierMapper::supplierToSupplierResponse)
                .toList();
    }
    
    @Override
    @Transactional(readOnly = true)
    public Page<SupplierResponse> getAllSuppliers(Pageable pageable) {
        return supplierRepository.findAll(pageable)
                .map(supplierMapper::supplierToSupplierResponse);
    }    
}
