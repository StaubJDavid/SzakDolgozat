const express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../database/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const verify = require('../helpers/verify');
const isEmpty = require('../helpers/isEmpty');
const getVisibility = require('../helpers/getVisibility');
const checkIfFriends = require('../helpers/checkIfFriends');
const listValidations = require('../helpers/validations/listValidations');
const lv = new listValidations();
const lq = require('../helpers/queries/listQueries');
const uq = require('../helpers/queries/userQueries');

require('dotenv').config();

// -------------------------------
// POST api/lists
// Create a list in the database based on the content of the request body
// Private
// -------------------------------
router.post('/', verify, (req, res) => {
    const {id} = req.jwt
    const {list_name, visibility} = req.body;
    const errors = lv.listCreateListValidator(req.jwt, req.body);

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        db.query(lq.sql_checkBeforeCreateList, [id, list_name], (err1, results1) => {
            if(err1){
                console.log(err1);
                errors.query = "sql_checkBeforeCreateList query error";
                errors.log = err1;

                res.status(400).json(errors);
            }else{
                if(results1.length === 0){
                    db.query(lq.sql_createList, [id, list_name, getVisibility(visibility)], (err2, results2) => {
                        if(err2){
                            console.log(err2);
                            errors.query = "sql_createList query error";
                            errors.log = err2;
            
                            res.status(400).json(errors);
                        }else{
                            if(results2.affectedRows == 1){
                                res.json({success: "Successfully created list: " + list_name + " || visibility: " + getVisibility(visibility)});
                            }else{
                                if(results2.affectedRows == 0){
                                    errors.query = "Couldn't create list named: " + list_name;
                                }
            
                                if(results2.affectedRows > 1){
                                    errors.query = "Created more than 1 list named: " + list_name;
                                }   
            
                                res.status(400).json(errors);
                            } 
                        }
                    });
                }else{
                    if(results1.length === 1){
                        errors.query = "You already have a list named: " + list_name;
                    }

                    if(results1.length > 1){
                        errors.query = "More than 1 list found with name: " + list_name;
                    }   

                    res.status(400).json(errors);
                }
            }
        });
    }
});

// -------------------------------
// GET api/lists
// Get all of the lists of a user based on the header's JWT
// Private
// -------------------------------
router.get('/', verify, (req, res) => {
    const {id} = req.jwt;
    const errors = lv.listGetCurrentListsValidator(req.jwt);

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        db.query(lq.sql_getLists, [id], (err1, results1) => {
            if(err1){
                console.log(err1);
                errors.query = "sql_getLists query error";
                errors.log = err1;

                res.status(400).json(errors);
            }else{
                if(results1.length == 0){
                    errors.query = "You have no lists";
                    res.status(400).json(errors);
                }else{
                    res.json(results1);
                }
            }
        });
    }
});

// -------------------------------
// GET api/lists
// Get all of the lists of a user based on the url user_id
// Private
// -------------------------------
router.get('/user/:user_id', verify, async (req, res) => {
    const user_id = req.jwt.id;
    const friend_id = req.params.user_id;
    const errors = lv.listGetCurrentListsValidator(req.jwt, friend_id);

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        if(user_id == friend_id){
            db.query(lq.sql_getLists, [user_id], (errC, resultsC) => {
                if(errC){
                    console.log(errC);
                    errors.query = "sql_getLists query error";
                    errors.log = errC;
    
                    res.status(400).json(errors);
                }else{
                    if(resultsC.length == 0){
                        errors.query = "You have no lists";
                        res.status(400).json(errors);
                    }else{
                        res.json(resultsC);
                    }
                }
            });
        }else{
            try {
                console.log("before await");
                const areFriends = await checkIfFriends(user_id, friend_id);
                console.log("after await");
                console.log(areFriends);
                if(areFriends == 1){
                    db.query(lq.sql_getFriendsLists, [friend_id], (err2, results2) => {
                        if(err2){
                            console.log(err2);
                            errors.query = "sql_getFriendsLists query error";
                            errors.log = err2;
                
                            res.status(400).json(errors);
                        }else{
                            if(results2.length != 0){
                                res.json(results2);
                            }else{
                                if(results2.length == 0){
                                    errors.query = "This user: " + friend_id + " has no lists publicly/friendly";
                                }
            
                                res.status(400).json(errors);
                            }
                        }
                    });
                }else if (areFriends == 0){
                    db.query(lq.sql_getUsersLists, [friend_id], (err2, results2) => {
                        if(err2){
                            console.log(err2);
                            errors.query = "sql_getUsersLists query error";
                            errors.log = err2;
                
                            res.status(400).json(errors);
                        }else{
                            if(results2.length != 0){
                                res.json(results2);
                            }else{
                                if(results2.length == 0){
                                    errors.query = "This user: " + friend_id + " has no lists publicly";
                                }
            
                                res.status(400).json(errors);
                            }
                        }
                    });
                }else if(areFriends == -1){
                    res.status(400).json("checkIfFriends error");
                }
            } catch (error) {
                res.status(400).json("Throw error");
            } 
        }
    }
});

