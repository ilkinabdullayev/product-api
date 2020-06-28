# Product REST API
You need to create role based authentication using JWT token
There are only 2 roles ‘admin’ and ‘client’
Both type of users (admin, client) should have ability to
  login
  logout
  see list of products
  see information of a specific product

Only users with role ‘admin’ are allowed to create/update/delete products
Only users with role ‘admin’ are allowed to see ‘created_by’ field of product(s)

There should be 2 containers:
 - api
 - mongodb

Schema:
user: {
  _id,
  username,
  password,
  name,
  lastname,
  age,
  role
} 
product: {
  _id,
  name,
  price,
  description,
  created_by #id of the user who created this product
}

## Tech stack
nodejs(express), mongodb, docker

## How to run

### 1. Define jwtAccessKey for Generating JWT TOKEN

### On Mac, Linux
export PRODUCT_JWT_ACCESS_KEY=`<key>`

### Windows
set PRODUCT_JWT_ACCESS_KEY=`<key>`

### 2. Run Docker compose
```ssh
docker-compose up
```

## Users
| Username  | Password  |  Role |
|-----------|-----------|-------|
| test      | test      | admin |
| test2     | test2     |  user |
| test3     | test3     | admin |
| test4     | test4     | admin |
| test5     | test5     |  user |

## APIS
https://www.getpostman.com/collections/a793ddc0080c2c44cadb


### Login
```
POST /api/auth/login HTTP/1.1
Host: localhost:5000
Content-Type: application/json

{
    "username": "test5",
    "password": "test5"
}
```

### Logout
```
GET /api/auth/logout HTTP/1.1
Host: localhost:5000
x-product-auth-token: <JWT_TOKEN>
```

### List Products
```
GET /api/products HTTP/1.1
Host: localhost:5000
x-product-auth-token: <JWT_TOKEN>
```

### Specific Product
```
GET /api/products/{PRODUCT_ID} HTTP/1.1
Host: localhost:5000
x-product-auth-token: <JWT_TOKEN>
```

### Add Product
```
POST /api/products HTTP/1.1
Host: localhost:5000
x-product-auth-token: <JWT_TOKEN>
Content-Type: application/json

{
    "name": "Test Test 22",
    "price": "2.2",
    "description": "Test Test Test"
}
```

### Update Product
```
PUT /api/products/{PRODUCT_ID} HTTP/1.1
Host: localhost:5000
x-product-auth-token: <JWT_TOKEN>
Content-Type: application/json

{
    "name": "Test Test",
    "price": "2"
}
```

### Delete Product
```
DELETE /api/products/{PRODUCT_ID} HTTP/1.1
Host: localhost:5000
x-product-auth-token: <JWT_TOKEN>
```

