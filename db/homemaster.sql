-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-11-2024 a las 12:23:33
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
-- Estructura de tabla para la tabla `color`
--

CREATE TABLE `color` (
  `id_color` int(11) NOT NULL,
  `descripcion` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `color`
--

INSERT INTO `color` (`id_color`, `descripcion`) VALUES
(1, 'Rojo'),
(2, 'Blanco');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventario`
--

CREATE TABLE `inventario` (
  `id_inventario` int(11) NOT NULL,
  `stock` int(11) DEFAULT NULL,
  `ubicacion_almacen` varchar(50) DEFAULT NULL,
  `precio` int(11) DEFAULT NULL,
  `fecha_ingreso` date DEFAULT NULL,
  `id_moda` int(11) DEFAULT NULL,
  `id_proveedor` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `inventario`
--

INSERT INTO `inventario` (`id_inventario`, `stock`, `ubicacion_almacen`, `precio`, `fecha_ingreso`, `id_moda`, `id_proveedor`) VALUES
(1, 50, 'Despacho', 250, '2024-11-06', 5, 2),
(2, 15, 'Almacen', 190, '2024-11-09', 3, 2);

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
  `id_temporada` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `moda`
--

INSERT INTO `moda` (`id_moda`, `nombre_producto`, `descripcion`, `categoria`, `genero`, `marca`, `id_material`, `id_color`, `id_temporada`) VALUES
(3, 'ropaNueva', 'asd', 'aa', 'masculino', 'adidas', 2, 2, 2),
(4, 'Prueba', 'Prueba', 'Ropa', 'masculino', 'adidas', 1, 1, 1),
(5, 'Remerones', 'adadasd', 'asdasd', 'Masculino', 'Nike', 1, 1, 2),
(6, 'Remerones', 'adadasd', 'asdasd', 'Masculino', 'Nike', 1, 1, 2),
(7, 'Prueba', 'Prueba', 'Ropa', 'masculino', 'adidas', 1, 1, 1),
(8, 'Prueba Modificada', 'Prueba Modi', 'Ropa', 'masculino', 'Adidas', 1, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedor`
--

CREATE TABLE `proveedor` (
  `id_proveedor` int(11) NOT NULL,
  `nombre_empresa` varchar(50) NOT NULL,
  `telefono` int(11) NOT NULL,
  `email` varchar(30) NOT NULL,
  `direccion` varchar(30) NOT NULL,
  `ciudad` varchar(20) NOT NULL,
  `codigo_postal` int(11) NOT NULL,
  `pais` varchar(20) NOT NULL,
  `fecha_registro` date NOT NULL,
  `estado` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `proveedor`
--

INSERT INTO `proveedor` (`id_proveedor`, `nombre_empresa`, `telefono`, `email`, `direccion`, `ciudad`, `codigo_postal`, `pais`, `fecha_registro`, `estado`) VALUES
(1, 'Netqual S.R.L', 1111235612, 'netqual@gmail.com.ar', 'Fulanito 1234', 'Buenos Aires', 1826, 'Argentina', '2024-10-17', 1),
(2, 'Nike S.R.L', 231564632, 'nike@gmail.com.ar', 'Balcarce 3749', 'San nicolas', 1827, 'Argentina', '2024-10-17', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id_rol` int(11) NOT NULL,
  `descripcion` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id_rol`, `descripcion`) VALUES
(1, 'Administrador'),
(2, 'Usuario');

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `password` varchar(70) NOT NULL,
  `imagen` varchar(250) NOT NULL,
  `id_rol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre`, `mail`, `password`, `imagen`, `id_rol`) VALUES
(1, 'Modificado', 'prueba@gmail.com', '$2a$10$8CqstItdJTczWl5y5d', '1730771297019.jpeg', 2),
(2, 'Leonel', 'leo92@gmail.com', '$2a$08$zZNiT2OkA7XtTJx77D', '', 2),
(3, 'Leonel Girett', 'leoo5@gmail.com', '123456', '1730768383691.jpeg', 2),
(4, 'Leonel', 'leo5@gmail.com', '$2a$10$orY6zbscQjTTfqms2p', '1730773352695.jpeg', 1),
(5, 'belen', 'belen@gmail.com', '$2a$10$GU3wBskzF640oD1yy7', '1730774103677.jpeg', 2),
(6, 'Leo', 'belen1@gmail.com', '$2a$10$7fCo4O5uHgMQuWU6q2', '', 2),
(7, 'leito', 'leito@gmail.com', '$2a$10$Yn48CRnNNSyUhppPsn', '1730819993595.jpeg', 2),
(8, 'prueba', 'prueba22@gmail.com', '$2a$08$Si9YXjxCDpubgKT9G8', '1730829018206.jpeg', 2),
(9, 'Puedo', 'puedo@gmail.com', '$2a$08$ejCr2P9VQdj.vl5ECw', '', 2),
(10, 'ultima', 'ultima@gmail.com', '$2a$08$bMbf1/Kc6qMW3BUhsD', '1730838083335.jpeg', 2),
(11, 'Mauricio Leonel', 'mau@gmail.com', '$2a$08$pMiwENDtTOm5mU1.djWnBeieRvqS0u397r.PTOmIOBEN.8jlML8xi', '1730937577842.jpeg', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `color`
--
ALTER TABLE `color`
  ADD PRIMARY KEY (`id_color`);

--
-- Indices de la tabla `inventario`
--
ALTER TABLE `inventario`
  ADD PRIMARY KEY (`id_inventario`),
  ADD KEY `fk_inventario_moda` (`id_moda`),
  ADD KEY `fk_inventario` (`id_proveedor`);

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
  ADD KEY `fk_moda_material` (`id_material`),
  ADD KEY `fk_moda_color` (`id_color`);

--
-- Indices de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  ADD PRIMARY KEY (`id_proveedor`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `temporada`
--
ALTER TABLE `temporada`
  ADD PRIMARY KEY (`id_temporada`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `fk_usuario_rol` (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `color`
--
ALTER TABLE `color`
  MODIFY `id_color` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `inventario`
--
ALTER TABLE `inventario`
  MODIFY `id_inventario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `material`
--
ALTER TABLE `material`
  MODIFY `id_material` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `moda`
--
ALTER TABLE `moda`
  MODIFY `id_moda` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  MODIFY `id_proveedor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `temporada`
--
ALTER TABLE `temporada`
  MODIFY `id_temporada` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `inventario`
--
ALTER TABLE `inventario`
  ADD CONSTRAINT `fk_inventario` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedor` (`id_proveedor`),
  ADD CONSTRAINT `fk_inventario_moda` FOREIGN KEY (`id_moda`) REFERENCES `moda` (`id_moda`);

--
-- Filtros para la tabla `moda`
--
ALTER TABLE `moda`
  ADD CONSTRAINT `fk_moda_color` FOREIGN KEY (`id_color`) REFERENCES `color` (`id_color`),
  ADD CONSTRAINT `fk_moda_material` FOREIGN KEY (`id_material`) REFERENCES `material` (`id_material`),
  ADD CONSTRAINT `fk_moda_temporada` FOREIGN KEY (`id_temporada`) REFERENCES `temporada` (`id_temporada`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `fk_usuario_rol` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
