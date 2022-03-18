const axios = require('axios');
const db = require('../../database/db');

class chatClass {
    constructor(){
        this.sql_getFriends =
            'SELECT * FROM `user_details` WHERE user_id = ? AND dt_id = 4 ;'
        ;

        this.sql_insertMessage =
            'INSERT INTO `messages`(`sender_id`, `reciever_id`, `message`, `timestamp`) VALUES (?,?,?,?)'
        ;

        this.sql_ownMessages =
            'SELECT * FROM `messages` WHERE `message_id` IN (SELECT max(`message_id`) FROM `messages` WHERE `sender_id` = ? GROUP BY `reciever_id`) ;' +
            'SELECT * FROM `messages` WHERE `message_id` IN (SELECT max(`message_id`) FROM `messages` WHERE `reciever_id` = ? GROUP BY `sender_id`) '
        ;

        this.sql_allMessages =
            'SELECT * FROM `messages` WHERE ( sender_id = ? AND reciever_id = ? ) OR ( sender_id = ? AND reciever_id = ? ) ORDER BY timestamp DESC'    
        ;

        this.sql_message =
            'SELECT * FROM `messages` WHERE message_id = ?'    
        ;

        this.sql_updateLastMessage =
            'UPDATE `friend_list` SET `message_id` = ? WHERE ( `user_id` = ? AND `friend_id` = ? ) OR ( `user_id` = ? AND `friend_id` = ? ) ;'    
        ;

    };

    async getFriendlist(id){
        let error = new Error('Get friendlist');
        return new Promise((resolve,reject) => {
            db.query(this.sql_getFriends, [id], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_getEverySubscribed query error";
                    error.log = err;
        
                    reject(error);
                }else{
                    resolve({success: true, data:results})
                }
            });
        })  
    };

    async sendMessage(sender_id, reciever_id, message, timestamp){
        let error = new Error('Send message');
        return new Promise((resolve,reject) => {
            db.query(this.sql_insertMessage, [sender_id, reciever_id, message, timestamp], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_insertMessage query error";
                    error.log = err;
        
                    reject(error);
                }else{
                    if(results.affectedRows === 1){
                        resolve({success: true, data:results})
                    }else{
                        reject({success: false, data:results});
                    }
                }
            });
        })  
    };

    async getOwnMessages(user_id,length){
        let error = new Error('Send message');
        return new Promise((resolve,reject) => {
            db.query(this.sql_ownMessages, [user_id, user_id], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_ownMessages query error";
                    error.log = err;
        
                    reject(error);
                }else{
                    resolve({success: true, datasent:results[0], datarecieved:results[1]})
                }
            });
        })  
    };

    async getAllMessages(user_id,friend_id){
        let error = new Error('Send message');
        return new Promise((resolve,reject) => {
            db.query(this.sql_allMessages, [user_id, friend_id, friend_id, user_id], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_allMessages query error";
                    error.log = err;
        
                    reject(error);
                }else{
                    resolve({success: true, data:results})
                }
            });
        })  
    };

    async getMessage(message_id){
        let error = new Error('Send message');
        return new Promise((resolve,reject) => {
            db.query(this.sql_message, [message_id], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_allMessages query error";
                    error.log = err;
        
                    reject(error);
                }else{
                    resolve({success: true, data:results})
                }
            });
        })  
    };


    async updateLastMessage(message_id,user_id, reciever_id){
        let error = new Error('Send message');
        return new Promise((resolve,reject) => {
            db.query(this.sql_updateLastMessage, [message_id, user_id, reciever_id, reciever_id, user_id], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_updateLastMessage query error";
                    error.log = err;
        
                    reject(error);
                }else{
                    if(results.affectedRows === 2){
                        resolve(true);
                    }else{
                        resolve(false);
                    }
                }
            });
        })  
    };

}

module.exports = chatClass;