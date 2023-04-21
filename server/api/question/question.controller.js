const {
  allQuestions,
  questionByID,
  questionByQuizID,
} = require("./question.service");

module.exports = {
  allQuestions: (req, res) => {
    allQuestions((error, results) => {
      if (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
      return res.status(200).json({
        success: true,
        data: results,
      });
    });
  },

  questionByID: (req, res) => {
    questionByID(req.params.id, (error, results) => {
      if (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
      if (!results) {
        return res.status(404).json({
          success: false,
          message: "Question not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: results,
      });
    });
  },

  questionByQuizID: (req, res) => {
    questionByQuizID(req.params.id, req.params.q, (error, results) => {
      if (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }

      if (!results) {
        console.log(req.params);
        return res.status(404).json({
          success: false,
          message: "Question not found",
        });
      }
      
      return res.status(200).json({
        success: true,
        data: results,
      });
    });
  },

  
};
