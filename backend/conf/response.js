module.exports = {
  response200(res, results) {
    return res.status(200).json({
      // Return results
      success: true,
      data: results,
    });
  },
  error400(res) {
    // Validate input
    return res.status(400).json({
      success: false,
      message: "Input is required",
    });
  },
  error401(res){
    return res.status(401).json({
      // Return results
      success: false,
      message: "Unauthorized",
    });
  },
  error404(res) {
    // Missing results
    return res.status(404).json({
      success: false,
      message: "Object not found",
    });
  },
  error500(res, error) {
    // Error handling
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  },
};
