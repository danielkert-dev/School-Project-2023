const { allQuiz,
        quizByID } = require("./quiz.service");

module.exports = {
  allQuiz: (req, res) => {
    allQuiz((error, results) => {
      if (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
      res.status(200).json({
        success: true,
        data: results,
      });
    });
  },

  quizByID: (req, res) => {

    quizByID(req.params.id, (error, results) => {
      if (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }

      if (!results) {
        return res.status(404).json({
          success: false,
          message: "Quiz not found",
        });
      }
      res.status(200).json({
        success: true,
        data: results,
      });
    });
  }

};
 