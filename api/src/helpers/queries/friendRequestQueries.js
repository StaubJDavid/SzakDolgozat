const db = require('../../database/db');

class friendRequestClass {
    constructor(){
        //Sending
        this.sql_checkBeforeSendFriendRequest = 
            "SELECT * FROM `friend_requests` WHERE sender_id = ? AND reciever_id = ? ;"+
            "SELECT * FROM `users` WHERE user_id = ?"
        ;

        this.sql_checkIfFriends = 
            "SELECT * FROM `user_details` WHERE user_id = ? AND dt_id = 4"
        ;

        this.sql_sendFriendRequest = 
            "INSERT INTO `friend_requests` (`sender_id`, `reciever_id`, `message`, `timestamp`) VALUES (?,?,?,current_timestamp())"
        ;

        //Accept
        this.sql_checkBeforeAcceptFriendRequest = 
            "SELECT * FROM friend_requests WHERE sender_id = ? AND reciever_id = ?"
        ;

        this.sql_getUserNickname = 
            "SELECT nickname FROM users WHERE user_id = ?"
        ;

        this.sql_acceptFriendRequest = 
            "DELETE FROM `friend_requests` WHERE (sender_id = ? AND reciever_id = ?) OR (sender_id = ? AND reciever_id = ?);"+
            "INSERT INTO `friend_list` (`user_id`,`friend_id`) VALUES (?,?), (?,?)"
        ;

        //Delete
        this.sql_checkBeforeDeleteFriendRequest =
            'SELECT * FROM `friend_requests` WHERE (sender_id = ? AND reciever_id = ?) OR (sender_id = ? AND reciever_id = ?)'
        ;

        this.sql_deleteFriendRequest =
            'DELETE FROM `friend_requests` WHERE (sender_id = ? AND reciever_id = ?) OR (sender_id = ? AND reciever_id = ?)'
        ;

        //Get
        this.sql_getFriendRequests =
            'SELECT * FROM friend_requests fr JOIN users u on fr.reciever_id = u.user_id WHERE fr.sender_id = ? ;'+
            'SELECT * FROM friend_requests fr JOIN users u on fr.sender_id = u.user_id WHERE fr.reciever_id = ? ;'
        ;

    };

    checkBeforeSendFriendRequest(user_id,reciever_id){
        let error = new Error('Check if registered for login');
        return new Promise((resolve,reject) => {
            db.query(this.sql_checkBeforeSendFriendRequest, [user_id,reciever_id,reciever_id], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_checkBeforeSendFriendRequest query error";
                    error.log = err;
    
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })  
    };

    sendFriendRequest(user_id,reciever_id,message){
        let error = new Error('Check if registered for login');
        return new Promise((resolve,reject) => {
            db.query(this.sql_sendFriendRequest, [user_id,reciever_id,message], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_sendFriendRequest query error";
                    error.log = err;
    
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })  
    };

    checkBeforeAcceptFriendRequest(sender_id,user_id){
        let error = new Error('Check if registered for login');
        return new Promise((resolve,reject) => {
            db.query(this.sql_checkBeforeAcceptFriendRequest, [sender_id,user_id], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_checkBeforeAcceptFriendRequest query error";
                    error.log = err;
    
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })  
    };

    getUserNickname(sender_id){
        let error = new Error('Check if registered for login');
        return new Promise((resolve,reject) => {
            db.query(this.sql_getUserNickname, [sender_id], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_getUserNickname query error";
                    error.log = err;
    
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })  
    };

    acceptFriendRequest(user_id,sender_id){
        let error = new Error('Check if registered for login');
        return new Promise((resolve,reject) => {
            db.query(this.sql_acceptFriendRequest, [user_id,sender_id, sender_id,user_id,
                                                    user_id,sender_id, sender_id,user_id],
            (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_acceptFriendRequest query error";
                    error.log = err;
    
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })  
    };

    deleteFriendRequest(user_id, other_id){
        let error = new Error('Check if registered for login');
        return new Promise((resolve,reject) => {
            db.query(this.sql_deleteFriendRequest, [user_id, other_id, other_id, user_id],(err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_deleteFriendRequest query error";
                    error.log = err;
    
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })  
    };

    getFriendRequests(user_id){
        let error = new Error('Check if registered for login');
        return new Promise((resolve,reject) => {
            db.query(this.sql_getFriendRequests, [user_id, user_id],(err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_getFriendRequests query error";
                    error.log = err;
    
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })  
    };
}

module.exports = friendRequestClass;