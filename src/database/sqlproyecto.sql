-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-01-2024 a las 06:01:41
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
-- Base de datos: `sqlproyecto`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actividades`
--

CREATE TABLE `actividades` (
  `id_actividad` int(11) NOT NULL,
  `nombre_actividad` varchar(255) DEFAULT NULL,
  `dia` varchar(30) DEFAULT NULL,
  `estado_actividad` enum('asignada','terminada') DEFAULT 'asignada',
  `lugar_actividad` int(11) DEFAULT NULL,
  `fecha_actividad` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `actividades`
--

INSERT INTO `actividades` (`id_actividad`, `nombre_actividad`, `dia`, `estado_actividad`, `lugar_actividad`, `fecha_actividad`) VALUES
(24, 'Actividad tres', NULL, 'terminada', 1, '2023-12-31 00:00:00'),
(25, 'Actividad cuatro', NULL, 'asignada', 1, '2023-12-31 00:00:00'),
(26, 'Actividad cinco', NULL, 'asignada', 1, '2023-12-31 00:00:00'),
(27, 'Actividad cinco', NULL, 'terminada', 1, '2023-12-31 00:00:00'),
(30, 'Actividad seis', NULL, 'asignada', 1, '2023-12-31 00:00:00'),
(31, 'Actividad seis', NULL, 'terminada', 1, '2023-12-31 00:00:00'),
(32, 'Actividad seis', NULL, 'asignada', 1, '2023-12-31 00:00:00'),
(33, 'Actividad seis', NULL, 'terminada', 1, '2023-12-31 00:00:00'),
(36, 'Actividad last two', NULL, 'terminada', 1, '2023-12-31 05:00:00'),
(37, 'hoy 22', NULL, 'terminada', 1, '2023-12-31 00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `almacenamiento`
--

CREATE TABLE `almacenamiento` (
  `id_almacenamiento` int(11) NOT NULL,
  `nombre_alm` varchar(255) DEFAULT NULL,
  `tope_alm` int(11) DEFAULT NULL,
  `cantidad_alm` int(11) DEFAULT NULL,
  `stock_alm` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `almacenamiento`
--

INSERT INTO `almacenamiento` (`id_almacenamiento`, `nombre_alm`, `tope_alm`, `cantidad_alm`, `stock_alm`) VALUES
(1, 'bodega 1', 2000, NULL, 0),
(2, 'bodega 2', 500, 2, -2),
(3, 'bodega 3', 800, NULL, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `elementos`
--

CREATE TABLE `elementos` (
  `id_elemento` int(11) NOT NULL,
  `nombre_elm` varchar(255) DEFAULT NULL,
  `tipo_elm` varchar(255) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `elementos`
--

INSERT INTO `elementos` (`id_elemento`, `nombre_elm`, `tipo_elm`, `cantidad`) VALUES
(2, 'Escoba', 'herramienta', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `elementos_actividades`
--

CREATE TABLE `elementos_actividades` (
  `id_elm_act` int(11) NOT NULL,
  `fk_elemento` int(11) NOT NULL,
  `fk_actividad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lugares`
--

CREATE TABLE `lugares` (
  `id_lugar` int(11) NOT NULL,
  `nombre_lugar` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `lugares`
--

INSERT INTO `lugares` (`id_lugar`, `nombre_lugar`) VALUES
(1, 'ENNCC'),
(2, 'ComplejoDeportivo'),
(3, 'Gastronomia'),
(4, 'Agroindustria'),
(5, 'Laboratorios'),
(6, 'Sennova'),
(7, 'AreasComunes'),
(8, 'Enfermeria'),
(9, 'Tics');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movimientos`
--

