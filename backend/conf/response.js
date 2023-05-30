module.exports = {
  response200(res, results) { // 200 OK
    return res.status(200).json({
      // Return results
      success: true,
      data: results,
    });
  },
  error400(res) { // 400 Bad Request
    // Validate input
    return res.status(400).json({
      success: false,
      message: "Input is required",
    });
  },
  error401(res){ // 401 Unauthorized
    return res.status(401).json({
      // Return results
      success: false,
      message: "Unauthorized",
    });
  },
  error403(res) { // 403 Forbidden
    return res.status(403).json({
      success: false,
      message: "Forbidden",
  });
  },
  error404(res) { // 404 Not Found
    // Missing results
    return res.status(404).json({
      success: false,
      message: "Object not found",
    });
  },
  error500(res, error) { // 500 Internal Server Error
    // Error handling
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  },
};
