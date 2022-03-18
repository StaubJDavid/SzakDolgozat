const db = require('../../database/db');

class authClass {
    constructor(){
        this.sql_checkIfRegistered = 
        "SELECT * FROM `users` WHERE email LIKE ? OR LOWER(nickname) LIKE LOWER(?)"
        ;

        this.sql_registerUser = 
            "INSERT INTO `users`(`email`, `password`, `nickname`, `role`, `confirmed`, `registered`, `last_login`) VALUES (?,?,?,'user',1,current_timestamp(),current_timestamp());"
        ;

        this.sql_getRegisteredUser = 
            "SELECT * FROM `users` WHERE user_id = ?"
        ;

        this.sql_fillDefaultValues =
            'INSERT INTO `user_details`(`user_id`, `dt_id`, `value`) VALUES (?,1,"Welcome to my crib")'
        ;

        this.sql_loginCheckIfRegistered =
            'SELECT * FROM `users` WHERE email LIKE ?'
        ;

    };

    loginCheckIfRegistered(email){
        let error = new Error('Check if registered for login');
        return new Promise((resolve,reject) => {
            db.query(this.sql_loginCheckIfRegistered, [email], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_loginCheckIfRegistered query error";
                    error.log = err;
    
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })  
    };

    checkIfRegistered(email,nickname){
        let error = new Error('Check if registered');
        return new Promise((resolve,reject) => {
            db.query(this.sql_checkIfRegistered, [email, nickname], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_checkIfRegistered query error";
                    error.log = err;
    
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })  
    };

    registerUser(email, hashedPassword, nickname){
        let error = new Error('Register user');
        return new Promise((resolve,reject) => {
            db.query(this.sql_registerUser, [email, hashedPassword, nickname], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_registerUser query error";
                    error.log = err;
    
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })  
    };

    fillDefaultValues(user_id){
        let error = new Error('Fill default values');
        return new Promise((resolve,reject) => {
            db.query(this.sql_fillDefaultValues, [user_id], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_fillDefaultValues query error";
                    error.log = err;
    
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })  
    };
}

module.exports = authClass;