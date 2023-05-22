-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 22, 2023 at 04:19 AM
-- Server version: 8.0.31
-- PHP Version: 8.0.26

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
  `image` text NOT NULL,
  `question_num` int NOT NULL,
  `description` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `choice` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `correct_answer` varchar(50) NOT NULL,
  `last` tinyint(1) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `quiz_ID` (`quiz_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`ID`, `quiz_ID`, `question`, `image`, `question_num`, `description`, `choice`, `correct_answer`, `last`) VALUES
(1, 4, 'Den är fråga', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/%D0%9D%D0%B0%D0%B9%D0%BA%D1%80%D0%B0%D1%89%D1%96_%D0%BC%D0%B8%D1%82%D1%96_%D0%B6%D0%B8%D1%82%D1%82%D1%8F.jpg/800px-%D0%9D%D0%B0%D0%B9%D0%BA%D1%80%D0%B0%D1%89%D1%96_%D0%BC%D0%B8%D1%82%D1%96_%D0%B6%D0%B8%D1%82%D1%82%D1%8F.jpg?20200705072301', 1, '[value-4]', 'choice1;choice2;choice3;choice4;choice5;choice1;choice2;choice3;choice4;choice5;choice1;choice2;choice3;choice4;choice5;choice1;choice2;choice3;choice4;choice5;choice1;choice2;choice3;choice4;choice5;choice1;choice2;choice3;choice4;choice5;choice1;choice2;choice3;choice4;choice5;choice1;choice2;choice3;choice4;choice5;choice1;choice2;choice3;choice4;choice5;choice1;choice2;choice3;choice4;choice5;choice1;choice2;choice3;choice4;choice5;choice1;choice2;choice3;choice4;choice5', '2;4', 0),
(2, 4, '[value-3]', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Purple_roller_%28Coracias_naevius_mosambicus%29.jpg/800px-Purple_roller_%28Coracias_naevius_mosambicus%29.jpg', 2, '[value-5]', 'Cool bird; Weird bird; Nice bird', '1', 0),
(3, 6, 'Vad är filmen?', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Muybridge_race_horse_animated.gif/640px-Muybridge_race_horse_animated.gif', 1, '[value-6]', 'A horse; A cow; A lion: A bear', '1', 0),
(4, 4, '[value-3]', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/PuckMagazine16May1906.jpg/500px-PuckMagazine16May1906.jpg', 3, '[value-6]', 'Correct answer; Wrong answer', '1', 1),
(5, 36, 'Test 1 question 1', 'https://wikimediafoundation.org/wp-content/uploads/2020/12/%E0%A6%B0%E0%A6%B9%E0%A6%B8%E0%A7%8D%E0%A6%AF%E0%A7%87_%E0%A6%98%E0%A7%87%E0%A6%B0%E0%A6%BE_%E0%A6%9C%E0%A6%B2%E0%A6%BE%E0%A6%AC%E0%A6%A8.jpg?resize=1024,682', 1, 'Very beautiful place sssssssssssssssssssssssssssssssssssss', 'Beautiful place;Ugly place;Weird place', '1', 0),
(6, 36, 'Test 1 question 3', 'https://wikimediafoundation.org/wp-content/uploads/2020/12/Mulu_Pinnacles.jpg', 3, 'Big beautiful stones', 'Cool stones;Big stones;Beautiful stones;Funny stones;Real stones;Gray stones', '3;6', 1),
(7, 36, 'Test 1 question 2', 'https://wikimediafoundation.org/wp-content/uploads/2020/12/Baby_tufted_gray_langur_Semnopithecus_priam.jpg?resize=1024,682', 2, 'Monkey', 'Gorilla;Chimp;Horse;Monkey', '1;2;4', 0),
(15, 44, 'Who manufactured the first car?', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Benz_Patent_Motorwagen_1.jpg/640px-Benz_Patent_Motorwagen_1.jpg', 1, 'The first vehicle that runs on a gas engine', 'Richard Hort;Peter Fredrich Konholm;Henry Ford;Carl Benz;Étienne Lenoir', '4', 0),
(16, 44, 'What is the largest land vehicle in the world?', 'https://cdn.jdpower.com/What%20Is%20The%20Biggest%20Vehicle%20In%20The%20World.jpg', 3, 'A large vehicle', 'RWE Bagger 288;Iveco Daily;Caterpillar 797B;Prelude FLNG', '1', 0),
(17, 44, 'What is the fastest road legal car in the world?', 'https://assets.rebelmouse.io/media-library/image.jpg?id=30857856&width=1200&height=800&quality=90&coordinates=152%2C0%2C0%2C0', 4, 'Fast and ...', 'Koenigsegg Jesko Absolut;Bugattti Chiron Supper Sport;GT9-R;Hennessey Venom F5', '2', 1),
(18, 44, 'What is the most popular car in the world? ', 'https://www.motorbiscuit.com/wp-content/uploads/2022/01/Row-of-Toyota-cars-at-a-dealership-highlighting-a-story-about-the-most-popular-car-colors-.jpg?w=1024&h=673&strip=all&quality=89', 2, 'Parked cars', 'Ford F Series;Volkswagen Golf;Honda Civic;Toyota Corolla', '4', 0),
(20, 47, 'Question 1', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Generic_Camera_Icon.svg/100px-Generic_Camera_Icon.svg.png', 1, 'The only question. You are being watched ', 'choice 1;choice 2;choice 3', '3', 1),
(21, 48, 'A big question', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/%D0%A1%D1%83%D1%80%D0%BE%D0%BA_%D1%87%D0%B5%D1%80%D0%BD%D0%BE%D1%88%D0%B0%D0%BF%D0%BE%D1%87%D0%BD%D1%8B%D0%B9_%28%D0%BA%D0%B0%D0%BC%D1%87%D0%B0%D1%82%D1%81%D0%BA%D0%B8%D0%B9%29.jpg/300px-%D0%A1%D1%83%D1%80%D0%BE%D0%BA_%D1%87%D0%B5%D1%80%D0%BD%D0%BE%D1%88%D0%B0%D0%BF%D0%BE%D1%87%D0%BD%D1%8B%D0%B9_%28%D0%BA%D0%B0%D0%BC%D1%87%D0%B0%D1%82%D1%81%D0%BA%D0%B8%D0%B9%29.jpg', 1, 'Can you make out the question? ', 'Correct;Wrong;Wrong', '2;3', 1),
(22, 49, 'A cool question', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Golden_hour_at_bekol_savannah.jpg/300px-Golden_hour_at_bekol_savannah.jpg', 1, 'Cool question', '1;2;3', '2', 1);

-- --------------------------------------------------------

--
-- Table structure for table `quiz`
--

DROP TABLE IF EXISTS `quiz`;
CREATE TABLE IF NOT EXISTS `quiz` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `title` varchar(30) NOT NULL,
  `amount_done` int NOT NULL,
  `description` varchar(58) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `user_ID` int NOT NULL,
  `image` text NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `user_ID` (`user_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `quiz`
--

INSERT INTO `quiz` (`ID`, `title`, `amount_done`, `description`, `user_ID`, `image`) VALUES
(4, 'Books', 56, 'A quiz about books', 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Alice_in_Wonderland_by_Arthur_Rackham_-_05_-_Advice_from_a_Caterpillar.jpg/640px-Alice_in_Wonderland_by_Arthur_Rackham_-_05_-_Advice_from_a_Caterpillar.jpg'),
(6, 'Movies', 0, 'A quiz about movies', 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Casco_de_Rohirrim.jpg/640px-Casco_de_Rohirrim.jpg'),
(8, 'Games', 0, 'A quiz about games', 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Game%2C_cards_%28AM_1999.143.34-2%29.jpg/640px-Game%2C_cards_%28AM_1999.143.34-2%29.jpg'),
(36, 'Test 1', 15, 'Cool description', 1, 'https://wikimediafoundation.org/wp-content/uploads/2020/12/Alcedo_atthis_-_Riserve_naturali_e_aree_contigue_della_fascia_fluviale_del_Po.jpg?resize=1024,682'),
(44, 'Cars', 10, 'Quiz about cars', 1, 'https://www.motortrend.com/uploads/2022/03/2022-Honda-Civic-Touring-vs-2022-Hyundai-Elantra-Limited-vs-2022-Kia-Forte-GT-vs-2022-Mazda-Mazda3-Sedan-AWD-Turbo-vs-2022-Nissan-Sentra-SR-vs-2022-Volkswagen-Jetta-SEL-19.jpg'),
(47, 'TEST101 QUIZ', 5, 'A cool quiz test', 21, 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Slow_Life_in_A_Tea_House_01_edited.jpg/500px-Slow_Life_in_A_Tea_House_01_edited.jpg'),
(48, 'TEST101 QUIZ 2', 3, 'A second quiz', 21, 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Cuolm_Sura_1585m._21-09-2022._%28d.j.b%29_03.jpg/300px-Cuolm_Sura_1585m._21-09-2022._%28d.j.b%29_03.jpg'),
(49, 'TEST11 Quiz', 1, 'A cool quiz', 17, 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/14-02-02-straszburg-RalfR-113.jpg/300px-14-02-02-straszburg-RalfR-113.jpg');

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
  `type` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT 'user',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `username_2` (`username`),
  KEY `username_index` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`ID`, `disabled`, `username`, `email`, `password`, `creation`, `points`, `type`) VALUES
(1, 0, 'test', 'test@test.test', '$2b$10$E9LY/KPkTHl3NzRecmLwWeWA6XwgoH7eVUCKz0mp6f0bTCUEm9XRC', '2023-05-01 20:12:44', 718, 'admin'),
(13, 0, 'test1', 'hello', '$2b$10$0RXCxjRTh1Yarw1rinVKxe.xjPm/iThtrZQONgPXMN7bPMLIf3owO', '2023-05-08 02:23:43', 3, 'user'),
(16, 0, 'test12', 'hello@welcome.com', '$2b$10$FOfpeI74AS7d0adumGt88eVkYSwhq8EeJKcQSyrYdXLYBGxvv8ADm', '2023-05-08 02:24:17', 0, 'user'),
(17, 0, 'test11', 'cool@cool.com', '$2b$10$WOetXR714j1I2aEoSMX89O8QKOfcKINsFZiKQ953rVdc9v3wUGlpG', '2023-05-08 02:27:55', 342, 'user'),
(18, 0, 'test23', 'cool@cool.com', '$2b$10$m2iYKrnYPGuATQqZJDq2LOZixLT7LUOVa1Ys7NaX6wpELy9JrSE.W', '2023-05-08 03:47:09', 0, 'user'),
(19, 0, 'user1234', 'user@user.user', '$2b$10$oIj8lpzUxazFGccrt9cpNeulYI1Vi/9b8AgYT6NsR4BOsWXn.nhq.', '2023-05-11 13:30:46', 0, 'user'),
(20, 0, 'test100', 'test100@gmail.com', '$2b$10$xPr6cE7cgWupjz5/EA3WZ.n2s3kb45yjiJEzKZx8SFESUUc3n7ESe', '2023-05-11 13:42:51', 0, 'user'),
(21, 0, 'test101', 'test101@gmail.com', '$2b$10$msy423r2itiz9i46nhHrbus0RQF95sqfTnvTT6yniZJWs5NUJdaNa', '2023-05-11 13:46:34', 49, 'user'),
(23, 0, 'test102', 'test102@gmail.com', '$2b$10$bQUXjd3IpHNf27bHM6AWGuERKWkQ117czvEz7mWqIm6c/zvAOEIF.', '2023-05-11 13:47:53', 0, 'user'),
(24, 0, 'AcoolnameITisVeryNice', 'cool@wow.com', '$2b$10$/YZ7wuDF9DzvQkxAbWR6zuwets0k52n5.I5LOALsf84GryFvUqAjO', '2023-05-11 20:59:36', 0, 'user'),
(25, 0, 'coolguy1', 'coolest@coolio.com', '$2b$10$Y3QC2JPL0uXmYOcP9NVZhOUIoXxChR8eB64akiCciHx8iLjmJHm96', '2023-05-18 17:22:31', 2, 'user'),
(26, 0, 'Averylongnametest', 'longname@gmail.com', '$2b$10$kqF/qQpLJ4CEu8S2WNLxLe/PVghn6aBsdjs7otAh4XxRjPvSsn4le', '2023-05-21 12:28:32', 0, 'user');

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
