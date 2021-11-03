const express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../database/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const verify = require('../helpers/verify');
const isEmpty = require('../helpers/isEmpty');
const {userGetSelfValidator} = require('../helpers/validations/userValidations');
const uq = require('../helpers/queries/userQueries');

require('dotenv').config();

// -------------------------------
// GET api/user
// Get the current user based on the authorization header
// Private
// -------------------------------
router.get('/', verify, (req, res) => {
    const {id} = req.jwt
    const errors = userGetSelfValidator(req.jwt);
    
    const profile = {
        id: 0,
        nickname: "",
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
                errors.log(err1);

                res.status(400).json(errors);
            }else{
                if(results1.length === 1){
                    profile.id = results1[0].user_id;
                    profile.nickname = results1[0].nickname;
                    profile.registered = results1[0].registered;
                    profile.last_login = results1[0].last_login;

                    db.query(uq.sql_getUserDetails, [id], (err2, results2) => {
                        if(err2){
                            console.log(err2);
                            errors.query = "sql_getUserDetails query error";
                            errors.log(err2);
            
                            res.status(400).json(errors);
                        }else{
                            for(let i = 0; i < results2.length; i++){
                                switch(results2[i].dt_id){
                                    case 1:profile.bio = results2[i].value;break;
                                    case 2:profile.liked_manga.push(results2[i].value);break;
                                    case 3:profile.disliked_manga.push(results2[i].value);break;
                                    case 4:profile.friends.push({
                                        fid:results2[i].value.substring(0,results2[i].value.indexOf(' ')),
                                        fnickname:results2[i].value.substring(results2[i].value.indexOf(' ')+1)
                                    });break;
                                }
                            }

                            res.json(profile);
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
router.get('/:u_id', verify, (req, res) => {
    res.json("GET api/user/" + req.params.u_id);
});

// -------------------------------
// POST api/user/details
// Add details to the database(Bio,liked manga, disliked manga, friends)
// Private
// -------------------------------
router.post('/details', verify, (req, res) => {
    res.json("GET api/user/details");
});

// -------------------------------
// DELETE api/user/details/ud_id
// Delete the specified detail from the database(Bio,liked manga, disliked manga, friends)
// Private
// -------------------------------
router.delete('/details/:ud_id', verify, (req, res) => {
    res.json("DELETE api/user/details/" + req.params.ud_id);
});

// -------------------------------
// PUT api/user/details/ud_id
// Edit the specified detail in the database(Bio,liked manga, disliked manga, friends)
// Private
// -------------------------------
router.put('/details/:ud_id', verify, (req, res) => {
    res.json("PUT api/user/details/" + req.params.ud_id);
});

// -------------------------------
// POST api/user/friend-request
// Send a friend request(Add it to the database) based on the header, and request body
// Private
// -------------------------------
router.post('/friend-request', verify, (req, res) => {
    res.json("POST api/user/friend-request");
});

// -------------------------------
// POST api/user/friend-request/accept NEW "friend_id friend_name" divided by a space, janky...ik
// Send a friend request(Add it to the database) based on the header, and request body
// Private
// -------------------------------
router.post('/friend-request/accept', verify, (req, res) => {
    res.json("POST api/user/friend-request");
});

// -------------------------------
// DELETE api/user/friend-request
// Delete/refuse a friend request based on the request body
// Private
// -------------------------------
router.delete('/friend-request', verify, (req, res) => {
    res.json("DELETE api/user/friend-request");
});

// -------------------------------
// GET api/user/friend-request
// Gets every friend request the user has based on the authorization header
// Private
// -------------------------------
router.get('/friend-request', verify, (req, res) => {
    res.json("GET api/user/friend-request");
});

module.exports = router;