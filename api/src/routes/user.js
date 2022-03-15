const express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../database/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const verify = require('../helpers/verify');
const isEmpty = require('../helpers/isEmpty');
const {userGetSelfValidator, 
    userGetUserIdValidator, 
    userAddDetailsValidator, 
    userDeleteDetailValidator,
    userEditDetailValidator,
    userSendFriendRequestValidator,
    userAcceptFriendRequestValidator,
    userDeleteFriendRequestValidator,
    userGetFriendRequestValidator,
    userDelFriendValidator
} = require('../helpers/validations/userValidations');
const uq = require('../helpers/queries/userQueries');
const frq = require('../helpers/queries/friendRequestQueries');
const friendClass = require('../helpers/queries/friendQueries');
const fq = new friendClass();

require('dotenv').config();

// -------------------------------
// GET api/user
// Get the current user based on the authorization header
// Private
// -------------------------------

//Friend Query Integration Done
router.get('/', verify, async (req, res) => {
    const {id} = req.jwt
    const errors = userGetSelfValidator(req.jwt);
    
    const profile = {
        id: 0,
        nickname: "",
        email: "",
        registered: "",
        last_login: "",
        bio: "",
        liked_manga: [],
        disliked_manga: [],
        friends: []
    };

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        db.query(uq.sql_getUser, [id], (err1, results1) => {
            if(err1){
                console.log(err1);
                errors.query = "sql_getUser query error";
                errors.log = err1;

                res.status(400).json(errors);
            }else{
                if(results1.length === 1){
                    profile.id = results1[0].user_id;
                    profile.nickname = results1[0].nickname;
                    profile.email = results1[0].email;
                    profile.registered = results1[0].registered;
                    profile.last_login = results1[0].last_login;

                    db.query(uq.sql_getUserDetails, [id], async (err2, results2) => {
                        if(err2){
                            console.log(err2);
                            errors.query = "sql_getUserDetails query error";
                            errors.log = err2;
            
                            res.status(400).json(errors);
                        }else{
                            for(let i = 0; i < results2.length; i++){
                                switch(results2[i].dt_id){
                                    case 1:profile.bio = results2[i].value;break;
                                    case 2:profile.liked_manga.push(results2[i].value);break;
                                    case 3:profile.disliked_manga.push(results2[i].value);break;
                                    /*case 4:profile.friends.push({
                                        fid:results2[i].value.substring(0,results2[i].value.indexOf(' ')),
                                        fnickname:results2[i].value.substring(results2[i].value.indexOf(' ')+1)
                                    });break;*/
                                }
                            }

                            try {
                                const friendList = await fq.getFriends(id);
                                profile.friends = friendList;

                                res.json(profile);
                            } catch (error) {
                                res.status(400).json(error);
                            }
                        }
                    });
                }else{
                    if(results1.length === 0){
                        errors.query = "No such user found";
                    }

                    if(results1.length > 1){
                        errors.query = "More than 1 user found";
                    }

                    res.status(400).json(errors);
                }
            }
        });
    }
});

// -------------------------------
// GET api/user/:u_id
// Get the specified user based on u_id
// Private
// -------------------------------

//Friend Query Integration Done
router.get('/:u_id', verify, async (req, res) => {
    const id = req.params.u_id;
    const errors = userGetUserIdValidator(req.jwt,req.params.u_id);

    const profile = {
        id: 0,
        nickname: "",
        registered: "",
        last_login: "",
        bio: {},
        liked_manga: [],
        disliked_manga: [],
        friends: [],
        owned: id==req.jwt.id,
        are_friends: false
    };

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        db.query(uq.sql_getUser, [id], (err1, results1) => {
            if(err1){
                console.log(err1);
                errors.query = "sql_getUser query error";
                errors.log = err1;

                res.status(400).json(errors);
            }else{
                if(results1.length === 1){
                    profile.id = results1[0].user_id;
                    profile.nickname = results1[0].nickname;
                    profile.registered = results1[0].registered;
                    profile.last_login = results1[0].last_login;

                    db.query(uq.sql_getUserDetails, [id], async (err2, results2) => {
                        if(err2){
                            console.log(err2);
                            errors.query = "sql_getUserDetails query error";
                            errors.log = err2;
            
                            res.status(400).json(errors);
                        }else{
                            for(let i = 0; i < results2.length; i++){
                                switch(results2[i].dt_id){
                                    case 1:profile.bio = {ud_id:results2[i].ud_id,value:results2[i].value};break;
                                    
                                    case 2:profile.liked_manga.push({
                                        ud_id:results2[i].ud_id,
                                        manga_id:results2[i].value.substring(0,results2[i].value.indexOf(' ')),
                                        value:results2[i].value.substring(results2[i].value.indexOf(' ')+1)
                                    });break;

                                    case 3:profile.disliked_manga.push({
                                        ud_id:results2[i].ud_id,
                                        manga_id:results2[i].value.substring(0,results2[i].value.indexOf(' ')),
                                        value:results2[i].value.substring(results2[i].value.indexOf(' ')+1)
                                    });break;

                                    /*case 4:profile.friends.push({
                                        ud_id:results2[i].ud_id,
                                        fid:results2[i].value.substring(0,results2[i].value.indexOf(' ')),
                                        fnickname:results2[i].value.substring(results2[i].value.indexOf(' ')+1)
                                    });break;*/
                                }
                            }

                            try {
                                const friendList = await fq.getFriends(id);
                                profile.friends = friendList;

                                //res.json(profile);
                            } catch (error) {
                                //res.status(400).json(error);
                                console.log(error);
                            }

                            if(req.jwt.id === id){
                                profile.are_friends = false;
                                res.json(profile);
                            }else{
                                //CHEK IF FRIENDS STUFF
                                try {
                                    profile.are_friends = await fq.checkIfFriends(id,req.jwt.id)
                                            
                                    res.json(profile);
                                } catch (error) {
                                    res.status(400).json("Error");
                                }
                            }
                        }
                    });
                }else{
                    if(results1.length === 0){
                        errors.no_user = "No such user found";
                    }

                    if(results1.length > 1){
                        errors.query = "More than 1 user found";
                    }

                    res.status(400).json(errors);
                }
            }
        });
    }
});

