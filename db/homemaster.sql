-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-10-2024 a las 03:46:17
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
-- Estructura de tabla para la tabla `material`
--

CREATE TABLE `material` (
  `id_material` int(11) NOT NULL,
  `nombre_material` varchar(100) NOT NULL,
  `descripcion` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `material`
--

INSERT INTO `material` (`id_material`, `nombre_material`, `descripcion`) VALUES
(1, 'Algodón', 'Fibra natural suave, transpirable y absorbente. Ideal para ropa ligera.'),
(2, 'Poliéster', 'Fibra sintética duradera, resistente a arrugas y de secado rápido.'),
(3, 'Lana', 'Material cálido y suave. Ideal para climas fríos, pero puede ser irritante para la piel sensible.'),
(4, 'Seda', 'Fibra natural de lujo, suave y brillante, conocida por su textura suave y apariencia elegante.');

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
(3, 'ropaNueva', 'asd', 'aa', 'masculino', 'adidas', 2, 2, 2, 2, 2),
(4, 'Prueba', 'Prueba', 'Ropa', 'masculino', 'adidas', 1, 1, 1, 1, 1),
(5, 'Remerones', 'adadasd', 'asdasd', 'Masculino', 'Nike', 1, 1, 1, 1, 2),
(6, 'Remerones', 'adadasd', 'asdasd', 'Masculino', 'Nike', 1, 1, 1, 1, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `temporada`
--

CREATE TABLE `temporada` (
  `id_temporada` int(11) NOT NULL,
  `nombre_temporada` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `temporada`
--

INSERT INTO `temporada` (`id_temporada`, `nombre_temporada`) VALUES
(1, 'Verano'),
(2, 'Primavera'),
(3, 'Otoño'),
(4, 'Invierno');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `material`
--
ALTER TABLE `material`
  ADD PRIMARY KEY (`id_material`);

--
-- Indices de la tabla `moda`
--
ALTER TABLE `moda`
  ADD PRIMARY KEY (`id_moda`),
  ADD KEY `fk_moda_temporada` (`id_temporada`),
  ADD KEY `fk_moda_material` (`id_material`);

--
-- Indices de la tabla `temporada`
--
ALTER TABLE `temporada`
  ADD PRIMARY KEY (`id_temporada`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `material`
--
ALTER TABLE `material`
  MODIFY `id_material` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `moda`
--
ALTER TABLE `moda`
  MODIFY `id_moda` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `temporada`
--
ALTER TABLE `temporada`
  MODIFY `id_temporada` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `moda`
--
ALTER TABLE `moda`
  ADD CONSTRAINT `fk_moda_material` FOREIGN KEY (`id_material`) REFERENCES `temporada` (`id_temporada`),
  ADD CONSTRAINT `fk_moda_temporada` FOREIGN KEY (`id_temporada`) REFERENCES `temporada` (`id_temporada`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
