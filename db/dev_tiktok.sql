-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: netjoven.cxrq1u2xzxro.us-east-1.rds.amazonaws.com
-- Tiempo de generación: 30-01-2023 a las 12:55:12
-- Versión del servidor: 5.7.38-log
-- Versión de PHP: 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `dev_tiktok`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lives`
--

CREATE TABLE `lives` (
  `id` int(11) NOT NULL,
  `user` varchar(50) NOT NULL,
  `descp` text NOT NULL,
  `mp4` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transcription`
--

CREATE TABLE `transcription` (
  `id` int(10) NOT NULL,
  `text` text NOT NULL,
  `lives_id` int(10) NOT NULL,
  `created_at` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `lives`
--
ALTER TABLE `lives`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user` (`user`);

--
-- Indices de la tabla `transcription`
--
ALTER TABLE `transcription`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lives` (`lives_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `lives`
--
ALTER TABLE `lives`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `transcription`
--
ALTER TABLE `transcription`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `transcription`
--
ALTER TABLE `transcription`
  ADD CONSTRAINT `lives` FOREIGN KEY (`lives_id`) REFERENCES `lives` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