// -------------------------------
// POST api/user/details
// Add details to the database(Bio,liked manga, disliked manga, friends)
// Private
// -------------------------------

//Doesnt need friend integration
router.post('/details', verify, (req, res) => {
    const {dt_id,value} = req.body;
    const user_id = req.jwt.id;

    const errors = userAddDetailsValidator(req.jwt,req.body);

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        db.query(uq.sql_checkBeforeAddDetails, [user_id,dt_id,value], (err1, results1) => {
        if(err1){
            console.log(err1);
            errors.query = "sql_addDetails query error";
            errors.log = err1;

            res.status(400).json(errors);
        }else{
            if(results1.length === 0){
                db.query(uq.sql_addDetails, [user_id,dt_id,value], (err2, results2) => {
                    if(err2){
                        console.log(err2);
                        errors.query = "sql_addDetails query error";
                        errors.log = err2;
        
                        res.status(400).json(errors);
                    }else{
                        if(results2.affectedRows === 1){
                            res.json({success: true});
                        }else{
                            errors.query = "Detail insert failed"
                            res.status(400).json(errors);
                        }
                    }
                });
            }else{
                if(results1.length === 1){
                    errors.query = "Already in the database";
                }

                if(results1.length > 1){
                    errors.query = "More than 1 record found";
                }

                res.status(400).json(errors);
            }           
        }
    });
        
    }
});

// -------------------------------
// DELETE api/user/details/ud_id
// Delete the specified detail from the database(Bio,liked manga, disliked manga, friends)
// Private
// -------------------------------

//Doesnt need friend integration
router.delete('/details/:ud_id', verify, (req, res) => {
    const ud_id = req.params.ud_id;
    const user_id = req.jwt.id;

    const errors = userDeleteDetailValidator(req.jwt,req.params);

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        db.query(uq.sql_deleteDetail, [user_id,ud_id], (err1, results1) => {
        if(err1){
            console.log(err1);
            errors.query = "sql_deleteDetail query error";
            errors.log = err1;

            res.status(400).json(errors);
        }else{
            if(results1.affectedRows === 1){
                res.json({success: true});
            }else{
                if(results1.affectedRows === 0){
                    errors.query = "No such record to be deleted";
                }

                if(results1.affectedRows > 1){
                    errors.query = "More than 1 record deleted";
                }

                res.status(400).json(errors);
            }           
        }
    });
        
    }
});

// -------------------------------userEditDetailValidator
// PUT api/user/details/ud_id
// Edit the specified detail in the database(Bio,liked manga, disliked manga, friends)
// Private
// -------------------------------