CREATE TABLE `movimientos` (
  `id_movimiento` int(11) NOT NULL,
  `tipo_movimiento` enum('entrada','salida') DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `fecha` datetime DEFAULT current_timestamp(),
  `usuario_adm` varchar(50) DEFAULT NULL,
  `fk_residuo` int(11) DEFAULT NULL,
  `fk_elemento` int(11) DEFAULT NULL,
  `fk_actividad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `movimientos`
--

INSERT INTO `movimientos` (`id_movimiento`, `tipo_movimiento`, `cantidad`, `fecha`, `usuario_adm`, `fk_residuo`, `fk_elemento`, `fk_actividad`) VALUES
(7, 'entrada', 90, '2023-12-09 09:28:31', NULL, 7, NULL, 24),
(8, 'salida', 10, '2023-12-09 09:47:23', NULL, 7, NULL, NULL),
(9, 'entrada', 12, '2023-12-09 13:50:47', NULL, 8, NULL, 24),
(10, 'entrada', 29, '2023-12-09 13:52:29', NULL, 9, NULL, 24),
(13, 'salida', 0, '2023-12-09 20:05:31', NULL, 1, NULL, NULL),
(14, 'salida', 0, '2023-12-09 20:05:44', NULL, 1, NULL, NULL),
(15, 'salida', 0, '2023-12-09 20:06:41', NULL, 1, NULL, NULL),
(16, 'salida', 11, '2023-12-09 20:11:12', NULL, 1, NULL, 36),
(17, 'entrada', 444, '2023-12-11 22:04:36', NULL, 10, NULL, 33),
(18, 'entrada', 12, '2023-12-11 22:38:33', NULL, 11, NULL, 36),
(19, 'entrada', 333333, '2023-12-13 07:26:23', NULL, 12, NULL, 36),
(20, 'salida', 1001, '2023-12-13 07:40:18', NULL, 2, NULL, NULL),
(21, 'entrada', 100, '2023-12-13 09:46:15', NULL, 13, NULL, 32),
(22, 'salida', 10, '2023-12-13 09:53:40', NULL, 13, NULL, NULL),
(23, 'entrada', 1, '2024-01-26 23:48:10', '1', 1, NULL, 24),
(24, 'entrada', 1, '2024-01-26 23:50:59', '1', 1, NULL, 24),
(25, 'entrada', 1, '2024-01-26 23:51:09', '1', 1, NULL, 24),
(26, 'entrada', 1, '2024-01-26 23:52:12', '1', 1, NULL, 24),
(27, 'entrada', 1, '2024-01-26 23:53:49', '1', 1, NULL, 24),
(28, 'entrada', 1, '2024-01-26 23:54:03', '1', 1, NULL, 24),
(29, 'entrada', 1, '2024-01-26 23:55:15', '1', 1, NULL, 24),
(30, 'entrada', 1, '2024-01-26 23:55:32', '1', 1, NULL, 24),
(31, 'entrada', 1, '2024-01-26 23:56:30', '1', 1, NULL, 24),
(32, 'entrada', 1, '2024-01-26 23:58:22', '1', 1, NULL, 24),
(33, 'entrada', 1, '2024-01-26 23:58:39', '1', 1, NULL, 24),
(34, 'entrada', 1, '2024-01-26 23:59:11', '1', 1, NULL, 24),
(35, 'entrada', 1, '2024-01-27 00:00:39', '1', 20, NULL, 24);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `residuos`
--

CREATE TABLE `residuos` (
  `id_residuo` int(11) NOT NULL,
  `nombre_residuo` varchar(50) DEFAULT NULL,
  `tipo_residuo` int(11) DEFAULT NULL,
  `cantidad` int(11) NOT NULL,
  `unidad_medida` varchar(255) DEFAULT NULL,
  `fk_alm` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `residuos`
--

INSERT INTO `residuos` (`id_residuo`, `nombre_residuo`, `tipo_residuo`, `cantidad`, `unidad_medida`, `fk_alm`) VALUES
(1, 'carton1', 1, 105, 'kg', 1),
(2, 'carton 1', 2, 200, 'kg', 1),
(3, 'carton', 1, 200, 'kg', 1),
(4, 'carton', 1, 200, 'kg', 1),
(5, 'latas', 1, 19, 'kg', 1),
(6, 'latas', 4, 90, 'kg', 1),
(7, 'latas act', 2, 40, 'kg', 1),
(8, 'Aluminio', 3, 1300, 'kg', 1),
(9, 'Aluminio 2', 4, 300, 'kg', 1),
(10, 'latas act111', 2, 50, 'kg', 1),
(11, 'otros', 5, 12, 'ml', 1),
(12, 'prueba w', 1, 3333331, 'ml', 1),
(13, 'resiudo_prueba_act', 2, 90, 'kg', 1),
(14, 'minu', 1, 23, 'ml', 1),
(15, 'acs', 3, 23, 'ml', 2),
(16, 'acs444', 3, 69, 'ml', 2),
(17, 'millerprueba', 4, 12, 'ml', 2),
(18, 'aaaaaaa', 3, 23, 'kg', 1),
(19, 'MMM', 2, 1, 'kg', 2),
(20, 'carton56', 2, 1, 'kg', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipos`
--

CREATE TABLE `tipos` (
  `id_tipo` int(11) NOT NULL,
  `tipo_residuo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipos`
--

INSERT INTO `tipos` (`id_tipo`, `tipo_residuo`) VALUES
(1, 'aprovechables'),
(2, 'no_aprovechables'),
(3, 'quimicos'),
(4, 'Infecciosos'),
(5, 'otros');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `apellidos` varchar(50) DEFAULT NULL,
  `identificacion` varchar(15) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `rol` enum('administrador','pasante','invitado') DEFAULT 'invitado',
  `estado` enum('activo','inactivo') DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre`, `apellidos`, `identificacion`, `email`, `password`, `rol`, `estado`) VALUES
(1, 'miller', 'rivera', '1007750963', 'miller@gmail.com', '123', 'administrador', 'activo'),
(2, 'efren', 'bermeo', '987654321', 'efren@gmail.com', '321', 'administrador', 'activo'),
(3, 'frand', 'jhon', '455221', 'frand@gmail.com', '123', 'pasante', 'activo'),
(4, 'juan', 'cifuentes', '2211411', 'juan@gmail.com', '123', 'pasante', 'activo'),
(5, 'm', 'r', '33', 'prueba@gmail.com', '12345', 'pasante', 'activo'),
(6, 'usuario de prueba 2', 'rrrr', '33', 'prueba@gmail.com', '12345', 'pasante', ''),
(7, 'Juan', 'Perez', '123456789', 'juan.perez@example.com', 'contraseña1', 'pasante', 'activo'),
(8, 'María', 'Gómez', '987654321', 'maria.gomez@example.com', 'contraseña2', 'pasante', 'activo'),
(9, 'Carlos', 'Rodríguez', '456789123', 'carlos.rodriguez@example.com', 'contraseña3', 'pasante', 'activo'),
(10, 'Ana', 'Martínez', '789123456', 'ana.martinez@example.com', 'contraseña4', 'pasante', 'activo'),
(11, 'Pedro', 'López', '321654987', 'pedro.lopez@example.com', 'contraseña5', 'pasante', 'activo'),
(12, 'Laura', 'Sánchez', '654987321', 'laura.sanchez@example.com', 'contraseña6', 'pasante', 'activo'),
(13, 'Miguel', 'Fernández', '987321654', 'miguel.fernandez@example.com', 'contraseña7', 'pasante', 'activo'),
(14, 'Sofía', 'Díaz', '159263478', 'sofia.diaz@example.com', 'contraseña8', 'pasante', 'activo'),
(15, 'Jorge', 'Ruiz', '357159264', 'jorge.ruiz@example.com', 'contraseña9', 'pasante', 'activo'),
(16, 'Ana', 'García', '852963741', 'ana.garcia@example.com', 'contraseña10', 'pasante', 'activo'),
(17, 'David', 'Hernández', '741852963', 'david.hernandez@example.com', 'contraseña11', 'pasante', 'activo'),
(18, 'Elena', 'Jiménez', '369258147', 'elena.jimenez@example.com', 'contraseña12', 'pasante', 'activo'),
(19, 'Diego', 'Gutiérrez', '147258369', 'diego.gutierrez@example.com', 'contraseña13', 'pasante', 'activo'),
(20, 'Martina', 'Alvarez', '258369147', 'martina.alvarez@example.com', 'contraseña14', 'pasante', 'activo'),
(21, 'Luis', 'Romero', '369147258', 'luis.romero@example.com', 'contraseña15', 'pasante', 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios_actividades`
--

CREATE TABLE `usuarios_actividades` (
  `id_relacion` int(11) NOT NULL,
  `fk_usuario` int(11) NOT NULL,
  `fk_actividad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios_actividades`
--

INSERT INTO `usuarios_actividades` (`id_relacion`, `fk_usuario`, `fk_actividad`) VALUES
(45, 2, 24),
(46, 3, 24),
(48, 2, 25),
(49, 3, 25),
(51, 1, 26),
(53, 3, 26),
(55, 2, 27),
(56, 3, 27),
(64, 2, 30),
(65, 3, 30),
(67, 2, 31),
(70, 1, 32),
(71, 2, 32),
(77, 4, 33),
(86, 1, 36),
(87, 2, 36),
(88, 3, 36),
(89, 4, 36),
(90, 1, 37),
(91, 2, 37),
(92, 3, 37),
(93, 4, 37),
(94, 5, 37);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `actividades`
--
ALTER TABLE `actividades`
  ADD PRIMARY KEY (`id_actividad`),
  ADD KEY `lugar_actividad` (`lugar_actividad`);

--
-- Indices de la tabla `almacenamiento`
--
ALTER TABLE `almacenamiento`
  ADD PRIMARY KEY (`id_almacenamiento`);

--
-- Indices de la tabla `elementos`
--
ALTER TABLE `elementos`
  ADD PRIMARY KEY (`id_elemento`);

--
-- Indices de la tabla `elementos_actividades`
--
ALTER TABLE `elementos_actividades`
  ADD PRIMARY KEY (`id_elm_act`),
  ADD KEY `fk_elemento` (`fk_elemento`),
  ADD KEY `fk_actividad` (`fk_actividad`);

--
-- Indices de la tabla `lugares`
--
ALTER TABLE `lugares`
  ADD PRIMARY KEY (`id_lugar`);

--
-- Indices de la tabla `movimientos`
--
ALTER TABLE `movimientos`
  ADD PRIMARY KEY (`id_movimiento`),
  ADD KEY `fk_residuo` (`fk_residuo`),
  ADD KEY `fk_elemento` (`fk_elemento`),
  ADD KEY `fk_actividad` (`fk_actividad`);

--
-- Indices de la tabla `residuos`
--
ALTER TABLE `residuos`
  ADD PRIMARY KEY (`id_residuo`),
  ADD KEY `fk_alm` (`fk_alm`),
  ADD KEY `tipo_residuo` (`tipo_residuo`);

--
-- Indices de la tabla `tipos`
--
ALTER TABLE `tipos`
  ADD PRIMARY KEY (`id_tipo`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- Indices de la tabla `usuarios_actividades`
--
ALTER TABLE `usuarios_actividades`
  ADD PRIMARY KEY (`id_relacion`),
  ADD KEY `fk_usuario` (`fk_usuario`),
  ADD KEY `fk_actividad` (`fk_actividad`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `actividades`
--
ALTER TABLE `actividades`
  MODIFY `id_actividad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de la tabla `almacenamiento`
--
ALTER TABLE `almacenamiento`
  MODIFY `id_almacenamiento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `elementos`
--
ALTER TABLE `elementos`
  MODIFY `id_elemento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `elementos_actividades`
--
ALTER TABLE `elementos_actividades`
  MODIFY `id_elm_act` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `lugares`
--
ALTER TABLE `lugares`
  MODIFY `id_lugar` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `movimientos`
--
ALTER TABLE `movimientos`
  MODIFY `id_movimiento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de la tabla `residuos`
--
ALTER TABLE `residuos`
  MODIFY `id_residuo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `tipos`
--
ALTER TABLE `tipos`
  MODIFY `id_tipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `usuarios_actividades`
--
ALTER TABLE `usuarios_actividades`
  MODIFY `id_relacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `actividades`
--
ALTER TABLE `actividades`
  ADD CONSTRAINT `actividades_ibfk_2` FOREIGN KEY (`lugar_actividad`) REFERENCES `lugares` (`id_lugar`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `elementos_actividades`
--
ALTER TABLE `elementos_actividades`
  ADD CONSTRAINT `elementos_actividades_ibfk_1` FOREIGN KEY (`fk_actividad`) REFERENCES `actividades` (`id_actividad`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `realiza` FOREIGN KEY (`fk_elemento`) REFERENCES `elementos` (`id_elemento`);

--
-- Filtros para la tabla `movimientos`
--
ALTER TABLE `movimientos`
  ADD CONSTRAINT `movimientos_ibfk_1` FOREIGN KEY (`fk_residuo`) REFERENCES `residuos` (`id_residuo`),
  ADD CONSTRAINT `movimientos_ibfk_3` FOREIGN KEY (`fk_actividad`) REFERENCES `actividades` (`id_actividad`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `residuos`
--
ALTER TABLE `residuos`
  ADD CONSTRAINT `residuos_ibfk_1` FOREIGN KEY (`fk_alm`) REFERENCES `almacenamiento` (`id_almacenamiento`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `residuos_ibfk_2` FOREIGN KEY (`tipo_residuo`) REFERENCES `tipos` (`id_tipo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios_actividades`
--
ALTER TABLE `usuarios_actividades`
  ADD CONSTRAINT `usuarios_actividades_ibfk_1` FOREIGN KEY (`fk_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usuarios_actividades_ibfk_2` FOREIGN KEY (`fk_actividad`) REFERENCES `actividades` (`id_actividad`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
