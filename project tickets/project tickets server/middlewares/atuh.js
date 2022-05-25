const jwt = require("jsonwebtoken"); //call to jsonwebtoken module
const { config } = require("../config/secert");



exports.auth = (req, res, next) => {
    // if token sent
    let token = req.header("x-api-key"); //get token from request
    if (!token) { //If the token does not exist from the url endpoint 
        return res.status(401).json({ err_msg: "need to send token to his endpoint url" })
    }
    try {
        // check if token is expired or token exists (jwt.verify(token,SecretWord))
        let decodeToken = jwt.verify(token, `${config.tokenSecret}`); //Token authentication
        // Produces a property within the empty parameter that is the same
        // For all the functions in the routing of the rout
        req.tokenData = decodeToken; //(req) --> Global memory from middleware function to route
        // (Next) says the function has finished its function and can be passed
        // to the next function in the routs
        next()
    } catch (err) { // catch if token invalid or expired
        return res.status(401).json({ err_msg: "Token invalid (IF YOU HACKER <('_')> ) or expired" })
    }
}
exports.authAdmin = (req, res, next) => {
    // if token sent
    let token = req.header("x-api-key"); //get token from request
    if (!token) { //If the token does not exist from the url endpoint 
        return res.status(401).json({ err_msg: "need to send token to his endpoint url" })
    }
    try {
        // check if token is expired or token exists (jwt.verify(token,SecretWord))
        let decodeToken = jwt.verify(token, config.tokenSecret); //Token authentication
        // Produces a property within the empty parameter that is the same
        // For all the functions in the routing of the rout
        if (decodeToken.role == 'admin') {
            req.tokenData = decodeToken; //(req) --> Global memory from middleware function to route
            // (Next) says the function has finished its function and can be passed
            // to the next function in the routs
            next()
        } else {
            return res.status(401).json({ msg: 'You need to send token of admin to be here!' })
        }
    } catch (err) { // catch if token invalid or expired
        return res.status(401).json({ err_msg: "Token invalid (IF YOU HACKER <('_')> ) or expired" })
    }
}