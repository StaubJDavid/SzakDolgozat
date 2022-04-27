const express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../database/db');
const verify = require('../helpers/verify');
const verify_check = require('../helpers/verify_check');
const isEmpty = require('../helpers/isEmpty');
const {threadCreateThreadValidator,
    threadGetThreadsValidator,
    threadGetThreadValidator,
    threadDelThreadValidator,
    threadGetUsersThreadValidator
} = require('../helpers/validations/threadValidations');
//const tq = require('../helpers/queries/threadQueries');
const threadClass = require('../helpers/queries/threadQueries');
const tc = new threadClass();
const { v4: uuidv4 } = require('uuid');

require('dotenv').config();

// POST api/threads
// Létrehoz egy fórum threadet
router.post('/', verify, async (req, res) => {
    const user_id = req.jwt.id;
    const {title, text} = req.body;
    const errors = threadCreateThreadValidator(req.jwt,req.body);

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        try {
            const checkCreateThreadResult = await tc.checkBeforeCreateThread(user_id, title);
            
            if(checkCreateThreadResult.length == 0){
                const thread_id = uuidv4();
                const createThreadResult = await tc.createThread(thread_id, user_id, title, text);
            
                if(createThreadResult.affectedRows == 1){
                    let id = 0;
                    if(req.jwt){
                        id = req.jwt.id;
                    }

                    const getThreadResult = await tc.getThread(id,thread_id)

                    if(getThreadResult.length == 1){
                        res.json(getThreadResult[0]);
                    }else{
                        if(getThreadResult.length == 0){
                            errors.query = "No threads available";
                        }else{
                            errors.query = "There's more than one thread with id: " + thread_id;
                        }
                        
                        res.status(400).json(errors);
                    }
                }else{
                    if(createThreadResult.affectedRows == 0){
                        errors.query = "Thread creation was unsuccessful";
                    }else{
                        errors.query = "More threads were created than anticipated: " + createThreadResult.affectedRows;
                    }

                    res.status(400).json(errors);
                }
            
            }else{
                errors.query = "You already have a thread with the title:" + title;

                res.status(400).json(errors);
            }
        
        } catch (error) {
            res.status(400).json(error);
        }
        
    }
});

// GET api/threads
// Visszaadja az összes fórum threadet
router.get('/', verify_check, async (req, res) => {
    const errors = {}

    let id = 0;
    if(req.jwt){
        id = req.jwt.id;
    }

    try {
        const getAllThreadsResults = await tc.getAllThreadsLiked(id);

        if(getAllThreadsResults.length > 0){
            res.json(getAllThreadsResults);
            //console.log(getAllThreadsResults);
        }else{
            errors.query = "No threads available";

            res.status(400).json(errors);
        }
    } catch (error) {
        res.status(400).json(error);
    }
});

// GET api/threads/:t_id
// Visszaadja a megadott fórum thread adatait
router.get('/:t_id', verify_check, async (req, res) => {
    //const user_id = req.jwt.id;
    const thread_id = req.params.t_id;
    //const errors = threadGetThreadValidator(user_id,thread_id);

    const errors = {};

    let id = 0;
    if(req.jwt){
        id = req.jwt.id;
    }
    try {
        const getThreadResults = await tc.getThread(id,thread_id);

        if(getThreadResults.length == 1){
            res.json(getThreadResults[0]);
        }else{
            if(getThreadResults.length == 0){
                errors.query = "No threads available";
            }else{
                errors.query = "There's more than one thread with id: " + thread_id;
            }
            
            res.status(400).json(errors);
        }
    } catch (error) {
        res.status(400).json(error);
    }
    
});

// DELETE api/threads/:t_id
// Törli a megadott thread-et ha a kezdeményező a thread tulaja
router.delete('/:t_id', verify, async (req, res) => {
    const user_id = req.jwt.id;
    const thread_id = req.params.t_id;
    const errors = threadDelThreadValidator(user_id,thread_id);


    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        try {
            const beforeDelThreadResult = await tc.checkBeforeDelThread(user_id,thread_id);
        
            if(beforeDelThreadResult.length == 1){
                const delThreadResult = await tc.delThread(thread_id);
                //TODO: DELETE COMMENTS OF THE THREAD
                if(delThreadResult.affectedRows == 1){
                    res.json({success: "Successfully deleted thread"});
                }else{
                    if(delThreadResult.affectedRows == 0){
                        errors.query = "No thread available";
                    }else{
                        errors.query = "There's more than one thread with id: " + thread_id;
                    }
                    
                    res.status(400).json(errors);
                }
            }else{
                if(beforeDelThreadResult.length == 0){
                    errors.query = "No thread available";
                }else{
                    errors.query = "There's more than one thread with id: " + thread_id;
                }
                
                res.status(400).json(errors);
            }
        } catch (error) {
            res.status(400).json(error);
        }
    }
});

// GET api/threads/own/:u_id
// Felhasználó által létrehozott thread eket adja vissza
router.get('/own/:u_id', verify, async (req, res) => {
    const user_id = req.params.u_id;
    const errors = threadGetUsersThreadValidator(user_id);


    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        try {
            const getUsersThreadResults = await tc.getUsersThread(user_id);

            if(getUsersThreadResults.length != 0){
                res.json(getUsersThreadResults);
            }else{
                if(getUsersThreadResults.length == 0){
                    errors.query = "User has no threads";
                }else{
                    errors.query = "Idk man something else is wrong";
                }
                
                res.status(400).json(errors);
            }
        } catch (error) {
            res.status(400).json(error);
        }
    }
});


module.exports = router;