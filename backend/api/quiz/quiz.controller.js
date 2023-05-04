const {
  quizSearchAll,
  quizSearchById,
  quizSearch,
  quizAmountAdd,
  questionSearch,
  leaderboardSearchAll,
} = require("./quiz.service");
const { sign } = require("jsonwebtoken");

module.exports = {
  quizSearchAll: (req, res) => {
    const page = req.params.page;
    const pageSize = req.params.pageSize;
    if (!page || !pageSize) {
      // Validate input
      return res.status(400).json({
        success: false,
        message: "Input is required",
      });
    }
    quizSearchAll(page, pageSize, (error, results) => {
      if (error) {
        // Error handling
        console.error(error);
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
      if (!results || results.length === 0) {
        // Missing results
        return res.status(404).json({
          success: false,
          message: "Quiz not found",
        });
      }
      return res.status(200).json({
        // Return results
        success: true,
        data: results,
      });
    });
  },

  quizSearchById: (req, res) => {
    const id = req.params.id;
    if (!id) {
      // Validate input
      return res.status(400).json({
        success: false,
        message: "Input is required",
      });
    }
    quizSearchById(id, (error, results) => {
      if (error) {
        // Error handling
        console.error(error);
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
      if (!results || results.length === 0) {
        // Missing results
        return res.status(404).json({
          success: false,
          message: "Quiz not found",
        });
      }
      return res.status(200).json({
        // Return results
        success: true,
        data: results,
      });
    });
  },

  quizSearch: (req, res) => {
    const input = req.params.input;
    if (!input) {
      // Validate input
      return res.status(400).json({
        success: false,
        message: "Input is required",
      });
    }
    quizSearch(input, (error, results) => {
      if (error) {
        // Error handling
        console.error(error);
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
      if (!results || results.length === 0) {
        // Missing results
        return res.status(404).json({
          success: false,
          message: "Quiz not found",
        });
      }
      return res.status(200).json({
        // Return results
        success: true,
        data: results,
      });
    });
  },

  quizAmountAdd: (req, res) => {
    const input = req.body;
    if (!input) {
      // Validate input
      return res.status(400).json({
        success: false,
        message: "Input is required",
      });
    }
    quizAmountAdd(input, (error, results) => {
      if (error) {
        // Error handling
        console.error(error);
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
      if (!results || results.length === 0) {
        // Missing results
        return res.status(404).json({
          success: false,
          message: "Quiz not found",
        });
      }
      return res.status(200).json({
        // Return results
        success: true,
        data: results,
      });
    });
  },

  questionSearch: (req, res) => {
    const quiz_id = req.params.quiz_id;
    const question_num = req.params.question_num;

    if (!quiz_id || !question_num) {
      // Validate input
      return res.status(400).json({
        success: false,
        message: "Input is required",
      });
    }
    questionSearch(quiz_id, question_num, (error, results) => {
      if (error) {
        // Error handling
        console.error(error);
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
      if (!results || results.length === 0) {
        // Missing results
        return res.status(404).json({
          success: false,
          message: "Question not found",
        });
      }
      return res.status(200).json({
        // Return results
        success: true,
        data: results,
      });
    });
  },

  leaderboardSearchAll: (req, res) => {
    const page = req.params.page;
    const pageSize = req.params.pageSize;
    if (!page || !pageSize) {
      // Validate input
      return res.status(400).json({
        success: false,
        message: "Input is required",
      });
    }
    leaderboardSearchAll(page, pageSize, (error, results) => {
      if (error) {
        // Error handling
        console.error(error);
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
      if (!results || results.length === 0) {
        // Missing results
        return res.status(404).json({
          success: false,
          message: "Users not found",
        });
      }
      return res.status(200).json({
        // Return results
        success: true,
        data: results,
      });
    });
  },
};
