const { adminSearchAll, adminSearch ,adminDelete } = require("../admin/admin.service");
const {
  response200,
  error400,
  error404,
  error500,
} = require("../../conf/response");

module.exports = {
  adminSearchAll: (req, res) => { // Search all users by admin
    const page = req.params.page;
    const pageSize = req.params.pageSize;
    if (!page || !pageSize) {
      return error400(res);
    }
    adminSearchAll(page, pageSize, (error, results) => {
      if (error) {
        return error500(res, error);
      }
      if (!results || results.length === 0) {
        return error404(res, results);
      }
      return response200(res, results);
    });
  },

  adminSearch: (req, res) => { // Search users by input
    const input = req.params.input;
    const page = req.params.page;
    const pageSize = req.params.pageSize;
    if (!input || !page || !pageSize) {
      return error400(res);
    }
    adminSearch(input, page, pageSize, (error, results) => {
      if (error) {
        return error500(res, error);
      }
      if (!results || results.length === 0) {
        return error404(res, results);
      }
      return response200(res, results);
    })
  },

  adminDelete: (req, res) => { // Delete user by admin
    const body = req.body;
    if (!body.id) {
      return error400(res);
    }
    adminDelete(body, (error, results) => {
      if (error) {
        return error500(res, error);
      }
      if (!results || results.length === 0) {
        return error404(res, results);
      }
      return response200(res, results);
    });
  },
};
