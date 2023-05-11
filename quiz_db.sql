-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 11, 2023 at 05:25 PM
-- Server version: 8.0.27
-- PHP Version: 8.1.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quiz_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
CREATE TABLE IF NOT EXISTS `questions` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `quiz_ID` int NOT NULL,
  `question` varchar(100) NOT NULL,
  `question_num` int NOT NULL,
  `description` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `choice` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `correct_answer` int NOT NULL,
  `last` tinyint(1) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `quiz_ID` (`quiz_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`ID`, `quiz_ID`, `question`, `question_num`, `description`, `choice`, `correct_answer`, `last`) VALUES
(1, 4, 'Den är fråga', 1, '[value-4]', 'choice1;choice2;choice3;choice4;choice5;', 4, 0);

-- --------------------------------------------------------

--
-- Table structure for table `quiz`
--

DROP TABLE IF EXISTS `quiz`;
CREATE TABLE IF NOT EXISTS `quiz` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `title` varchar(30) NOT NULL,
  `disabled` tinyint(1) NOT NULL,
  `amount_done` int NOT NULL,
  `description` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_ID` int NOT NULL,
  `image` text NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `user_ID` (`user_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `quiz`
--

INSERT INTO `quiz` (`ID`, `title`, `disabled`, `amount_done`, `description`, `user_ID`, `image`) VALUES
(4, 'Books', 0, 2, '[value-4]', 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Alice_in_Wonderland_by_Arthur_Rackham_-_05_-_Advice_from_a_Caterpillar.jpg/640px-Alice_in_Wonderland_by_Arthur_Rackham_-_05_-_Advice_from_a_Caterpillar.jpg'),
(6, 'Movies', 0, 0, '[value-4]', 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Casco_de_Rohirrim.jpg/640px-Casco_de_Rohirrim.jpg'),
(8, 'Games', 0, 0, '[value-5]', 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Game%2C_cards_%28AM_1999.143.34-2%29.jpg/640px-Game%2C_cards_%28AM_1999.143.34-2%29.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `disabled` tinyint(1) NOT NULL,
  `username` varchar(30) NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `creation` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `points` int NOT NULL,
  `type` varchar(5) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'user',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `username_2` (`username`),
  KEY `username_index` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`ID`, `disabled`, `username`, `email`, `password`, `creation`, `points`, `type`) VALUES
(1, 0, 'test', 'test@test.test', '$2b$10$E9LY/KPkTHl3NzRecmLwWeWA6XwgoH7eVUCKz0mp6f0bTCUEm9XRC', '2023-05-01 20:12:44', 5, 'admin'),
(13, 0, 'test1', 'hello', '$2b$10$0RXCxjRTh1Yarw1rinVKxe.xjPm/iThtrZQONgPXMN7bPMLIf3owO', '2023-05-08 02:23:43', 0, 'user'),
(16, 0, 'test12', 'hello@welcome.com', '$2b$10$FOfpeI74AS7d0adumGt88eVkYSwhq8EeJKcQSyrYdXLYBGxvv8ADm', '2023-05-08 02:24:17', 0, 'user'),
(17, 0, 'test11', 'cool@cool.com', '$2b$10$WOetXR714j1I2aEoSMX89O8QKOfcKINsFZiKQ953rVdc9v3wUGlpG', '2023-05-08 02:27:55', 0, 'user'),
(18, 0, 'test23', 'cool@cool.com', '$2b$10$m2iYKrnYPGuATQqZJDq2LOZixLT7LUOVa1Ys7NaX6wpELy9JrSE.W', '2023-05-08 03:47:09', 0, 'user'),
(19, 0, 'user1234', 'user@user.user', '$2b$10$oIj8lpzUxazFGccrt9cpNeulYI1Vi/9b8AgYT6NsR4BOsWXn.nhq.', '2023-05-11 13:30:46', 0, 'user'),
(20, 0, 'test100', 'test100@gmail.com', '$2b$10$xPr6cE7cgWupjz5/EA3WZ.n2s3kb45yjiJEzKZx8SFESUUc3n7ESe', '2023-05-11 13:42:51', 0, 'user'),
(21, 0, 'test101', 'test101@gmail.com', '$2b$10$msy423r2itiz9i46nhHrbus0RQF95sqfTnvTT6yniZJWs5NUJdaNa', '2023-05-11 13:46:34', 0, 'user'),
(23, 0, 'test102', 'test102@gmail.com', '$2b$10$bQUXjd3IpHNf27bHM6AWGuERKWkQ117czvEz7mWqIm6c/zvAOEIF.', '2023-05-11 13:47:53', 0, 'user');

-- --------------------------------------------------------

--
-- Table structure for table `validate`
--

DROP TABLE IF EXISTS `validate`;
CREATE TABLE IF NOT EXISTS `validate` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ip` varchar(50) NOT NULL,
  `admin` varchar(30) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `validate`
--

INSERT INTO `validate` (`ID`, `ip`, `admin`) VALUES
(1, '212.17.162.161', 'Daniel');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`quiz_ID`) REFERENCES `quiz` (`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `quiz`
--
ALTER TABLE `quiz`
  ADD CONSTRAINT `quiz_ibfk_1` FOREIGN KEY (`user_ID`) REFERENCES `user` (`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
