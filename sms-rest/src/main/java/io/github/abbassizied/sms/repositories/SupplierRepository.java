package io.github.abbassizied.sms.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import io.github.abbassizied.sms.entities.Supplier;

@Repository
public interface SupplierRepository extends JpaRepository<Supplier, Long> {
}