const { verify } = require("jsonwebtoken");

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization"); // Get the token
        if (token) { // If no token
            // If token provided
                token = token.slice(7); // Cut the token
                verify(token, process.env.SIGN_KEY, (error, decoded) => {
                    if (error) {
                        res.json({
                            success: false,
                            message: "Invalid token"  
                        })
                    } else {
                        req.decoded = decoded,
                        next(); // Continue to next middleware
                    }
                    
                })
            } else {
            // If token provided
            return res.status(401).json({
                success: false,
                message: "Token not provided. Unauthorized"
            });
        }
    }
}