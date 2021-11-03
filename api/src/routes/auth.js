const express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../database/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const verify = require('../helpers/verify');
const isEmpty = require('../helpers/isEmpty');
const {registerValidator, loginValidator} = require('../helpers/validations/authValidations');
const aq = require('../helpers/queries/authQueries')

require('dotenv').config();

// -------------------------------
// POST api/auth/login
// Login user
// Public
// -------------------------------
router.post('/login', (req, res) => {
    const { email, password} = req.body;

    const errors = loginValidator(req.body);
    
    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        db.query(aq.sql_loginCheckIfRegistered, [email], (err1, results1) => {
            if(err1){
                console.log(err1);
                errors.query = "sql_loginCheckIfRegistered query error";
                errors.log(err1);

                res.status(400).json(errors);
            }else{
                if(results1.length === 1){
                    if(bcrypt.compareSync(password, results1[0].password)){
                        const payload = {
                            id:         results1[0].user_id,
                            role:       results1[0].role,
                            nickname:   results1[0].nickname
                        }

                        const token = jwt.sign(payload, process.env.SECRET_KEY,{expiresIn: "2m"});

                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        });
                    }else{
                        errors.password = "Wrong password"
                        res.status(400).json(errors);
                    }
                }else if(results1.length === 0){
                    errors.email = "No user found with this email"
                    res.status(400).json(errors);
                }else{
                    errors.query = "sql_loginCheckIfRegistered more than 1 results?";
                    res.status(400).json(errors);
                }
            }
        });
    }
});

/*router.get('/pw', (req, res) => {
    const hashedPassword = bcrypt.hashSync("12345", saltRounds);
    
    res.json(hashedPassword);
});*/

// -------------------------------
// POST api/auth/register
// Register user
// Public
// -------------------------------
router.post('/register', (req, res) => {
    const { email, nickname, password} = req.body;

    const errors = registerValidator(req.body);

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        db.query(aq.sql_checkIfRegistered, [email, nickname], (err1, results1) => {
            if(err1){
                console.log(err1);
                errors.query = "sql_checkIfRegistered query error";
                errors.log(err1);

                res.status(400).json(errors);
            }else{
                if(results1.length === 0){

                    const hashedPassword = bcrypt.hashSync(password, saltRounds);

                    db.query(aq.sql_registerUser, [email, hashedPassword, nickname], (err2, results2) => {
                        if(err2){
                            console.log(err2);
                            errors.query = "sql_registerUser query error";
                            errors.log(err2);
            
                            res.status(400).json(errors);
                        }else{
                            db.query(aq.sql_getRegisteredUser, [results2.insertId], (err3, results3) => {
                                if(err3){
                                    console.log(err3);
                                    errors.query = "sql_getRegisteredUser query error";
                                    errors.log(err3);
                    
                                    res.status(400).json(errors);
                                }else{
                                    if(results3.length === 1){
                                        res.json(results3[0]);
                                    }else{
                                        errors.query = `sql_getRegisteredUser gave back [ ${results3.length} ] results`;
                                    }
                                }
                            });
                        }
                    });
                }else if(results1.length === 1){
                    if(results1[0].email === email){
                        errors.email = "Email is already taken";
                    }

                    if(results1[0].nickname === nickname){
                        errors.nickname = "Nickname is already taken";
                    }

                    res.status(400).json(errors);
                }else{
                    errors.query = "sql_chekIfRegistered more than 1 results?";
                    res.status(400).json(errors);
                }
            }
        });
    }
});

module.exports = router;