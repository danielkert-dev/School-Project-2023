const {
    userSearch,
    userSearchAll,
    userSearchById,
    userCreate,
    userAuth,
    userUpdate,
    userDelete,
    userPointsAdd
} = require("./user.service")

module.exports = {
    
    userSearch: (req, res) => {
        userSearch(req.body, (error, results) => {
            
        })
    },
    userSearchAll,
    userSearchById,
    userCreate, // Req.body
    userAuth, // Req.body
    userUpdate, // Req.body
    userDelete,
    userPointsAdd
}