const jwt = require('jsonwebtoken');

require('dotenv').config();

const verify = (req, res, next) =>{
    const authHeader = req.headers.authorization;

    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if(err){
                return res.status(403).json("Token is invalid");
            }

            req.jwt = user;
            next();  
        });
    } else{
        res.status(401).json("Not authenticated");
    }
};

module.exports = verify;