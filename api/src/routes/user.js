const express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../database/db');
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
/*const uq = require('../helpers/queries/userQueries');
const frq = require('../helpers/queries/friendRequestQueries');*/

const friendClass = require('../helpers/queries/friendQueries');
const fc = new friendClass();

const userClass = require('../helpers/queries/userQueries');
const uc = new userClass();

const friendRequestClass = require('../helpers/queries/friendRequestQueries');
const frc = new friendRequestClass();

require('dotenv').config();

// GET api/user
// Headerben lévő JWT alapján visszaadja a felhasználó profilját
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
        try {
            const getUserResult = await uc.getUser(id);

            if(getUserResult.length === 1){
                profile.id = getUserResult[0].user_id;
                profile.nickname = getUserResult[0].nickname;
                profile.email = getUserResult[0].email;
                profile.registered = getUserResult[0].registered;
                profile.last_login = getUserResult[0].last_login;

                const getUserDetailsResult = await uc.getUserDetails(id);

                for(let i = 0; i < getUserDetailsResult.length; i++){
                    switch(getUserDetailsResult[i].dt_id){
                        case 1:profile.bio = getUserDetailsResult[i].value;break;
                        case 2:profile.liked_manga.push(getUserDetailsResult[i].value);break;
                        case 3:profile.disliked_manga.push(getUserDetailsResult[i].value);break;
                    }
                }

                const friendList = await fc.getFriends(id);
                profile.friends = friendList;

                res.json(profile);
            }else{
                if(getUserResult.length === 0){
                    errors.query = "No such user found";
                }

                if(getUserResult.length > 1){
                    errors.query = "More than 1 user found";
                }

                res.status(400).json(errors);
            }
        } catch (error) {
            res.status(400).json(error);
        }
    }
});

// GET api/user/:u_id
// Megadott id-jú felhasználónak visszaadja a profilját
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
        try {
            const getUserResult = await uc.getUser(id);

            if(getUserResult.length === 1){
                profile.id = getUserResult[0].user_id;
                profile.nickname = getUserResult[0].nickname;
                profile.registered = getUserResult[0].registered;
                profile.last_login = getUserResult[0].last_login;

                const getUserDetailsResult = await uc.getUserDetails(id);
                for(let i = 0; i < getUserDetailsResult.length; i++){
                    switch(getUserDetailsResult[i].dt_id){
                        case 1:profile.bio = {ud_id:getUserDetailsResult[i].ud_id,value:getUserDetailsResult[i].value};break;
                        
                        case 2:profile.liked_manga.push({
                            ud_id:getUserDetailsResult[i].ud_id,
                            manga_id:getUserDetailsResult[i].value.substring(0,getUserDetailsResult[i].value.indexOf(' ')),
                            value:getUserDetailsResult[i].value.substring(getUserDetailsResult[i].value.indexOf(' ')+1)
                        });break;

                        case 3:profile.disliked_manga.push({
                            ud_id:getUserDetailsResult[i].ud_id,
                            manga_id:getUserDetailsResult[i].value.substring(0,getUserDetailsResult[i].value.indexOf(' ')),
                            value:getUserDetailsResult[i].value.substring(getUserDetailsResult[i].value.indexOf(' ')+1)
                        });break;
                    }
                }
                
                const friendList = await fc.getFriends(id);
                profile.friends = friendList;

                if(req.jwt.id === id){
                    profile.are_friends = false;
                    res.json(profile);
                }else{
                    //CHEK IF FRIENDS STUFF
                    profile.are_friends = await fc.checkIfFriends(id,req.jwt.id)
                                
                    res.json(profile);
                }
            }else{
                if(getUserResult.length === 0){
                    errors.no_user = "No such user found";
                }

                if(getUserResult.length > 1){
                    errors.query = "More than 1 user found";
                }

                res.status(400).json(errors);
            }
        } catch (error) {
            res.status(400).json(error);
        }
    }
});

// POST api/user/details
// Profil részletet ad hozzá a felhasználó
router.post('/details', verify, async (req, res) => {
    const {dt_id,value} = req.body;
    const user_id = req.jwt.id;

    const errors = userAddDetailsValidator(req.jwt,req.body);

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        try {
            const addDetailsCheckResult = await uc.checkBeforeAddDetails(user_id,dt_id,value);
            if(addDetailsCheckResult.length === 0){

                const addDetailsResult = await uc.addDetails(user_id,dt_id,value);
                if(addDetailsResult.affectedRows === 1){
                    res.json({success: true});
                }else{
                    errors.query = "Detail insert failed"
                    res.status(400).json(errors);
                }
            }else{
                if(addDetailsCheckResult.length === 1){
                    errors.query = "Already in the database";
                }

                if(addDetailsCheckResult.length > 1){
                    errors.query = "More than 1 record found";
                }

                res.status(400).json(errors);
            }
        } catch (error) {
            res.status(400).json(error);
        }        
    }
});

