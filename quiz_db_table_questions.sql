
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
  `description` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `choice` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `correct_answer` varchar(50) NOT NULL,
  `last` tinyint(1) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `quiz_ID` (`quiz_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=108 DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`ID`, `quiz_ID`, `question`, `image`, `question_num`, `description`, `choice`, `correct_answer`, `last`) VALUES
(5, 36, 'Test 1 question 1', 'https://wikimediafoundation.org/wp-content/uploads/2020/12/%E0%A6%B0%E0%A6%B9%E0%A6%B8%E0%A7%8D%E0%A6%AF%E0%A7%87_%E0%A6%98%E0%A7%87%E0%A6%B0%E0%A6%BE_%E0%A6%9C%E0%A6%B2%E0%A6%BE%E0%A6%AC%E0%A6%A8.jpg?resize=1024,682', 1, 'Very beautiful place sssssssssssssssssssssssssssssssssssss', 'Beautiful place;Ugly place;Weird place', '1', 0),
(6, 36, 'Test 1 question 3', 'https://wikimediafoundation.org/wp-content/uploads/2020/12/Mulu_Pinnacles.jpg', 3, 'Big beautiful stones', 'Cool stones;Big stones;Beautiful stones;Funny stones;Real stones;Gray stones', '3;6', 1),
(7, 36, 'Test 1 question 2', 'https://wikimediafoundation.org/wp-content/uploads/2020/12/Baby_tufted_gray_langur_Semnopithecus_priam.jpg?resize=1024,682', 2, 'Monkey', 'Gorilla;Chimp;Horse;Monkey', '1;2;4', 0),
(15, 44, 'Who manufactured the first car?', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Benz_Patent_Motorwagen_1.jpg/640px-Benz_Patent_Motorwagen_1.jpg', 1, 'The first vehicle that runs on a gas engine', 'Richard Hort;Peter Fredrich Konholm;Henry Ford;Carl Benz;Étienne Lenoir', '4', 0),
(16, 44, 'What is the largest land vehicle in the world?', 'https://cdn.jdpower.com/What%20Is%20The%20Biggest%20Vehicle%20In%20The%20World.jpg', 3, 'A large vehicle', 'RWE Bagger 288;Iveco Daily;Caterpillar 797B;Prelude FLNG', '1', 0),
(17, 44, 'What is the fastest road legal car in the world?', 'https://assets.rebelmouse.io/media-library/image.jpg?id=30857856&width=1200&height=800&quality=90&coordinates=152%2C0%2C0%2C0', 4, 'Fast and ...', 'Koenigsegg Jesko Absolut;Bugattti Chiron Supper Sport;GT9-R;Hennessey Venom F5', '2', 1),
(18, 44, 'What is the most popular car in the world? ', 'https://www.motorbiscuit.com/wp-content/uploads/2022/01/Row-of-Toyota-cars-at-a-dealership-highlighting-a-story-about-the-most-popular-car-colors-.jpg?w=1024&h=673&strip=all&quality=89', 2, 'Parked cars', 'Ford F Series;Volkswagen Golf;Honda Civic;Toyota Corolla', '4', 0),
(20, 47, 'Question 1', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Generic_Camera_Icon.svg/100px-Generic_Camera_Icon.svg.png', 1, 'The only question. You are being watched ', 'choice 1;choice 2;choice 3', '3', 1),
(22, 49, 'A cool question', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Golden_hour_at_bekol_savannah.jpg/300px-Golden_hour_at_bekol_savannah.jpg', 1, 'Cool question', '1;2;3', '2', 1),
(99, 36, 'Test', 'iluo', 1, 'jklk', 'lkjlkj', '1', 1),
(104, 108, 'Cool title', 'https://wikimediafoundation.org/wp-content/uploads/2019/12/Crimea-Ai-Petri-low-clouds.jpg?resize=1024,512', 1, 'Cool image', 'Cool', '1', 0),
(105, 108, 'Hello', 'https://wikimediafoundation.org/wp-content/uploads/2019/12/Crimea-Ai-Petri-low-clouds.jpg?resize=1024,512', 3, 'Hello', 'Hellllo!', '1', 0),
(106, 108, 'Hej', 'https://wikimediafoundation.org/wp-content/uploads/2019/12/Crimea-Ai-Petri-low-clouds.jpg?resize=1024,512', 4, 'Where are you?', 'Hoooo', '1', 1),
(107, 108, 'Cool question', 'https://wikimediafoundation.org/wp-content/uploads/2019/12/Crimea-Ai-Petri-low-clouds.jpg?resize=1024,512', 2, 'Cool', 'Cool', '1', 0);
