const { allChoices,
        choiceByID } = require("./choices.service");

module.exports = {
    allChoices: (req, res) => {
        allChoices((error, results) => {
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

    choicesByID: (req, res) => {
        choiceByID(req.params.id, (error, results) => {
            if (error) {
                res.status(500).json({
                    success: false,
                    message: error.message
                })
            }
            if (!results) {
                return res.status(404).json({
                    success: false,
                    message: "Choice not found"
                })
            }
            return res.status(200).json({
                success: true,
                data: results
            })
        })
    }
}
