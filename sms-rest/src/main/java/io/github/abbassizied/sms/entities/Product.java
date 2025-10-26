package io.github.abbassizied.sms.entities;

import jakarta.persistence.*;
import lombok.*;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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
	private Integer quantity;

	/*
	 * 
	 * FetchType.LAZY = Doesn’t load the relationships unless explicitly “asked for”
	 * via getter
	 * FetchType.EAGER = Loads ALL relationships
	 */

	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "supplier_id", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Supplier supplier;

	@OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
	@Builder.Default
	private List<Image> images = new ArrayList<>();

	@CreatedDate
	@Column(nullable = false, updatable = false)
	private LocalDateTime dateCreated;

	@LastModifiedDate
	@Column(nullable = false)
	private LocalDateTime lastUpdated;
}