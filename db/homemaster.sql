-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-10-2024 a las 02:20:12
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `homemaster`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `moda`
--

CREATE TABLE `moda` (
  `id_moda` int(11) NOT NULL,
  `nombre_producto` varchar(150) DEFAULT NULL,
  `descripcion` varchar(150) DEFAULT NULL,
  `categoria` varchar(100) NOT NULL,
  `genero` varchar(10) NOT NULL,
  `marca` varchar(100) NOT NULL,
  `id_material` int(11) NOT NULL,
  `id_color` int(11) NOT NULL,
  `id_inventario` int(11) NOT NULL,
  `id_proveedor` int(11) NOT NULL,
  `id_temporada` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `moda`
--

INSERT INTO `moda` (`id_moda`, `nombre_producto`, `descripcion`, `categoria`, `genero`, `marca`, `id_material`, `id_color`, `id_inventario`, `id_proveedor`, `id_temporada`) VALUES
(2, 'ropa', 'asd', 'aa', 'masculino', 'adidas', 2, 2, 2, 2, 2),
(3, 'ropaNueva', 'asd', 'aa', 'masculino', 'adidas', 2, 2, 2, 2, 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `moda`
--
ALTER TABLE `moda`
  ADD PRIMARY KEY (`id_moda`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `moda`
--
ALTER TABLE `moda`
  MODIFY `id_moda` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
