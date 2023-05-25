
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
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`ID`, `disabled`, `username`, `email`, `password`, `creation`, `points`, `type`) VALUES
(1, 0, 'admin', 'admin@admin.admin', '$2b$10$E9LY/KPkTHl3NzRecmLwWeWA6XwgoH7eVUCKz0mp6f0bTCUEm9XRC', '2023-05-01 20:12:44', 763, 'admin'),
(13, 0, 'test1', 'hello', '$2b$10$0RXCxjRTh1Yarw1rinVKxe.xjPm/iThtrZQONgPXMN7bPMLIf3owO', '2023-05-08 02:23:43', 3, 'user'),
(16, 1, 'Anon.698863', 'Anonymous', '$2b$10$FOfpeI74AS7d0adumGt88eVkYSwhq8EeJKcQSyrYdXLYBGxvv8ADm', '2023-05-08 02:24:17', 3, 'user'),
(17, 1, 'Anon.802337', 'Anonymous', '$2b$10$WOetXR714j1I2aEoSMX89O8QKOfcKINsFZiKQ953rVdc9v3wUGlpG', '2023-05-08 02:27:55', 342, 'user'),
(18, 1, 'Anon.873127', 'Anonymous', '0.34128690542773055', '2023-05-08 03:47:09', 0, 'user'),
(19, 1, 'Anon.842227', 'Anonymous', '0.42214154305135976', '2023-05-11 13:30:46', 0, 'user'),
(21, 0, 'test101', 'test@coool.com', '$2b$10$QlOg50N5JBBj1RbQjVClaeRX94k4eym/7T8CqJHiviE2DT8pGDGKm', '2023-05-11 13:46:34', 96, 'user');
