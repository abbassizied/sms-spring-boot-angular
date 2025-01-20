package io.github.abbassizied.sms.services;

import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import io.github.abbassizied.sms.dtos.requests.SupplierRequest;
import io.github.abbassizied.sms.dtos.responses.SupplierResponse;
import io.github.abbassizied.sms.entities.Supplier;
import io.github.abbassizied.sms.mappers.SupplierMapper;
import io.github.abbassizied.sms.repositories.SupplierRepository;

@Service
public class SupplierServiceImpl implements SupplierService {

    private final SupplierRepository supplierRepository;
    private final SupplierMapper supplierMapper;
    private final FileService fileService;

    public SupplierServiceImpl(SupplierRepository supplierRepository, SupplierMapper supplierMapper,
                               FileService fileService) {
        this.supplierRepository = supplierRepository;
        this.supplierMapper = supplierMapper;
        this.fileService = fileService;
    }

    @Override
    public SupplierResponse createSupplier(SupplierRequest supplierRequest, MultipartFile logoUrl) throws IOException {
        Supplier supplier = supplierMapper.toSupplier(supplierRequest);

        if (logoUrl != null && !logoUrl.isEmpty()) {
            supplier.setLogoUrl(fileService.saveFile(logoUrl));
        }

        supplier = supplierRepository.save(supplier);
        return supplierMapper.fromSupplier(supplier);
    }

    @Override
    public SupplierResponse updateSupplier(Long id, SupplierRequest supplierRequest, MultipartFile logoUrl) throws IOException {
        Supplier existingSupplier = supplierRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Supplier not found"));

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
        existingSupplier = supplierRepository.save(existingSupplier);
        return supplierMapper.fromSupplier(existingSupplier);
    }

    @Override
    public SupplierResponse deleteSupplier(Long id) {
        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Supplier not found"));

        fileService.deleteFile(supplier.getLogoUrl());
        supplierRepository.deleteById(id);
        return supplierMapper.fromSupplier(supplier);
    }

    @Override
    public SupplierResponse getSupplierById(Long id) {
        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Supplier not found"));
        return supplierMapper.fromSupplier(supplier);
    }

    @Override
    public List<SupplierResponse> getAllSuppliers() {
        return supplierRepository.findAll()
                .stream()
                .map(supplierMapper::fromSupplier)
                .toList();
    }
}
