-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Oct 22, 2025 at 09:12 PM
-- Server version: 9.2.0
-- PHP Version: 8.2.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `amsdbrest2025`
--

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` bigint NOT NULL,
  `date_created` datetime(6) NOT NULL,
  `last_updated` datetime(6) NOT NULL,
  `url` varchar(255) NOT NULL,
  `product_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `date_created`, `last_updated`, `url`, `product_id`) VALUES
(1, '2025-04-27 15:45:21.348386', '2025-04-27 15:45:21.348386', 'http://localhost:8080/uploads/OXAS3O3Y4DP0VD4J1F_download.jpeg', 1),
(6, '2025-04-27 15:46:31.346342', '2025-04-27 15:46:31.346342', 'http://localhost:8080/uploads/P3O1HASOY78JZ2GEML_download.jpeg', 3),
(7, '2025-04-27 15:46:31.349614', '2025-04-27 15:46:31.349614', 'http://localhost:8080/uploads/9IWIRYTNT3F6S4S1NM_apple-macbook-air-m1-8go-256go-ssd-gris-4.jpg', 3),
(8, '2025-04-27 15:46:31.352912', '2025-04-27 15:46:31.352912', 'http://localhost:8080/uploads/T85GTZSF35ZMQ1WF5G_apple-watch-se-gps-44mm-starlight-aluminium (1).jpg', 3),
(9, '2025-04-27 15:46:31.356896', '2025-04-27 15:46:31.356896', 'http://localhost:8080/uploads/2YQ7FW7FRAYDK5Y1B6_TOYOTA-Yaris-Cross-2021-Neuve-Maroc-12.jpg', 3);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint NOT NULL,
  `date_created` datetime(6) NOT NULL,
  `description` text,
  `last_updated` datetime(6) NOT NULL,
  `main_image` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `quantity` int NOT NULL,
  `supplier_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `date_created`, `description`, `last_updated`, `main_image`, `name`, `price`, `quantity`, `supplier_id`) VALUES
(1, '2025-04-27 15:45:21.339072', 'Arabica coffee beans from Colombia', '2025-04-27 15:45:21.339072', 'http://localhost:8080/uploads/M5VDM2TXPJD7NCUOCI_download.jpeg', 'Premium Coffee', 12, 100, 1),
(3, '2025-04-27 15:46:31.342211', 'Arabica coffee beans from Colombia', '2025-04-27 15:46:31.342211', 'http://localhost:8080/uploads/Q737ROVY64ECCD93ED_download.jpeg', 'Premium Coffee', 12, 100, 1),
(4, '2025-10-22 21:11:46.000000', 'Wireless noise-cancelling headphones with 30hr battery life', '2025-10-22 21:11:46.000000', 'headphones.jpg', 'Wireless Headphones Pro', 199.99, 50, 1),
(5, '2025-10-22 21:11:46.000000', '15-inch laptop with 16GB RAM and 512GB SSD', '2025-10-22 21:11:46.000000', 'laptop.jpg', 'UltraBook Pro Laptop', 1299.99, 25, 1),
(6, '2025-10-22 21:11:46.000000', 'Latest smartphone with triple camera system', '2025-10-22 21:11:46.000000', 'smartphone.jpg', 'Smartphone X200', 899.99, 75, 1),
(7, '2025-10-22 21:11:46.000000', '10-inch tablet with stylus and keyboard cover', '2025-10-22 21:11:46.000000', 'tablet.jpg', 'Tablet Mini Pro', 449.99, 40, 1),
(8, '2025-10-22 21:11:46.000000', 'Smartwatch with heart rate monitor and GPS', '2025-10-22 21:11:46.000000', 'smartwatch.jpg', 'Smart Watch Series 5', 299.99, 60, 1),
(9, '2025-10-22 21:12:01.000000', 'Energy efficient refrigerator with smart cooling', '2025-10-22 21:12:01.000000', 'fridge.jpg', 'Smart Refrigerator', 899.99, 15, 2),
(10, '2025-10-22 21:12:01.000000', 'Front load washing machine with steam function', '2025-10-22 21:12:01.000000', 'washer.jpg', 'Washing Machine Pro', 649.99, 20, 2),
(11, '2025-10-22 21:12:01.000000', '55-inch 4K Smart TV with HDR', '2025-10-22 21:12:01.000000', 'tv.jpg', '4K Smart Television', 599.99, 30, 2),
(12, '2025-10-22 21:12:01.000000', 'Robot vacuum with laser navigation', '2025-10-22 21:12:01.000000', 'vacuum.jpg', 'Robot Vacuum Cleaner', 349.99, 45, 2),
(13, '2025-10-22 21:12:01.000000', 'Air purifier with HEPA filter for large rooms', '2025-10-22 21:12:01.000000', 'airpurifier.jpg', 'HEPA Air Purifier', 199.99, 35, 2),
(14, '2025-10-22 21:12:14.000000', 'Genuine leather crossbody bag for women', '2025-10-22 21:12:14.000000', 'handbag.jpg', 'Leather Handbag', 129.99, 80, 7),
(15, '2025-10-22 21:12:14.000000', 'Premium wireless earbuds with charging case', '2025-10-22 21:12:14.000000', 'earbuds.jpg', 'Wireless Earbuds', 79.99, 120, 7),
(16, '2025-10-22 21:12:14.000000', 'Stainless steel smart fitness tracker', '2025-10-22 21:12:14.000000', 'fitnesstracker.jpg', 'Fitness Tracker', 89.99, 95, 7),
(17, '2025-10-22 21:12:14.000000', 'Designer sunglasses with UV protection', '2025-10-22 21:12:14.000000', 'sunglasses.jpg', 'Polarized Sunglasses', 149.99, 65, 7);

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE `suppliers` (
  `id` bigint NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `date_created` datetime(6) NOT NULL,
  `email` varchar(255) NOT NULL,
  `last_updated` datetime(6) NOT NULL,
  `logo_url` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `suppliers`
--

INSERT INTO `suppliers` (`id`, `address`, `date_created`, `email`, `last_updated`, `logo_url`, `name`, `phone`) VALUES
(1, '123 Street', '2025-01-20 20:11:44.000000', 'supplier@example.com', '2025-10-19 20:29:03.768520', 'http://localhost:8080/uploads/2FKIQOV1GWNTAAWX1Y_samsung.jpg', 'Supplier A', '123456789'),
(2, '123 Street', '2025-01-20 20:12:33.000000', 'supplier@example.com', '2025-10-19 20:29:16.653059', 'http://localhost:8080/uploads/K8M85V4I2YUXV3LR8R_LOGO-MENU.png', 'Supplier A', '123456789'),
(7, 'Box Office n°83 - Post office of chorfa - 2243\nCITE AFH-1 near CNAM and Post Office of Chorfa', '2025-10-19 20:30:15.038226', 'abbassizied@outlook.fr', '2025-10-19 20:30:15.038226', 'http://localhost:8080/uploads/QSR6KEA6UG37XP6OU1_toyota-logo.png', 'Zied Abbassi', '23249952');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKghwsjbjo7mg3iufxruvq6iu3q` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK6i174ixi9087gcvvut45em7fd` (`supplier_id`);

--
-- Indexes for table `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `FKghwsjbjo7mg3iufxruvq6iu3q` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `FK6i174ixi9087gcvvut45em7fd` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
