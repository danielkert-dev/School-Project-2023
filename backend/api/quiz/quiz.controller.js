const {
  quizSearchAll,
  quizSearchById,
  quizSearch,
  quizAmountAdd,
  questionSearch,
  questionAmountByQuizID,
  leaderboardSearchAll,
  quizCreate,
  questionCreate,
  quizUpdate,
  quizAmountDone,
  questionUpdate,
  quizDelete,
  quizSearchByTitle,
} = require("./quiz.service");
const {
  response200,
  error400,
  error404,
  error500,
} = require("../../conf/response");

module.exports = {
  quizSearchAll: (req, res) => {
    const page = req.params.page;
    const pageSize = req.params.pageSize;
    if (!page || !pageSize) {
      return error400(res);
    }
    quizSearchAll(page, pageSize, (error, results) => {
      if (error) {
        return error500(res, error);
      }
      if (!results || results.length === 0) {
        return error404(res, results);
      }
      return response200(res, results);
    });
  },

  quizSearchById: (req, res) => {
    const id = req.params.id;
    if (!id) {
      return error400(res);
    }
    quizSearchById(id, (error, results) => {
      if (error) {
        return error500(res, error);
      }
      if (!results || results.length === 0) {
        return error404(res, results);
      }
      return response200(res, results);
    });
  },

  quizSearchByTitle: (req, res) => {
    const title = req.params.title;
    if (!title) {
      return error400(res);
    }
    quizSearchByTitle(title, (error, results) => {
      if (error) {
        return error500(res, error);
      }
      if (!results || results.length === 0) {
        return error404(res, results);
      }
      return response200(res, results);
    });
  },


  quizSearch: (req, res) => {
    const input = req.params.input;
    const page = req.params.page;
    const pageSize = req.params.pageSize;
    if (!input || !page || !pageSize) {
      return error400(res);
    }
    quizSearch(input, page, pageSize, (error, results) => {
      if (error) {
        return error500(res, error);
      }
      if (!results || results.length === 0) {
        return error404(res, results);
      }
      return response200(res, results);
    });
  },

  quizAmountAdd: (req, res) => {
    const input = req.body;
    if (!input) {
      return error400(res);
    }
    quizAmountAdd(input, (error, results) => {
      if (error) {
        return error500(res, error);
      }
      if (!results || results.length === 0) {
        return error404(res, results);
      }
      return response200(res, results);
    });
  },

  questionSearch: (req, res) => {
    const quiz_id = req.params.quiz_id;
    const question_num = req.params.question_num;

    if (!quiz_id || !question_num) {
      return error400(res);
    }
    questionSearch(quiz_id, question_num, (error, results) => {
      if (error) {
        return error500(res, error);
      }
      if (!results || results.length === 0) {
        return error404(res, results);
      }
      return response200(res, results);
    });
  },

  questionAmountByQuizID: (req, res) => {
    const quiz_id = req.params.quiz_id;
    if (!quiz_id) {
      return error400(res);
    }
    questionAmountByQuizID(quiz_id, (error, results) => {
      if (error) {
        return error500(res, error);
      }
      if (!results || results.length === 0) {
        return error404(res, results);
      }
      return response200(res, results);
    })
  },

  leaderboardSearchAll: (req, res) => {
    const page = req.params.page;
    const pageSize = req.params.pageSize;
    if (!page || !pageSize) {
      return error400(res);
    }
    leaderboardSearchAll(page, pageSize, (error, results) => {
      if (error) {
        return error500(res, error);
      }
      if (!results || results.length === 0) {
        return error404(res, results);
      }
      return response200(res, results);
    });
  },

  quizCreate: (req, res) => {
    const body = req.body;
    if (!body) {
      return error400(res);
    }
    quizCreate(body, (error, results) => {
      if (error) {
        return error500(res, error);
      }
      if (!results || results.length === 0) {
        return error404(res, results);
      }
      return response200(res, results);
    })
  },

  questionCreate: (req, res) => {
    const body = req.body;
    if (!body) {
      return error400(res);
    }
    questionCreate(body, (error, results) => {
      if (error) {
        return error500(res, error);
      }
      if (!results || results.length === 0) {
        return error404(res, results);
      }
      return response200(res, results);
    })
  },

  quizUpdate: (req, res) => {
    const body = req.body;
    if (!body) {
      return error400(res);
    }
    quizUpdate(body, (error, results) => {
      if (error) {
        return error500(res, error);
      }
      if (!results || results.length === 0) {
        return error404(res, results);
      }
      return response200(res, results);
    })
  },

  quizAmountDone: (req, res) => {
    const body = req.body;
    if (!body) {
      return error400(res);
    }
    quizAmountDone(body, (error, results) => {
      if (error) {
        return error500(res, error);
      }
      if (!results || results.length === 0) {
        return error404(res, results);
      }
      return response200(res, results);
    })
  },

  questionUpdate: (req, res) => {
    const body = req.body;
    if (!body) {
      return error400(res);
    }
    questionUpdate(body,  (error, results) => {
      if (error) {
        return error500(res, error);
      }
      if (!results || results.length === 0) {
        return error404(res, results);
      }
      return response200(res, results);
    })
  },

  quizDelete: (req, res) => {
    const body = req.body;
    if (!body) {
      return error400(res);
    }
    quizDelete(body, (error, results) => {
      if (error) {
        return error500(res, error);
      }
      if (!results || results.length === 0) {
        return error404(res, results);
      }
      return response200(res, results);
    })
  }


};
