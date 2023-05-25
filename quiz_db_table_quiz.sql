
-- --------------------------------------------------------

--
-- Table structure for table `quiz`
--

DROP TABLE IF EXISTS `quiz`;
CREATE TABLE IF NOT EXISTS `quiz` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `title` varchar(30) NOT NULL,
  `amount_done` int NOT NULL,
  `description` varchar(58) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_ID` int NOT NULL,
  `image` text NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `user_ID` (`user_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `quiz`
--

INSERT INTO `quiz` (`ID`, `title`, `amount_done`, `description`, `user_ID`, `image`) VALUES
(36, 'Test 1', 23, 'Cool description', 1, 'https://wikimediafoundation.org/wp-content/uploads/2020/12/Alcedo_atthis_-_Riserve_naturali_e_aree_contigue_della_fascia_fluviale_del_Po.jpg?resize=1024,682'),
(44, 'Cars', 17, 'Quiz about cars', 1, 'https://www.motortrend.com/uploads/2022/03/2022-Honda-Civic-Touring-vs-2022-Hyundai-Elantra-Limited-vs-2022-Kia-Forte-GT-vs-2022-Mazda-Mazda3-Sedan-AWD-Turbo-vs-2022-Nissan-Sentra-SR-vs-2022-Volkswagen-Jetta-SEL-19.jpg'),
(47, 'TEST101 QUIZ', 12, 'A cool quiz test', 21, 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Slow_Life_in_A_Tea_House_01_edited.jpg/500px-Slow_Life_in_A_Tea_House_01_edited.jpg'),
(49, 'TEST11 Quiz', 4, 'A cool quiz', 17, 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/14-02-02-straszburg-RalfR-113.jpg/300px-14-02-02-straszburg-RalfR-113.jpg'),
(108, 'TEST101 Question 3', 3, 'With three questions', 21, 'https://wikimediafoundation.org/wp-content/uploads/2019/12/%D0%BE%D0%B4%D0%BE%D0%B4%D0%B5%D0%BD%D0%B4%D1%80%D0%BE%D0%BD%D0%BD%D0%B8%D0%B9-%D1%81%D0%B2%D1%96%D1%82%D0%B0%D0%BD%D0%BE%D0%BA-%D0%BD%D0%B0-%D0%92%D1%83%D1%85%D0%B0%D1%82%D0%BE%D0%BC%D1%83-%D0%9A%D0%B0%D0%BC%D0%B5%D0%BD%D1%96.jpg?resize=1024,678');
