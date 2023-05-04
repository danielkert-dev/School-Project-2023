const { adminSearchAll } = require("../admin/admin.service");


module.exports = {
    adminSearchAll: (req, res) => {
        const page = req.params.page;
        const pageSize = req.params.pageSize;
        if (!page || !pageSize) {
          // Validate input
          return res.status(400).json({
            success: false,
            message: "Input is required",
          });
        }
        adminSearchAll(page, pageSize, (error, results) => {
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
              message: "User not found",
            });
          }
          return res.status(200).json({
            // Return results
            success: true,
            data: results,
          });
        });
      },
}