// DELETE api/user/details/ud_id
// Profil részletet töröl a felhasználó
router.delete('/details/:ud_id', verify, async (req, res) => {
    const ud_id = req.params.ud_id;
    const user_id = req.jwt.id;

    const errors = userDeleteDetailValidator(req.jwt,req.params);

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        try {
            const detailDeleteResult = await uc.deleteDetail(user_id,ud_id);
            if(detailDeleteResult.affectedRows === 1){
                res.json({success: true});
            }else{
                if(detailDeleteResult.affectedRows === 0){
                    errors.query = "No such record to be deleted";
                }

                if(detailDeleteResult.affectedRows > 1){
                    errors.query = "More than 1 record deleted";
                }

                res.status(400).json(errors);
            }    
        } catch (error) {
            res.status(400).json(error);
        }
    }
});

// PUT api/user/details/ud_id
// Profil részletet változtat a felhasználó
router.put('/details/:ud_id', verify, async (req, res) => {
    const ud_id = req.params.ud_id;
    const user_id = req.jwt.id;
    const value = req.body.value;
    console.log({ud_id,user_id,value});

    const errors = userEditDetailValidator(req.jwt,req.params.ud_id,req.body.value);

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        try {
            const beforeEditCheckResult = await uc.checkBeforeEditDetail(user_id,ud_id,value);
        
            if(beforeEditCheckResult.length === 1 && beforeEditCheckResult[0].user_id == user_id && beforeEditCheckResult[0].ud_id == ud_id){
                const editDetailResult = await uc.editDetail(value,user_id,ud_id);
                if(editDetailResult.affectedRows === 1){
                    res.json({success: true});
                }else{
                    if(editDetailResult.affectedRows === 0){
                        errors.query = "No such record updated";
                    }
    
                    if(editDetailResult.affectedRows > 1){
                        errors.query = "More than 1 record updated";
                    }
    
                    res.status(400).json(errors);
                }
            }else{
                if(beforeEditCheckResult.length === 1 && beforeEditCheckResult[0].user_id == user_id && beforeEditCheckResult[0].ud_id == ud_id && beforeEditCheckResult[0].value == value){
                    errors.query = "You can't change your current detail to the same";
                }else if(beforeEditCheckResult.length === 1 && beforeEditCheckResult[0].user_id == user_id && beforeEditCheckResult[0].value == value && beforeEditCheckResult[0].ud_id != ud_id){
                    errors.query = "Correct ud_id not found but the detail is already in the database";
                }

                if(beforeEditCheckResult.length > 2){
                    errors.query = "More than 2 record selected, potential error";
                }

                if(beforeEditCheckResult.length === 2){
                    errors.query = "You already have a detail like this";
                }

                res.status(400).json(errors);
            }
        } catch (error) {
            //console.log(error);
            res.status(400).json(error);
        }
    }
});