//Doesnt need friend integration
router.put('/details/:ud_id', verify, (req, res) => {
    const ud_id = req.params.ud_id;
    const user_id = req.jwt.id;
    const value = req.body.value;
    console.log({ud_id,user_id,value});

    const errors = userEditDetailValidator(req.jwt,req.params.ud_id,req.body.value);

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        db.query(uq.sql_checkBeforeEditDetail, [user_id,ud_id,user_id,value], (err1, results1) => {
            if(err1){
                console.log(err1);
                errors.query = "sql_checkBeforeEditDetail query error";
                errors.log = err1;
    
                res.status(400).json(errors);
            }else{
                if(results1.length === 1 && results1[0].user_id == user_id && results1[0].ud_id == ud_id){
                    db.query(uq.sql_editDetail, [value,user_id,ud_id], (err2, results2) => {
                        if(err2){
                            console.log(err2);
                            errors.query = "sql_editDetail query error";
                            errors.log = err2;
                
                            res.status(400).json(errors);
                        }else{
                            if(results2.affectedRows === 1){
                                res.json({success: true});
                            }else{
                                if(results2.affectedRows === 0){
                                    errors.query = "No such record updated";
                                }
                
                                if(results2.affectedRows > 1){
                                    errors.query = "More than 1 record updated";
                                }
                
                                res.status(400).json(errors);
                            }           
                        }
                    });
                }else{
                    if(results1.length === 1 && results1[0].user_id == user_id && results1[0].ud_id == ud_id && results1[0].value == value){
                        errors.query = "You can't change your current detail to the same";
                    }else if(results1.length === 1 && results1[0].user_id == user_id && results1[0].value == value && results1[0].ud_id != ud_id){
                        errors.query = "Correct ud_id not found but the detail is already in the database";
                    }
    
                    if(results1.length > 2){
                        errors.query = "More than 2 record selected, potential error";
                    }

                    if(results1.length === 2){
                        errors.query = "You already have a detail like this";
                    }

                    res.status(400).json(errors);
                }           
            }
        });
        
        
    }
});

// -------------------------------
// POST api/user/friend-request
// Send a friend request(Add it to the database) based on the header, and request body
// Private
// -------------------------------

//Friends integrated
router.post('/friend-request', verify, async (req, res) => {
    const {reciever_id, message} = req.body;
    const user_id = req.jwt.id;

    const errors = userSendFriendRequestValidator(req.jwt,req.body);

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        db.query(frq.sql_checkBeforeSendFriendRequest, [user_id,reciever_id,reciever_id], async (err1, results1) => {
            if(err1){
                console.log(err1);
                errors.query = "sql_checkBeforeSendFriendRequest query error";
                errors.log = err1;
    
                res.status(400).json(errors);
            }else{
                if(results1[0].length === 0 && results1[1].length === 1){

                    try {
                        let friends = await fq.checkIfFriends(reciever_id,user_id)
                                
                        if(!friends){
                            db.query(frq.sql_sendFriendRequest, [user_id,reciever_id,message], (err3, results3) => {
                                if(err3){
                                    console.log(err3);
                                    errors.query = "sql_sendFriendRequest query error";
                                    errors.log = err3;
                        
                                    res.status(400).json(errors);
                                }else{
                                    if(results3.affectedRows === 1){
                                        res.json({success: "Sent request to " + reciever_id});
                                    }else{
                                        if(results3.affectedRows === 0){
                                            errors.query = "No such record inserted";
                                        }
                        
                                        if(results3.affectedRows > 1){
                                            errors.query = "More than 1 record inserted";
                                        }
                        
                                        res.status(400).json(errors);
                                    }           
                                }
                            });
                        }else{
                            if(friends){
                                errors.query = "You are already friend with this person: " + fnickname;
                            }
        
                            res.status(400).json(errors);
                        }   
                    } catch (error) {
                        console.log(error);
                        res.status(400).json("Is this the error?");
                    }
                }else{
                    if(results1[0].length === 1){
                        errors.query = "You already sent a friend request to this person";
                    }
    
                    if(results1[0].length > 1){
                        errors.query = "There's more friend request sent to this person??";
                    }

                    if(results1[1].length === 0){
                        errors.user = "No such user exists";
                    }

                    res.status(400).json(errors);
                }           
            }
        });

    }
});

// -------------------------------
// POST api/user/friend-request/accept NEW "friend_id friend_name" divided by a space, janky...ik
// Send a friend request(Add it to the database) based on the header, and request body
// Private
// -------------------------------

