# DDD-Based Design for SMS( Stock Management System)

- **Refs**:
	- [Domain-Driven Design (DDD)](https://redis.io/glossary/domain-driven-design-ddd/#:~:text=Domain%2DDriven%20Design%20(DDD)%20is%20a%20software%20development%20philosophy,the%20business%20needs%20it%20serves.)
	- [Design a DDD-oriented microservice](https://learn.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/ddd-oriented-microservice)
	- [Domain-Driven Design (DDD): A Guide to Building Scalable, High-Performance Systems](https://romanglushach.medium.com/domain-driven-design-ddd-a-guide-to-building-scalable-high-performance-systems-5314a7fe053c)
	- [Building a RESTful API with Spring Boot: Integrating DDD and Hexagonal Architecture](https://medium.com/@juannegrin/building-a-restful-api-with-spring-boot-integrating-ddd-and-hexagonal-architecture-df50fe24a1ff)
	- [Implementing DDD with Hexagonal Architecture in Spring Boot](https://www.codeburps.com/post/implementing-ddd-with-hexagonal-architecture-in-spring-boot)
	- []()
	- []()
	- []()


## Structure of the backend project:

- **1. Domain Layer**: This layer encapsulates the business rules and core entities of the system.
	- **Entities and Value Objects**: Supplier, Product, Customer, Order, OrderItem, Purchase, PurchaseItem, User, Role, Notification
	- **Domain Services**: Encapsulates business logic that spans multiple entities. Example: OrderValidationService to validate stock availability before order placement.
	- **Repositories (Interfaces)**: SupplierRepository, ProductRepository, CustomerRepository, OrderRepository, PurchaseRepository
- **2. Application Layer**: Defines use cases and coordinates interactions between the domain and infrastructure.
	- **Services**: OrderService, PurchaseService, UserService, ... 
	- **DTOs**: Data Transfer Objects for request/response data: CreateOrderRequest, OrderResponse, etc.
	- **Event Handlers**: Publishes and handles domain events (e.g., OrderPlacedEvent). 
- **3. Infrastructure Layer**: Handles persistence, messaging, and external integrations.
	- **Persistence Adapters**: Implements repositories using JPA/Hibernate: JpaOrderRepository, JpaProductRepository.
	- **Messaging**: Handles asynchronous messaging and notifications.
	- **Security**: Configures authentication and authorization. 
- **4. Presentation Layer**: Exposes RESTful endpoints for interacting with the system.
	- **Controllers**: SupplierController, ProductController, CustomerController, OrderController, PurchaseController
	- **Mappers**: Converts between domain objects and DTOs.
	- **Exception Handlers**: Provides centralized error handling.

```
sms-ddd-rest/
├── src/main/
│   ├── java/
│   │   └── io/
│   │       └── github/
│   │           └── abbassizied/
│   │               └── sms/
│   │                   ├── domain/           // Core Domain Logic
│   │                   │   ├── model/       // Entities and Value Objects
│   │                   │   │   ├── customer/
│   │                   │   │   │   ├── Customer.java
│   │                   │   │   │   └── ...
│   │                   │   │   ├── order/
│   │                   │   │   │   ├── Order.java
│   │                   │   │   │   ├── OrderItem.java
│   │                   │   │   │   └── OrderStatus.java (Enum)
│   │                   │   │   ├── product/
│   │                   │   │   │   ├── Product.java
│   │                   │   │   │   └── ...
│   │                   │   │   ├── purchase/
│   │                   │   │   │   ├── Purchase.java
│   │                   │   │   │   ├── PurchaseItem.java
│   │                   │   │   │   └── ...
│   │                   │   │   ├── supplier/
│   │                   │   │   │   ├── Supplier.java
│   │                   │   │   │   └── ...
│   │                   │   │   ├── user/
│   │                   │   │   │   ├── Notification.java
│   │                   │   │   │   ├── NotificationType.java (Enum)
│   │                   │   │   │   ├── Privilege.java
│   │                   │   │   │   ├── Role.java
│   │                   │   │   │   └── User.java
│   │                   │   ├── repository/    // Interfaces for Data Access
│   │                   │   │   ├── CustomerRepository.java
│   │                   │   │   ├── OrderRepository.java
│   │                   │   │   ├── ProductRepository.java
│   │                   │   │   ├── PurchaseRepository.java
│   │                   │   │   ├── SupplierRepository.java
│   │                   │   │   └── UserRepository.java
│   │                   │   ├── service/        // Domain Services (if needed)
│   │                   │   │   ├── OrderService.java
│   │                   │   │   └── StockManagementService.java // Example for complex logic
│   │                   ├── application/       
│   │                   │   ├── dto/
│   │                   │       ├── CreateOrderRequest.java
│   │                   │       ├── OrderResponse.java
│   │                   │       └── ...
│   │                   │   ├── event/    // Domain Events
│   │                   │       ├── OrderPlacedEvent.java 
│   │                   │       └── ...
│   │                   │   └── service/
│   │                   │       ├── 
│   │                   │       ├── 
│   │                   │       └── ...
│   │                   ├── infrastructure/    // Infrastructure Concerns (Persistence, Messaging, etc.)
│   │                   │   ├── persistence/   // Data Access Implementations
│   │                   │   │   ├── jpa/
│   │                   │   │   │   ├── CustomerJpaRepository.java
│   │                   │   │   │   └── ...
│   │                   │   ├── messaging/
│   │                   │   │   └── ...
│   │                   │   └── config/      // Configuration classes
│   │                   │       └── ...
│   │                   ├── presentation/       
│   │                   │   ├── controller/
│   │                   │   │   ├── CustomerController.java
│   │                   │   │   └── ...
│   │                   │   ├── mapper/
│   │                   │   │   ├── 
│   │                   │   │   └── ...
│   │                   │   └── exception/  
│   │                   │       └── ...
│   │                   │
│   │                   └── SmsMvcApplication.java // Main Spring Boot Application
│   └── resources/
│       └── ...
└── pom.xml
```







