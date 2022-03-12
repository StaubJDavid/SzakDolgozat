const express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../database/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const verify = require('../helpers/verify');
const isEmpty = require('../helpers/isEmpty');

const chatClass = require('../helpers/queries/chatQueries');
const checkIfFriends = require('../helpers/checkIfFriends');
const checkIfHasMessageProperty = require('../helpers/checkIfHasMessageProperty');
const getMessageKey = require('../helpers/getMessageKey');
const cc = new chatClass();

require('dotenv').config();

// -------------------------------
// GET api/chat/friendlist
// Get the current user based on the authorization header
// Private
// -------------------------------
router.get('/friendlist', verify, async (req, res) => {
    const user_id = req.jwt.id

    try {
        const friendlistRaw = await cc.getFriendlist(user_id);
        if(friendlistRaw.success){
            
            for(let i = 0; i<friendlistRaw.data.length ; i++){
                friendlistRaw.data[i].friend_id = parseInt(friendlistRaw.data[i].value.substring(0,friendlistRaw.data[i].value.indexOf(' ')));
                friendlistRaw.data[i].friend_name = friendlistRaw.data[i].value.substring(friendlistRaw.data[i].value.indexOf(' ')+1);
            }
            //res.json(friendlistRaw);

            const messagesResult = await cc.getOwnMessages(user_id,friendlistRaw.data.length);
            //res.json(messagesResult);

            const lastMessages = {};
            for(let i = 0; i < messagesResult.datasent.length; i++){
                const {reciever_id, sender_id, message_id,message,timestamp} = messagesResult.datasent[i];

                if(checkIfHasMessageProperty(lastMessages,reciever_id,sender_id)){
                    const messageKey = getMessageKey(lastMessages,reciever_id,sender_id);

                    if(lastMessages[messageKey].message.timestamp < timestamp){
                        lastMessages[messageKey].direction = "sent";
                        lastMessages[messageKey].message = messagesResult.datasent[i]
                    }
                }else{
                    //console.log("Has no property");
                    lastMessages[sender_id.valueOf() + "_" + reciever_id.valueOf()] = {
                        direction: "sent",
                        message: messagesResult.datasent[i]
                    }
                }
            }

            for(let i = 0; i < messagesResult.datarecieved.length; i++){
                const {reciever_id, sender_id, message_id,message,timestamp} = messagesResult.datarecieved[i];

                if(checkIfHasMessageProperty(lastMessages,reciever_id,sender_id)){
                    const messageKey = getMessageKey(lastMessages,reciever_id,sender_id);

                    if(lastMessages[messageKey].message.timestamp < timestamp){
                        lastMessages[messageKey].direction = "recieved";
                        lastMessages[messageKey].message = messagesResult.datarecieved[i]
                    }
                }else{
                    //console.log("Has no property");
                    lastMessages[reciever_id.valueOf() + "_" + sender_id.valueOf()] = {
                        direction: "recieved",
                        message: messagesResult.datarecieved[i]
                    }
                }
            }

            const data = {
                friendlist: friendlistRaw,
                messages: lastMessages
            }

            res.json(data);

        }else{
            res.status(400).json({success:false, reason:"unknown"});
        }
    } catch (error) {
        //Literally catch every error I raise, or something else does
        console.log(error);
        res.status(400).json(error);
    }
});

router.get('/messages/:friend_id', verify, async (req, res) => {
    const user_id = req.jwt.id
    const friend_id = req.params.friend_id;

    try {
        const friends = await checkIfFriends(user_id, friend_id);
        if(friends === 1){
            
            const messagesResult = await cc.getAllMessages(user_id, friend_id);
            
            res.json(messagesResult);

        }else if(friends === 0){
            res.status(400).json({success:false, reason: "Not friends"});
        }else{
            res.status(400).json({success:false, reason: "SQL error"});
        }
    } catch (error) {
        //Literally catch every error I raise, or something else does
        console.log(error);
        res.status(400).json(error);
    }
});

router.post('/send', verify, async (req, res) => {
    const user_id = req.jwt.id
    const {reciever_id, message} = req.body;

    try {
        const friends = await checkIfFriends(user_id, reciever_id);

        if(friends === 1){
            const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');

            const insertResult = await cc.sendMessage(user_id, reciever_id, message, timestamp);
            
            res.json(insertResult);

        }else if(friends === 0){
            res.status(400).json({success:false, reason: "Not friends"});
        }else{
            res.status(400).json({success:false, reason: "SQL error"});
        }
    } catch (error) {
        //Literally catch every error I raise, or something else does
        console.log(error);
        res.status(400).json(error);
    }
});

module.exports = router;