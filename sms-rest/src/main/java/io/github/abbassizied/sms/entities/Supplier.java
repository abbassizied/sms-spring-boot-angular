package io.github.abbassizied.sms.entities;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.*;

@Entity
@Table(name = "suppliers")
@Data // Generates getters, setters, toString, equals, and hashCode.
@NoArgsConstructor // Generates a no-args constructor.
@AllArgsConstructor // Generates a constructor with all arguments.
@Builder // Provides a builder pattern for object creation.
@EntityListeners(AuditingEntityListener.class)
public class Supplier {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-incremented primary key
	private Long id;

	@Column(nullable = false)
	private String name;

	@Column
	private String logoUrl;

	@Column(nullable = false)
	private String email;

	@Column(nullable = false)
	private String phone;

	@Column
	private String address;

	@OneToMany(mappedBy = "supplier", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Product> products;

	@CreatedDate
	@Column(nullable = false, updatable = false)
	private LocalDateTime dateCreated;

	@LastModifiedDate
	@Column(nullable = false)
	private LocalDateTime lastUpdated;
}