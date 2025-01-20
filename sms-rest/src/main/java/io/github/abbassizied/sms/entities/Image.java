package io.github.abbassizied.sms.entities;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "images")
@Data // Generates getters, setters, toString, equals, and hashCode.
@NoArgsConstructor // Generates a no-args constructor.
@AllArgsConstructor // Generates a constructor with all arguments.
@Builder // Provides a builder pattern for object creation.
@EntityListeners(AuditingEntityListener.class)
public class Image {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-incremented primary key
	private Long id;

	@Column(nullable = false)
	private String url;

	@ManyToOne
	@JoinColumn(name = "product_id", nullable = false)
	private Product product;

	@CreatedDate
	@Column(nullable = false, updatable = false)
	private LocalDateTime dateCreated;

	@LastModifiedDate
	@Column(nullable = false)
	private LocalDateTime lastUpdated;
}