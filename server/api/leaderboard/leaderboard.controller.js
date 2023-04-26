const { leaderBoardRead,

} = require("./leaderboard.service");


module.exports = {
    
    leaderBoardRead: (req, res) => {
        leaderBoardRead(parseInt(req.params.from), parseInt(req.params.to), (error, results) => {
            if (error) {
                res.status(500).json({
                    success: false,
                    message: error.message,
                });
            }
            if (!results) {
                return res.status(404).json({
                    success: false,
                    message: "Leaderboard not found",
                });
            }
            return res.status(200).json({
                success: true,
                data: results,
            })
    });
    }
    
}