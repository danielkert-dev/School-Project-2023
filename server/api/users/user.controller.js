const { allUsers,
        userByID
                } = require("./user.service");

module.exports = {
    allUsers: (req, res) => {
        allUsers((error, results) => {
            if (error) {
                res.status(500).json({
                    success: false,
                    message: error.message
                })
            }
            return res.status(200).json({
                success: true,
                data: results
            })
        })
    },

    userByID: (req, res) => {
        const id = req.params.id;
        userByID(id, (error, results) => {
            if (error) {
                res.status(500).json({
                    success: false,
                    message: error.message
                })
            }

            if (!results) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                })
            }

            return res.status(200).json({
                success: true,
                data: results
            })
        })
    }
}