// -------------------------------
// GET api/lists/:list_id
// Get the specified list based on the list_id
// Private
// -------------------------------
router.get('/:list_id', verify, async (req, res) => {
    const user_id = req.jwt.id;
    const friend_id = req.params.user_id;
    const errors = lv.listGetCurrentListsValidator(req.jwt, friend_id);

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        if(user_id == friend_id){
            db.query(lq.sql_getLists, [user_id], (errC, resultsC) => {
                if(errC){
                    console.log(errC);
                    errors.query = "sql_getLists query error";
                    errors.log = errC;
    
                    res.status(400).json(errors);
                }else{
                    if(resultsC.length == 0){
                        errors.query = "You have no lists";
                        res.status(400).json(errors);
                    }else{
                        res.json(resultsC);
                    }
                }
            });
        }else{
            try {
                console.log("before await");
                const areFriends = await checkIfFriends(user_id, friend_id);
                console.log("after await");
                console.log(areFriends);
                if(areFriends == 1){
                    db.query(lq.sql_getFriendsLists, [friend_id], (err2, results2) => {
                        if(err2){
                            console.log(err2);
                            errors.query = "sql_getFriendsLists query error";
                            errors.log = err2;
                
                            res.status(400).json(errors);
                        }else{
                            if(results2.length != 0){
                                res.json(results2);
                            }else{
                                if(results2.length == 0){
                                    errors.query = "This user: " + friend_id + " has no lists publicly/friendly";
                                }
            
                                res.status(400).json(errors);
                            }
                        }
                    });
                }else if (areFriends == 0){
                    db.query(lq.sql_getUsersLists, [friend_id], (err2, results2) => {
                        if(err2){
                            console.log(err2);
                            errors.query = "sql_getUsersLists query error";
                            errors.log = err2;
                
                            res.status(400).json(errors);
                        }else{
                            if(results2.length != 0){
                                res.json(results2);
                            }else{
                                if(results2.length == 0){
                                    errors.query = "This user: " + friend_id + " has no lists publicly";
                                }
            
                                res.status(400).json(errors);
                            }
                        }
                    });
                }else if(areFriends == -1){
                    res.status(400).json("checkIfFriends error");
                }
            } catch (error) {
                res.status(400).json("Throw error");
            } 
        }
    }
});

// -------------------------------
// PUT api/lists/:list_id
// Edit the specified list based on the list_id, and request body content
// Private
// -------------------------------
router.put('/:list_id', verify, (req, res) => {
    const user_id = req.jwt.id;
    const list_id = req.params.list_id;
    const {list_name, visibility} = req.body;
    const errors = lv.listEditListValidator(req.jwt, list_id, req.body);

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        db.query(lq.sql_checkIfListOwner, [user_id, list_id], (err1, results1) => {
            if(err1){
                console.log(err1);
                errors.query = "sql_checkIfListOwner query error";
                errors.log = err1;

                res.status(400).json(errors);
            }else{
                if(results1.length == 1){
                    db.query(lq.sql_editList, [list_name, getVisibility(visibility), list_id], (err2, results2) => {
                        if(err2){
                            console.log(err2);
                            errors.query = "sql_editList query error";
                            errors.log = err2;
            
                            res.status(400).json(errors);
                        }else{
                            if(results2.affectedRows == 1){
                                res.json({success: "Updated list"});
                            }else{
                                if(results2.affectedRows == 0){
                                    errors.query = "Couldn't update your list";
                                }

                                if(results2.affectedRows > 1){
                                    errors.query = "Updated more than once";
                                }
            
                                res.status(400).json(errors);
                            }
                        }
                    });
                }else{
                    if(results1.length == 0){
                        errors.query = "There's no such list with you as the owner";
                    }

                    if(results1.length > 1){
                        errors.query = "There's more than 1 such list with you as the owner";
                    }

                    res.status(400).json(errors);
                }
            }
        });
    }
});

