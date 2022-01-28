const express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../database/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const verify = require('../helpers/verify');
const verify_check = require('../helpers/verify_check');
const isEmpty = require('../helpers/isEmpty');
const {threadCreateThreadValidator,
    threadGetThreadsValidator,
    threadGetThreadValidator,
    threadDelThreadValidator,
    threadGetUsersThreadValidator
} = require('../helpers/validations/threadValidations');
const tq = require('../helpers/queries/threadQueries');
const { v4: uuidv4 } = require('uuid');

require('dotenv').config();

// -------------------------------
// POST api/threads
// Create a thread in the database based on the content of the request body
// Private
// -------------------------------
router.post('/', verify, (req, res) => {
    const user_id = req.jwt.id;
    const {title, text} = req.body;
    const errors = threadCreateThreadValidator(req.jwt,req.body);

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        db.query(tq.sql_checkBeforeCreateThread, [user_id, title], (err1, results1) => {
            if(err1){
                console.log(err1);
                errors.query = "sql_checkBeforeCreateThread query error";
                errors.log = err1;
    
                res.status(400).json(errors);
            }else{                
                if(results1.length == 0){
                    const thread_id = uuidv4();
                    db.query(tq.sql_createThread, [thread_id, user_id, title, text], (err2, results2) => {
                        if(err2){
                            console.log(err2);
                            errors.query = "sql_createThread query error";
                            errors.log = err2;
                
                            res.status(400).json(errors);
                        }else{
                            if(results2.affectedRows == 1){
                                let id = 0;
                                if(req.jwt){
                                    id = req.jwt.id;
                                }

                                db.query(tq.sql_getThread, [id,thread_id], (err3, results3) => {
                                    if(err3){
                                        console.log(err3);
                                        errors.query = "sql_getThread query error";
                                        errors.log = err3;
                            
                                        res.status(400).json(errors);
                                    }else{                
                                        if(results3.length == 1){
                                            //console.log(results3[0].created);
                                            res.json(results3[0]);
                                        }else{
                                            if(results3.length == 0){
                                                errors.query = "No threads available";
                                            }else{
                                                errors.query = "There's more than one thread with id: " + thread_id;
                                            }
                                            
                                            res.status(400).json(errors);
                                        }
                                    }
                                });
                            }else{
                                if(results2.affectedRows == 0){
                                    errors.query = "Thread creation was unsuccessful";
                                }else{
                                    errors.query = "More threads were created than anticipated: " + results2.affectedRows;
                                }
            
                                res.status(400).json(errors);
                            }
                        }
                    });
                }else{
                    errors.query = "You already have a thread with the title:" + title;

                    res.status(400).json(errors);
                }
            }
        });
    }
});

// -------------------------------
// GET api/threads
// Get all of the threads
// Private
// -------------------------------
router.get('/', verify_check, (req, res) => {
    const errors = {}

    let id = 0;
    if(req.jwt){
        id = req.jwt.id;
    }

    db.query(tq.sql_getAllThreadsLiked, [id], (err1, results1) => {
        if(err1){
            console.log(err1);
            errors.query = "sql_getAllThreadsLiked query error";
            errors.log = err1;

            res.status(400).json(errors);
        }else{                
            if(results1.length > 0){
                res.json(results1);
                //console.log(results1);
            }else{
                errors.query = "No threads available";

                res.status(400).json(errors);
            }
        }
    });
});

// -------------------------------
// GET api/threads/:t_id
// Get aspecified thread
// Private
// -------------------------------
router.get('/:t_id', verify_check, (req, res) => {
    //const user_id = req.jwt.id;
    const thread_id = req.params.t_id;
    //const errors = threadGetThreadValidator(user_id,thread_id);

    const errors = {};

    let id = 0;
    if(req.jwt){
        id = req.jwt.id;
    }

    db.query(tq.sql_getThread, [id,thread_id], (err1, results1) => {
        if(err1){
            console.log(err1);
            errors.query = "sql_getThread query error";
            errors.log = err1;

            res.status(400).json(errors);
        }else{                
            if(results1.length == 1){
                //console.log(results1[0].created);
                res.json(results1[0]);
            }else{
                if(results1.length == 0){
                    errors.query = "No threads available";
                }else{
                    errors.query = "There's more than one thread with id: " + thread_id;
                }
                
                res.status(400).json(errors);
            }
        }
    });
});

// -------------------------------
// DELETE api/threads/:t_id
// Delete the specified thread based on the list_id, and header's JWT
// Private
// -------------------------------
router.delete('/:t_id', verify, (req, res) => {
    const user_id = req.jwt.id;
    const thread_id = req.params.t_id;
    const errors = threadDelThreadValidator(user_id,thread_id);


    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        db.query(tq.sql_checkBeforeDelThread, [user_id,thread_id], (err1, results1) => {
            if(err1){
                console.log(err1);
                errors.query = "sql_checkBeforeDelThread query error";
                errors.log = err1;
    
                res.status(400).json(errors);
            }else{                
                if(results1.length == 1){
                    db.query(tq.sql_delThread, [thread_id], (err2, results2) => {
                        if(err2){
                            console.log(err2);
                            errors.query = "sql_checkBeforeDelThread query error";
                            errors.log = err2;
                
                            res.status(400).json(errors);
                        }else{                
                            //TODO: DELETE COMMENTS OF THE THREAD
                            if(results2.affectedRows == 1){
                                res.json({success: "Successfully deleted thread"});
                            }else{
                                if(results2.affectedRows == 0){
                                    errors.query = "No thread available";
                                }else{
                                    errors.query = "There's more than one thread with id: " + thread_id;
                                }
                                
                                res.status(400).json(errors);
                            }
                        }
                    });
                }else{
                    if(results1.length == 0){
                        errors.query = "No thread available";
                    }else{
                        errors.query = "There's more than one thread with id: " + thread_id;
                    }
                    
                    res.status(400).json(errors);
                }
            }
        });
    }
});

// -------------------------------
// GET api/threads/own/:u_id
// Get the threads of a user
// Private
// -------------------------------
router.get('/own/:u_id', verify, (req, res) => {
    const user_id = req.params.u_id;
    const errors = threadGetUsersThreadValidator(user_id);


    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        db.query(tq.sql_getUsersThreads, [user_id], (err1, results1) => {
            if(err1){
                console.log(err1);
                errors.query = "sql_getUsersThreads query error";
                errors.log = err1;
    
                res.status(400).json(errors);
            }else{                
                if(results1.length != 0){
                    res.json(results1);
                }else{
                    if(results1.length == 0){
                        errors.query = "User has no threads";
                    }else{
                        errors.query = "Idk man something else is wrong";
                    }
                    
                    res.status(400).json(errors);
                }
            }
        });
    }
});


module.exports = router;