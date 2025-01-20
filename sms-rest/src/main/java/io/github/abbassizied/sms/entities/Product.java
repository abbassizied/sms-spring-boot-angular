package io.github.abbassizied.sms.entities;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.*;

@Entity
@Table(name = "products")
@Data // Generates getters, setters, toString, equals, and hashCode.
@NoArgsConstructor // Generates a no-args constructor.
@AllArgsConstructor // Generates a constructor with all arguments.
@Builder // Provides a builder pattern for object creation.
@EntityListeners(AuditingEntityListener.class)
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-incremented primary key
	private Long id;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false)
	private String mainImage;

	@Column(columnDefinition = "TEXT")
	private String description;

	@Column(nullable = false)
	private Double price;

	@Column(nullable = false)
	private Integer initialQuantity;

	@Column(nullable = false)
	private Integer quantity;

	@ManyToOne
	@JoinColumn(name = "supplier_id", nullable = false)
	private Supplier supplier;

	@OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Image> images;

	@CreatedDate
	@Column(nullable = false, updatable = false)
	private LocalDateTime dateCreated;

	@LastModifiedDate
	@Column(nullable = false)
	private LocalDateTime lastUpdated;
}