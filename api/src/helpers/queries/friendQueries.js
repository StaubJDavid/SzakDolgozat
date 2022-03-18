const db = require('../../database/db');

class friendClass {
    constructor(){
        this.sql_getFriends =
        'SELECT fl.*,u.nickname FROM `friend_list` fl JOIN `users` u ON u.user_id = fl.friend_id WHERE fl.user_id = ? ;' 
        ;

        this.sql_getFriendsWithMessage =
        'SELECT fl.*,u.nickname,m.message, m.timestamp, m.sender_id ' +
        'FROM `friend_list` fl '+
        'JOIN `users` u ON u.user_id = fl.friend_id '+
        'LEFT JOIN `messages` m ON m.message_id = fl.message_id '+
        'WHERE fl.user_id = ? '+
        'ORDER BY timestamp DESC ;'
        ;

        this.sql_checkIfFriends =
        'SELECT fl.*,u.nickname FROM `friend_list` fl JOIN `users` u ON u.user_id = fl.friend_id WHERE fl.user_id = ? AND fl.friend_id = ? ;' 
        ;

        this.sql_getFriendsListIds =
        'SELECT * FROM `friend_list` WHERE (user_id = ? AND friend_id = ? ) OR (user_id = ? AND friend_id = ? )' 
        ;

        this.sql_deleteFriends =
        'DELETE FROM `friend_list` WHERE `fr_id` = ? OR `fr_id` = ?'

    };

    async getFriends(user_id){
        let err = new Error('Get friends error');
        return new Promise((resolve,reject) => {
            db.query(this.sql_getFriends, [user_id], (err1, results1) => {
                if(err1){
                    console.log(err1);
                    err.query = "sql_getFriends query error";
                    err.log = err1;
        
                    reject(err);
                }else{
                    resolve(results1);
                }
            });
        })   
    };

    async getFriendsWithMessage(user_id){
        let err = new Error('Get friends error');
        return new Promise((resolve,reject) => {
            db.query(this.sql_getFriendsWithMessage, [user_id], (err1, results1) => {
                if(err1){
                    console.log(err1);
                    err.query = "sql_getFriendsWithMessage query error";
                    err.log = err1;
        
                    reject(err);
                }else{
                    resolve(results1);
                }
            });
        })   
    };

    async checkIfFriends(user_id, friend_id){
        let err = new Error('Get friends error');
        return new Promise((resolve,reject) => {
            db.query(this.sql_checkIfFriends, [user_id, friend_id], (err1, results1) => {
                if(err1){
                    console.log(err1);
                    err.query = "sql_checkIfFriends query error";
                    err.log = err1;
        
                    reject(err);
                }else{
                    if(results1.length === 1){
                        resolve(true);
                    }
                    else{
                        resolve(false);
                    }
                }
            });
        })   
    };

    async getFriendlistIds(user_id, friend_id){
        let err = new Error('Get friends error');
        return new Promise((resolve,reject) => {
            db.query(this.sql_getFriendsListIds, [user_id, friend_id, friend_id, user_id], (err1, results1) => {
                if(err1){
                    console.log(err1);
                    err.query = "sql_getFriendsListIds query error";
                    err.log = err1;
        
                    reject(err);
                }else{
                    if(results1.length === 2){
                        resolve(results1);
                    }else{
                        err.reason = "not friends?";
                        reject(err);
                    }
                }
            });
        })   
    };

    async deleteFriends(firstId, secondId){
        let err = new Error('Get friends error');
        return new Promise((resolve,reject) => {
            db.query(this.sql_deleteFriends, [firstId, secondId], (err1, results1) => {
                if(err1){
                    console.log(err1);
                    err.query = "deleteFriends query error";
                    err.log = err1;
        
                    reject(err);
                }else{
                    if(results1.affectedRows === 2){
                        resolve(results1);
                    }else{
                        err.reason = "not friends?";
                        reject(err);
                    }
                }
            });
        })   
    };
 
}

module.exports = friendClass;