//Friend integration Done
router.post('/friend-request/accept', verify, (req, res) => {
    const {sender_id} = req.body;
    const user_id = req.jwt.id;

    const errors = userAcceptFriendRequestValidator(req.jwt,req.body);

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        db.query(frq.sql_checkBeforeAcceptFriendRequest, [sender_id,user_id], (errc, resultsc) => {
            if(errc){
                console.log(errc);
                errors.query = "sql_checkBeforeAcceptFriendRequest query error";
                errors.log = errc;
    
                res.status(400).json(errors);
            }else{
                if(resultsc.length === 1){
                    db.query(frq.sql_getUserNickname, [sender_id], (err1, results1) => {
                        if(err1){
                            console.log(err1);
                            errors.query = "sql_getUserNickname query error";
                            errors.log = err1;
                
                            res.status(400).json(errors);
                        }else{
                            if(results1.length === 1){
                                db.query(frq.sql_acceptFriendRequest, [user_id,sender_id, sender_id,user_id,
                                                                       user_id,sender_id, sender_id,user_id
                                ], (err2, results2) => {
                                    if(err2){
                                        errors.query = "sql_acceptFriendRequest query error";
                                        errors.log = err2;
                            
                                        res.status(400).json(errors);
                                    }else{
                                        if((results2[0].affectedRows === 2 || results2[0].affectedRows === 1) && results2[1].affectedRows === 2){
                                            res.json({success: "Accepted friend request?"});
                                        }else{
                                            if(results2[0].affectedRows > 2 || results2[0].affectedRows < 1){
                                                errors.query = "Deleted rows error: " + results2[0].affectedRows;
                                            }
                            
                                            if(results2[1].affectedRows !== 2){
                                                errors.query = "Inserted rows error: " + results2[1].affectedRows;
                                            }
                            
                                            res.status(400).json(errors);
                                        }           
                                    }
                                });
                            }else{
                                if(results1.length === 0){
                                    errors.query = "No such user: " + sender_id;
                                }
                
                                if(results1.length > 1){
                                    errors.query = "More than 1 person with the id: " + sender_id;
                                }
            
                                res.status(400).json(errors);
                            }           
                        }
                    });
                }else{
                    if(resultsc.length === 0){
                        errors.query = "You don't have a request from: " + sender_id;
                    }
    
                    if(resultsc.length > 1){
                        errors.query = "More than 1 friend request with: " + sender_id;
                    }

                    res.status(400).json(errors);
                }                     
            }
        });
    }
});

// -------------------------------
// DELETE api/user/friend-request
// Delete/refuse a friend request based on the request body
// Private
// -------------------------------

//Friend integration not needed
router.delete('/friend-request', verify, (req, res) => {
    const {other_id} = req.body;
    const user_id = req.jwt.id;

    const errors = userDeleteFriendRequestValidator(req.jwt,req.body);

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        db.query(frq.sql_deleteFriendRequest, [user_id, other_id, other_id, user_id], (err1, results1) => {
            if(err1){
                console.log(err1);
                errors.query = "sql_deleteFriendRequest query error";
                errors.log = err1;
    
                res.status(400).json(errors);
            }else{
                if(results1.affectedRows === 1 || results1.affectedRows === 2){
                    res.json({success: "Successfully deleted friend request"});
                }else{
                    if(results1.affectedRows === 0){
                        errors.query = "No friend request with: " + other_id;
                    }
    
                    if(results1.affectedRows > 2){
                        errors.query = "More than 2 requests with: " + other_id;
                    }

                    res.status(400).json(errors);
                }           
            }
        });
    }
});

// -------------------------------
// GET api/user/get/friend-request
// Gets every friend request the user has based on the authorization header
// Private
// -------------------------------

//Friend integration not needed
router.get('/get/friend-request', verify, (req, res) => {
    const user_id = req.jwt.id;
    const errors = userGetFriendRequestValidator(req.jwt);

    const friend_requests = {
        sent: [],
        recieved: []
    };

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        db.query(frq.sql_getFriendRequests, [user_id, user_id], (err1, results1) => {
            if(err1){
                console.log(err1);
                errors.query = "sql_getFriendRequests query error";
                errors.log = err1;
    
                res.status(400).json(errors);
            }else{
                for(let i = 0; i < results1[0].length; i++){
                    friend_requests.sent.push({
                        reciever_id: results1[0][i].reciever_id,
                        nickname: results1[0][i].nickname,
                        sent: results1[0][i].timestamp,
                        message: results1[0][i].message
                    })
                }  
                
                for(let i = 0; i < results1[1].length; i++){
                    friend_requests.recieved.push({
                        sender_id: results1[1][i].sender_id,
                        nickname: results1[1][i].nickname,
                        sent: results1[1][i].timestamp,
                        message: results1[1][i].message
                    })
                } 
                
                res.json(friend_requests);
            }
        });
    }
});

// -------------------------------
// DELETE api/user/friend
// Delete friend based on the authorization header and body params
// Private
// -------------------------------

//Friend integration Done
router.delete('/friend', verify, async (req, res) => {
    const user_id = req.jwt.id;
    const {friend_id} = req.body;
    const errors = userDelFriendValidator(req.jwt,req.body);

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        try {
            const friendsResult = await fq.getFriendlistIds(user_id, friend_id);

            const delFriendResult = await fq.deleteFriends(friendsResult[0].fr_id, friendsResult[1].fr_id);

            res.json({success: "Successfully deleted friend"});
        } catch (error) {
            res.status(400).json(error);
        }
    }
});

module.exports = router;