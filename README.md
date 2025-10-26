# sms-spring-boot-angular


## Run the JAR

```sh
java -jar target/your-app-name-1.0.0.jar
```

---

## backend

```sh
cd sms-rest
mvn spring-boot:run -DskipTests
```

---

## frontend

```sh
cd sms-front
ng serve -o
```

---

## test endpoints

```
###################################################################
############## User Registration (Sign Up)
###################################################################
{
  "username": "abbassi_zied",
  "email": "abbassizied@outlook.fr",
  "password": "securePassword123",
  "firstName": "Zied",
  "lastName": "Abbassi",
  "role": ["super_admin" "admin", "user"]
}

{
  "username": "admin",
  "email": "admin@local.tn",
  "password": "admin123",
  "firstName": "admin",
  "lastName": "admin",
  "role": ["super admin"]
}

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe",
  "role": ["user"]
}

###################################################################
############## User Login (Sign In)
###################################################################

{
  "username": "admin",
  "password": "admin123"
}

{
  "username": "abbassi_zied",
  "password": "securePassword123"
}


###################################################################
############## Public Endpoint
###################################################################

GET http://localhost:8999/api/public

###################################################################
############## Supplier Endpoints
###################################################################

# Create Supplier (with logo)
curl -X POST http://localhost:8999/api/suppliers \
  -F "supplier='{\"name\":\"Tech Supplier\",\"email\":\"contact@tech.com\",\"phone\":\"123-456-7890\",\"address\":\"123 Tech St\"}'" \
  -F "logoUrl=@/path/to/logo.png" \
  -H "Content-Type: multipart/form-data"

# Update Supplier
curl -X PUT http://localhost:8999/api/suppliers/1 \
  -F "supplier='{\"name\":\"Updated Supplier\",\"email\":\"updated@tech.com\",\"phone\":\"098-765-4321\",\"address\":\"456 New St\"}'" \
  -F "logoUrl=@/path/to/new-logo.png" \
  -H "Content-Type: multipart/form-data"

# Delete Supplier
curl -X DELETE http://localhost:8999/api/suppliers/1

# Get Supplier by ID
curl -X GET http://localhost:8999/api/suppliers/1

# Get All Suppliers Without Pagination
curl -X GET http://localhost:8999/api/suppliers/all

# Get All Suppliers with Pagination
# Default pagination (page=0, size=20, sort=name)
curl -X GET "http://localhost:8999/api/suppliers"

# Custom pagination
curl -X GET "http://localhost:8999/api/suppliers?page=0&size=10&sort=name,asc"
 
###################################################################
############## Product Endpoints
###################################################################

# Create Product (with images)
curl -X POST http://localhost:8999/api/products \
  -F "product='{\"name\":\"Laptop\",\"description\":\"Gaming laptop\",\"price\":999.99,\"quantity\":10,\"supplierId\":1}'" \
  -F "mainImage=@/path/to/main-image.jpg" \
  -F "images=@/path/to/image1.jpg" \
  -F "images=@/path/to/image2.jpg" \
  -H "Content-Type: multipart/form-data"

# Get Product by ID
curl -X GET http://localhost:8999/api/products/1

# Get All Products with Pagination
# Default pagination (page=0, size=20, sort=name)
curl -X GET "http://localhost:8999/api/products"
# Custom pagination
curl -X GET "http://localhost:8999/api/products?page=0&size=10&sort=price,desc"

# Get All Products Without Pagination
curl -X GET http://localhost:8999/api/products/all

# Update Product
curl -X PUT http://localhost:8999/api/products/1 \
  -F "product='{\"name\":\"Updated Laptop\",\"description\":\"Updated description\",\"price\":899.99,\"quantity\":5,\"supplierId\":1}'" \
  -F "mainImage=@/path/to/new-main-image.jpg" \
  -F "images=@/path/to/new-image1.jpg" \
  -H "Content-Type: multipart/form-data"

# Delete Product
curl -X DELETE http://localhost:8999/api/products/1
```

