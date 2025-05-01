--
-- Dumping data for table `suppliers`
--

INSERT INTO `suppliers` (`id`, `address`, `date_created`, `email`, `last_updated`, `logo_url`, `name`, `phone`) VALUES
(1, '123 Street', '2025-01-20 20:11:44.000000', 'supplier@example.com', '2025-01-20 20:12:12.000000', 'http://localhost:8080/uploads/PWS7V0F5TO6H2WF8DD_product_1.jpeg', 'Supplier A', '123456789'),
(2, '123 Street', '2025-01-20 20:12:33.000000', 'supplier@example.com', '2025-01-20 20:12:33.000000', 'http://localhost:8080/uploads/HIB3READ9WTI7HMTJS_apple-logo.png', 'Supplier A', '123456789'),
(3, '123 Street', '2025-04-27 11:17:36.389605', 'supplier@example.com', '2025-04-27 11:25:51.501441', 'http://localhost:8080/uploads/Y42U2LXVUJXZJB24CA_samsung.jpg', 'Supplier A', '123456789'),
(4, '123 Street', '2025-04-27 13:32:11.818423', 'supplier@example.com', '2025-04-27 13:33:10.635567', 'http://localhost:8080/uploads/VK0UNOGPIDE47CNWB9_samsung.jpg', 'Supplier A', '123456789'),
(5, '123 Street', '2025-04-27 13:32:26.522644', 'supplier@example.com', '2025-04-27 13:32:26.522644', 'http://localhost:8080/uploads/ACRQEBFM4BTXFWWE1G_toyota-logo.png', 'Supplier A', '123456789'),
(6, '123 Street', '2025-04-27 13:32:35.507021', 'supplier@example.com', '2025-04-27 13:32:35.507021', 'http://localhost:8080/uploads/7LFZVR4TXWH7N5MUOK_toyota-logo.png', 'Supplier A', '123456789');


--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `date_created`, `description`, `last_updated`, `main_image`, `name`, `price`, `quantity`, `supplier_id`) VALUES
(1, '2025-04-27 15:45:21.339072', 'Arabica coffee beans from Colombia', '2025-04-27 15:45:21.339072', 'http://localhost:8080/uploads/M5VDM2TXPJD7NCUOCI_download.jpeg', 'Premium Coffee', 12, 100, 1),
(2, '2025-04-27 15:45:55.471635', 'High-performance laptop', '2025-04-27 15:51:18.050272', 'http://localhost:8080/uploads/QJTU2IHELIWYKB7TL4_download.jpeg', 'Laptop', 999.99, 99, 3),
(3, '2025-04-27 15:46:31.342211', 'Arabica coffee beans from Colombia', '2025-04-27 15:46:31.342211', 'http://localhost:8080/uploads/Q737ROVY64ECCD93ED_download.jpeg', 'Premium Coffee', 12, 100, 1);


--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `date_created`, `last_updated`, `url`, `product_id`) VALUES
(1, '2025-04-27 15:45:21.348386', '2025-04-27 15:45:21.348386', 'http://localhost:8080/uploads/OXAS3O3Y4DP0VD4J1F_download.jpeg', 1),
(2, '2025-04-27 15:45:55.475089', '2025-04-27 15:45:55.475089', 'http://localhost:8080/uploads/3QNLIS6ZAAG53L0NXY_download.jpeg', 2),
(3, '2025-04-27 15:45:55.478961', '2025-04-27 15:45:55.478961', 'http://localhost:8080/uploads/30KF1KS3ZL8000H87U_apple-macbook-air-m1-8go-256go-ssd-gris-4.jpg', 2),
(4, '2025-04-27 15:45:55.482170', '2025-04-27 15:45:55.482170', 'http://localhost:8080/uploads/SVM6DFLZAN2SVHR1GL_apple-watch-se-gps-44mm-starlight-aluminium (1).jpg', 2),
(5, '2025-04-27 15:45:55.485107', '2025-04-27 15:45:55.485107', 'http://localhost:8080/uploads/K3JK2T2DYVLGGY7ZWE_TOYOTA-Yaris-Cross-2021-Neuve-Maroc-12.jpg', 2),
(6, '2025-04-27 15:46:31.346342', '2025-04-27 15:46:31.346342', 'http://localhost:8080/uploads/P3O1HASOY78JZ2GEML_download.jpeg', 3),
(7, '2025-04-27 15:46:31.349614', '2025-04-27 15:46:31.349614', 'http://localhost:8080/uploads/9IWIRYTNT3F6S4S1NM_apple-macbook-air-m1-8go-256go-ssd-gris-4.jpg', 3),
(8, '2025-04-27 15:46:31.352912', '2025-04-27 15:46:31.352912', 'http://localhost:8080/uploads/T85GTZSF35ZMQ1WF5G_apple-watch-se-gps-44mm-starlight-aluminium (1).jpg', 3),
(9, '2025-04-27 15:46:31.356896', '2025-04-27 15:46:31.356896', 'http://localhost:8080/uploads/2YQ7FW7FRAYDK5Y1B6_TOYOTA-Yaris-Cross-2021-Neuve-Maroc-12.jpg', 3);