// -------------------------------
// POST api/lists/:list_id
// Add entries to the specified list based on the requests body
// Private
// -------------------------------
router.post('/:list_id', verify, async (req, res) => {
    const user_id = req.jwt.id;
    const list_id = req.params.list_id;
    const errors = lv.listAddToListValidator(req.jwt, list_id, req.body);

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        db.query(lq.sql_checkBeforeAddingMangaToList, [user_id, list_id, user_id, list_id, req.body.manga_id], (err1, results1) => {
            if(err1){
                console.log(err1);
                errors.query = "sql_checkBeforeAddingMangaToList query error";
                errors.log = err1;

                res.status(400).json(errors);
            }else{
                if(results1[0].length == 1 && results1[1].length == 0){
                    db.query(lq.sql_addToMangaList, [user_id, list_id, req.body.manga_name, req.body.manga_id], (err2, results2) => {
                        if(err2){
                            console.log(err2);
                            errors.query = "sql_addToMangaList query error";
                            errors.log = err2;
            
                            res.status(400).json(errors);
                        }else{
                            if(results2.affectedRows == 1){
                                res.json({success: "Added manga: " + req.body.manga_name + " to the list"});
                            }else{
                                if(results2.affectedRows == 0){
                                    errors.query = "Couldn't add the manga to your list";
                                }

                                if(results2.affectedRows > 1){
                                    errors.query = "Added more than once";
                                }
            
                                res.status(400).json(errors);
                            }
                        }
                    });
                }else{
                    if(results1[0].length == 0){
                        errors.query = "There's no such list with you as the owner";
                    }

                    if(results1[0].length > 1){
                        errors.query = "There's more than 1 such list with you as the owner";
                    }

                    if(results1[0].length == 1 && results1[1].length > 0){
                        errors.query = "You already have this manga in your list";
                    }

                    res.status(400).json(errors);
                }
            }
        });
    }
});

// -------------------------------
// DELETE api/lists/:list_id
// Delete the specified list based on the list_id, and header's JWT
// Private
// -------------------------------
router.delete('/:list_id', verify, (req, res) => {
    const user_id = req.jwt.id;
    const list_id = req.params.list_id;
    const errors = lv.listDeleteValidator(req.jwt, list_id);

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        db.query(lq.sql_checkIfListOwner, [user_id, list_id], (err1, results1) => {
            if(err1){
                console.log(err1);
                errors.query = "sql_checkIfListOwner query error";
                errors.log = err1;

                res.status(400).json(errors);
            }else{
                if(results1.length == 1){
                    db.query(lq.sql_deleteList, [user_id, list_id, user_id, list_id], (err2, results2) => {
                        if(err2){
                            console.log(err2);
                            errors.query = "sql_deleteList query error";
                            errors.log = err2;
            
                            res.status(400).json(errors);
                        }else{
                            if(results2[0].affectedRows != 0 && results2[1].affectedRows != 0){
                                res.json({success: "Deleted list: " + list_id})
                            }else{
                                errors.query = "Didn't delete anything.";
            
                                res.status(400).json(errors);
                            }
                        }
                    });
                }else{
                    if(results1.length == 0){
                        errors.query = "There's no such list with you as the owner";
                    }

                    if(results1.length > 1){
                        errors.query = "There's more than 1 such list with you as the owner";
                    }

                    res.status(400).json(errors);
                }
            }
        });
    }
});

// -------------------------------
// DELETE api/lists/:list_id/:ld_id
// Delete the specified list entry based on the list_id and ld_id
// Private
// -------------------------------
router.delete('/entry/:list_id/:ld_id', verify, (req, res) => {
    const user_id = req.jwt.id;
    const list_id = req.params.list_id;
    const ld_id = req.params.ld_id;
    const errors = lv.listDeleteListEntryValidator(req.jwt, req.params);

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        db.query(lq.sql_checkIfListOwner, [user_id, list_id], (err1, results1) => {
            if(err1){
                console.log(err1);
                errors.query = "sql_checkIfListOwner query error";
                errors.log = err1;

                res.status(400).json(errors);
            }else{
                if(results1.length == 1){
                    db.query(lq.sql_deleteListEntry, [user_id, list_id, ld_id], (err2, results2) => {
                        if(err2){
                            console.log(err2);
                            errors.query = "sql_deleteListEntry query error";
                            errors.log = err2;
            
                            res.status(400).json(errors);
                        }else{
                            if(results2.affectedRows == 1){
                                res.json({success: "Deleted list entry: " + ld_id})
                            }else{
                                if(results2.affectedRows == 0){
                                    errors.query = "Didn't delete anything.";
                                }
                                
                                if(results2.affectedRows > 1){
                                    errors.query = "Deleted more than 1 entry";
                                }

                                res.status(400).json(errors);
                            }
                        }
                    });
                }else{
                    if(results1.length == 0){
                        errors.query = "There's no such list with you as the owner";
                    }

                    if(results1.length > 1){
                        errors.query = "There's more than 1 such list with you as the owner";
                    }

                    res.status(400).json(errors);
                }
            }
        });
    }
});

// -------------------------------
// PUT api/lists/:list_id/:ld_id
// Edit the specified list entry based on the list_id and ld_id
// Private
// -------------------------------
router.put('/:list_id/:ld_id', verify, (req, res) => {
    res.json("DELETE api/lists/" + req.params.list_id + "/" + req.params.ld_id);
});


module.exports = router;