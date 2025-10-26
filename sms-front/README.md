# SmsFront



## 

```bash
ng new sms-front
ng generate environments
//-----------------------

ng generate module pages/suppliers --routing
 
ng generate component pages/suppliers/supplier-form
ng generate component pages/suppliers/supplier-list
ng generate component pages/suppliers/supplier-detail

ng generate service _services/supplier
ng generate interface _models/supplier
//-----------------------

ng generate module pages/products --routing

ng generate component pages/products/product-form  
ng generate component pages/products/product-list
ng generate component pages/products/product-detail

ng generate service _services/product
ng generate interface _models/product 
//-----------------------

ng generate module pages/users --routing

ng generate component pages/users/user-form
ng generate component pages/users/user-list
ng generate component pages/users/user-detail

ng generate service _services/user
ng generate interface _models/user
//-----------------------

ng g c pages/not-found
ng g c pages/unauthorized
ng g c pages/register
ng g c pages/login
ng g c pages/home
ng g c layouts/header
ng g c layouts/footer
ng g c layouts/app-layout
ng g c layouts/sidebar
ng g c components/pagination
//-----------------------

ng g class _models/login-request --type=model --skip-tests
ng g class _models/register-request --type=model --skip-tests
ng g class _models/auth-response --type=model --skip-tests
ng g class _models/user --type=model --skip-tests

# Create the AuthService
ng g s _services/auth --skip-tests
//-----------------------

ng g interceptor _interceptors/auth
ng g interceptor _interceptors/error
ng g guard _guards/auth
ng g guard _guards/role

ng g c pages/admin --standalone
ng g c pages/profile --standalone 
//-----------------------
ng generate c components/logout --standalone 
//-----------------------

//-----------------------



yyyy
```

## Run dev server

```bash
ng serve -o
```

## Using a dedicated circular dependency tool:

```bash
# Install circular dependency detector
npm install -g madge

# Check for circular dependencies in your src folder
madge --circular src/

# Or for a specific file
madge --circular src/app/_services/supplier.service.ts
```


