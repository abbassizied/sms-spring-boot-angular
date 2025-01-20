package io.github.abbassizied.sms.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import io.github.abbassizied.sms.entities.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
}