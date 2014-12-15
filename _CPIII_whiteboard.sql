-- phpMyAdmin SQL Dump
-- version 4.0.6
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 15, 2014 at 05:46 PM
-- Server version: 5.5.33
-- PHP Version: 5.5.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `CPIII_whiteboard`
--

-- --------------------------------------------------------

--
-- Table structure for table `boards`
--

CREATE TABLE `boards` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `user_id` int(12) NOT NULL,
  `creation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=16 ;

--
-- Dumping data for table `boards`
--

INSERT INTO `boards` (`id`, `user_id`, `creation_date`, `name`) VALUES
(1, 2, '2014-12-15 16:09:53', 'eerste board'),
(3, 2, '2014-12-15 16:10:46', 'major plannen'),
(4, 2, '2014-12-15 16:10:55', 'groepswerk'),
(5, 2, '2014-12-15 16:11:03', 'rmd opdracht'),
(6, 2, '2014-12-15 16:11:14', 'todo kerst'),
(7, 2, '2014-12-15 16:17:23', 'tweede board'),
(8, 2, '2014-12-15 16:17:29', 'derde board'),
(9, 2, '2014-12-15 16:17:33', 'vierde board'),
(10, 2, '2014-12-15 16:17:39', 'vijfde board'),
(11, 2, '2014-12-15 16:18:00', 'zesde board '),
(12, 1, '2014-12-15 16:18:32', 'cp3 board'),
(14, 1, '2014-12-15 16:18:54', 'inspiratie'),
(15, 1, '2014-12-15 16:19:21', 'brainstorm');

-- --------------------------------------------------------

--
-- Table structure for table `invites`
--

CREATE TABLE `invites` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `user_idsender` int(12) NOT NULL,
  `creation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `board_id` int(12) NOT NULL,
  `user_idreceiver` int(12) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=3 ;

--
-- Dumping data for table `invites`
--

INSERT INTO `invites` (`id`, `user_idsender`, `creation_date`, `board_id`, `user_idreceiver`) VALUES
(1, 2, '2014-12-15 16:11:43', 4, 1),
(2, 1, '2014-12-15 16:19:28', 15, 2);

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `board_id` int(11) NOT NULL,
  `x` int(5) NOT NULL,
  `y` int(5) NOT NULL,
  `content` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `creation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `origin` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=16 ;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `board_id`, `x`, `y`, `content`, `creation_date`, `origin`) VALUES
(1, 3, 787, 497, 'design afwerken', '2014-12-15 16:12:03', 'postit'),
(3, 3, 823, 540, 'bower testen', '2014-12-15 16:12:17', 'postit'),
(4, 3, 639, 195, 'consult lijst', '2014-12-15 16:12:29', 'postit'),
(5, 3, 676, 239, 'inspiratie zoeken', '2014-12-15 16:12:43', 'postit'),
(6, 3, 709, 285, 'vragen hoe de form validatie moet', '2014-12-15 16:13:15', 'postit'),
(7, 3, 393, 407, '6cca225c898b5d3f7c502dad0e4cd434.jpg', '2014-12-15 16:14:04', 'image'),
(8, 3, 413, 361, 'apple is the best', '2014-12-15 16:14:12', 'postit'),
(9, 3, 1216, 227, '02.mp4', '2014-12-15 16:14:42', 'video'),
(10, 3, 1306, 190, 'ontspanning', '2014-12-15 16:15:21', 'postit'),
(11, 3, 848, 422, 'lightbulb-512.png', '2014-12-15 16:15:50', 'image'),
(12, 15, 676, 394, 'canvas tag mogelijkheden', '2014-12-15 16:19:56', 'postit'),
(14, 4, 400, 200, 'afspreken groepswerk', '2014-12-15 16:20:55', 'postit'),
(15, 4, 461, 277, '6cca225c898b5d3f7c502dad0e4cd434.jpg', '2014-12-15 16:21:00', 'image');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `lastname` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `password` text COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(252) COLLATE utf8_unicode_ci NOT NULL,
  `picture` varchar(252) COLLATE utf8_unicode_ci NOT NULL,
  `extension` varchar(6) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=3 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `lastname`, `username`, `password`, `email`, `picture`, `extension`) VALUES
(1, 'Sander', 'bossuyt', 'sander1995', '$2y$12$j7N5Y9R5Zo2Rer60poaMgO.vOm1b2TJ/svGyuds1L7zonKU1TraV2', 's@gmail.com', '6cca225c898b5d3f7c502dad0e4cd434', 'jpg'),
(2, 'gilles', 'van den ven', 'gilles1993', '$2y$12$uzm4FXDdxEp8nqxMxxgYi.as9PHMp.EiYXSSgpQXHcP2sZgeQV1ay', 'g@gmail.com', '6cca225c898b5d3f7c502dad0e4cd434', 'jpg');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
