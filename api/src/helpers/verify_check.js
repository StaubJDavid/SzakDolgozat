const jwt = require('jsonwebtoken');

require('dotenv').config();

const verify_check = (req, res, next) =>{
    const authHeader = req.headers.authorization;

    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if(err){
                return next();
            }

            req.jwt = user;
            next();  
        });
    } else{
        next();
    }
};

module.exports = verify_check;