// POST api/user/friend-request
// Küld egy barát felkérést a kérés törzsében lévő felhasználónak
router.post('/friend-request', verify, async (req, res) => {
    const {reciever_id, message} = req.body;
    const user_id = req.jwt.id;

    const errors = userSendFriendRequestValidator(req.jwt,req.body);

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        try {
            const sendFRCheckResult = await frc.checkBeforeSendFriendRequest(user_id,reciever_id);
        
            if(sendFRCheckResult[0].length === 0 && sendFRCheckResult[1].length === 1){

                try {
                    let friends = await fc.checkIfFriends(reciever_id,user_id)
                            
                    if(!friends){
                        const sendFRResults = await frc.sendFriendRequest(user_id,reciever_id,message);

                        if(sendFRResults.affectedRows === 1){
                            res.json({success: "Sent request to " + reciever_id});
                        }else{
                            if(sendFRResults.affectedRows === 0){
                                errors.query = "No such record inserted";
                            }
            
                            if(sendFRResults.affectedRows > 1){
                                errors.query = "More than 1 record inserted";
                            }
            
                            res.status(400).json(errors);
                        } 
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
                if(sendFRCheckResult[0].length === 1){
                    errors.query = "You already sent a friend request to this person";
                }

                if(sendFRCheckResult[0].length > 1){
                    errors.query = "There's more friend request sent to this person??";
                }

                if(sendFRCheckResult[1].length === 0){
                    errors.user = "No such user exists";
                }

                res.status(400).json(errors);
            }
        } catch (error) {
            res.status(400).json(error);
        }
        
    }
});

// POST api/user/friend-request/accept
// Elfogadja a kérés törzsben lévő barát kérelmet
router.post('/friend-request/accept', verify, async (req, res) => {
    const {sender_id} = req.body;
    const user_id = req.jwt.id;

    const errors = userAcceptFriendRequestValidator(req.jwt,req.body);

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        try {
            const acceptFRCheckResult = await frc.checkBeforeAcceptFriendRequest(sender_id,user_id);

            if(acceptFRCheckResult.length === 1){
                const getUserNicknameResult = await frc.getUserNickname(sender_id);

                if(getUserNicknameResult.length === 1){
                    const acceptFRResult = await frc.acceptFriendRequest(user_id,sender_id);
                
                    if((acceptFRResult[0].affectedRows === 2 || acceptFRResult[0].affectedRows === 1) && acceptFRResult[1].affectedRows === 2){
                        res.json({success: "Accepted friend request?"});
                    }else{
                        if(acceptFRResult[0].affectedRows > 2 || acceptFRResult[0].affectedRows < 1){
                            errors.query = "Deleted rows error: " + acceptFRResult[0].affectedRows;
                        }
        
                        if(acceptFRResult[1].affectedRows !== 2){
                            errors.query = "Inserted rows error: " + acceptFRResult[1].affectedRows;
                        }
        
                        res.status(400).json(errors);
                    }
                
                }else{
                    if(getUserNicknameResult.length === 0){
                        errors.query = "No such user: " + sender_id;
                    }
    
                    if(getUserNicknameResult.length > 1){
                        errors.query = "More than 1 person with the id: " + sender_id;
                    }

                    res.status(400).json(errors);
                }
            }else{
                if(acceptFRCheckResult.length === 0){
                    errors.query = "You don't have a request from: " + sender_id;
                }

                if(acceptFRCheckResult.length > 1){
                    errors.query = "More than 1 friend request with: " + sender_id;
                }

                res.status(400).json(errors);
            }
        } catch (error) {
            res.status(400).json(error);
        }
    }
});

// DELETE api/user/friend-request
// Törli/visszautasítja a kérés törzsben lévő barát kérelmet
router.delete('/friend-request', verify, async (req, res) => {
    const {other_id} = req.body;
    const user_id = req.jwt.id;

    const errors = userDeleteFriendRequestValidator(req.jwt,req.body);

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        try {
            const deleteFRResult = await frc.deleteFriendRequest(user_id, other_id);
        
            if(deleteFRResult.affectedRows === 1 || deleteFRResult.affectedRows === 2){
                res.json({success: "Successfully deleted friend request"});
            }else{
                if(deleteFRResult.affectedRows === 0){
                    errors.query = "No friend request with: " + other_id;
                }

                if(deleteFRResult.affectedRows > 2){
                    errors.query = "More than 2 requests with: " + other_id;
                }

                res.status(400).json(errors);
            } 

        } catch (error) {
            res.status(400).json(error);
        }
    }
});

// GET api/user/get/friend-request
// Megkapja a Headerben lévő felhasználónak az összes baráti kérelmét(kimenő,bejövő)
router.get('/get/friend-request', verify, async (req, res) => {
    const user_id = req.jwt.id;
    const errors = userGetFriendRequestValidator(req.jwt);

    const friend_requests = {
        sent: [],
        recieved: []
    };

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        try {
            const getFRResults = await frc.getFriendRequests(user_id);

            for(let i = 0; i < getFRResults[0].length; i++){
                friend_requests.sent.push({
                    reciever_id: getFRResults[0][i].reciever_id,
                    nickname: getFRResults[0][i].nickname,
                    sent: getFRResults[0][i].timestamp,
                    message: getFRResults[0][i].message
                })
            }  
            
            for(let i = 0; i < getFRResults[1].length; i++){
                friend_requests.recieved.push({
                    sender_id: getFRResults[1][i].sender_id,
                    nickname: getFRResults[1][i].nickname,
                    sent: getFRResults[1][i].timestamp,
                    message: getFRResults[1][i].message
                })
            } 
            
            res.json(friend_requests);
        } catch (error) {
            res.status(400).json(error);
        }
    }
});

// DELETE api/user/friend
// Törli a törzsben megadott barátot a barátlistáról
router.delete('/friend', verify, async (req, res) => {
    const user_id = req.jwt.id;
    const {friend_id} = req.body;
    const errors = userDelFriendValidator(req.jwt,req.body);

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        try {
            const friendsResult = await fc.getFriendlistIds(user_id, friend_id);

            const delFriendResult = await fc.deleteFriends(friendsResult[0].fr_id, friendsResult[1].fr_id);

            res.json({success: "Successfully deleted friend"});
        } catch (error) {
            res.status(400).json(error);
        }
    }
});

module.exports = router;