const express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../database/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const verify = require('../helpers/verify');
const isEmpty = require('../helpers/isEmpty');
const {registerValidator, loginValidator} = require('../helpers/validations/authValidations');
//const aq = require('../helpers/queries/authQueries')
const authClass = require('../helpers/queries/authQueries');
const ac = new authClass();

require('dotenv').config();

// -------------------------------
// POST api/auth/login
// Login user
// Public
// -------------------------------
router.post('/login', async (req, res) => {
    const { email, password} = req.body;

    const errors = loginValidator(req.body);
    
    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        try {

            const loginCheckResult = await ac.loginCheckIfRegistered(email);

            if(loginCheckResult.length === 1){
                if(bcrypt.compareSync(password, loginCheckResult[0].password)){
                    const payload = {
                        id:         loginCheckResult[0].user_id,
                        role:       loginCheckResult[0].role,
                        nickname:   loginCheckResult[0].nickname
                    }

                    const token = jwt.sign(payload, process.env.SECRET_KEY,{expiresIn: "240m"});

                    res.json({
                        success: true,
                        token: 'Bearer ' + token
                    });
                }else{
                    errors.password = "Wrong password"
                    res.status(400).json(errors);
                }
            }else if(loginCheckResult.length === 0){
                errors.email = "No user found with this email"
                res.status(400).json(errors);
            }else{
                errors.query = "sql_loginCheckIfRegistered more than 1 results?";
                res.status(400).json(errors);
            }
        } catch (error) {
            res.status(400).json(error)
        }
    }
});

// -------------------------------
// POST api/auth/register
// Register user
// Public
// -------------------------------
router.post('/register', async (req, res) => {
    const { email, nickname, password} = req.body;

    console.log(req.body);

    const errors = registerValidator(req.body);

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{

        try {
            const checkRegisteredResult = await ac.checkIfRegistered(email,nickname);
            
            if(checkRegisteredResult.length === 0){

                const hashedPassword = bcrypt.hashSync(password, saltRounds);

                const registerResult = await ac.registerUser(email, hashedPassword, nickname);
                
                const defaultFillResult = await ac.fillDefaultValues(registerResult.insertId);
                
                if(defaultFillResult.affectedRows === 1){
                    res.json(true);
                }else{
                    errors.query = `sql_fillDefaultValues gave back [ ${defaultFillResult.length} ] results`;
                }
            }else if(checkRegisteredResult.length === 1){
                if(checkRegisteredResult[0].email === email){
                    errors.email = "Email is already taken";
                }

                if(checkRegisteredResult[0].nickname === nickname){
                    errors.nickname = "Nickname is already taken";
                }

                res.status(400).json(errors);
            }else{
                errors.query = "sql_chekIfRegistered more than 1 results?";
                res.status(400).json(errors);
            }

        } catch (error) {
            res.status(400).json(error);
        }
    }
});

module.exports = router;