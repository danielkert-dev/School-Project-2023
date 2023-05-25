
--
-- Constraints for dumped tables
--

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`quiz_ID`) REFERENCES `quiz` (`ID`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Constraints for table `quiz`
--
ALTER TABLE `quiz`
  ADD CONSTRAINT `quiz_ibfk_1` FOREIGN KEY (`user_ID`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE RESTRICT;
