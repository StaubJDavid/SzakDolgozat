const db = require('../../database/db');

class userClass {
    constructor(){
        this.sql_getUserDetails = 
            'SELECT ud.ud_id,ud.user_id,ud.dt_id,dt.type_name,ud.value '+
            'FROM user_details as ud '+
            'JOIN detail_types as dt ON ud.dt_id = dt.dt_id '+
            'WHERE ud.user_id = ?'
        ;

        this.sql_getUser = 
            'SELECT user_id,email,nickname,registered,last_login FROM users WHERE user_id = ?'
        ;

        this.sql_getUserNickname = 
            'SELECT nickname FROM users WHERE user_id = ?'
        ;

        this.sql_checkBeforeAddDetails =
            'SELECT * FROM user_details WHERE user_id = ? AND dt_id = ? AND value LIKE ?'
        ;

        this.sql_addDetails =
            'INSERT INTO `user_details`(`user_id`, `dt_id`, `value`) VALUES (?,?,?)'
        ;

        this.sql_checkBeforeDeleteDetail =
            'SELECT * FROM user_details WHERE user_id = ? AND ud_id = ?'
        ;

        this.sql_deleteDetail =
            'DELETE FROM `user_details` WHERE user_id = ? AND ud_id = ?'
        ;

        this.sql_checkBeforeEditDetail =
            'SELECT * FROM user_details WHERE (user_id = ? AND ud_id = ?) OR (user_id = ? AND value LIKE ?)'
        ;

        this.sql_editDetail =
            'UPDATE `user_details` SET `value`=? WHERE user_id = ? AND ud_id = ?'
        ;

        this.sql_getFriend =
            'SELECT * from user_details WHERE user_id = ? AND dt_id = 4 ;'+
            'SELECT * from user_details WHERE user_id = ? AND dt_id = 4 ;'
        ;


        this.sql_deleteFriend =
            'DELETE FROM user_details WHERE ud_id = ? OR ud_id = ?'
        ;

    };

    getUser(user_id){
        let error = new Error('Check if registered for login');
        return new Promise((resolve,reject) => {
            db.query(this.sql_getUser, [user_id], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_getUser query error";
                    error.log = err;
    
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })  
    };

    getUserDetails(user_id){
        let error = new Error('Check if registered for login');
        return new Promise((resolve,reject) => {
            db.query(this.sql_getUserDetails, [user_id], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_getUserDetails query error";
                    error.log = err;
    
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })  
    };

    checkBeforeAddDetails(user_id,dt_id,value){
        let error = new Error('Check if registered for login');
        return new Promise((resolve,reject) => {
            db.query(this.sql_checkBeforeAddDetails, [user_id,dt_id,value], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_checkBeforeAddDetails query error";
                    error.log = err;
    
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })  
    };

    addDetails(user_id,dt_id,value){
        let error = new Error('Check if registered for login');
        return new Promise((resolve,reject) => {
            db.query(this.sql_addDetails, [user_id,dt_id,value], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_addDetails query error";
                    error.log = err;
    
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })  
    };

    deleteDetail(user_id,ud_id){
        let error = new Error('Check if registered for login');
        return new Promise((resolve,reject) => {
            db.query(this.sql_deleteDetail, [user_id,ud_id], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_deleteDetail query error";
                    error.log = err;
    
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })  
    };

    checkBeforeEditDetail(user_id,ud_id,value){
        let error = new Error('Check if registered for login');
        return new Promise((resolve,reject) => {
            db.query(this.sql_checkBeforeEditDetail, [user_id,ud_id,user_id,value], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_checkBeforeEditDetail query error";
                    error.log = err;
    
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })  
    };

    editDetail(value,user_id,ud_id){
        let error = new Error('Check if registered for login');
        return new Promise((resolve,reject) => {
            db.query(this.sql_editDetail, [value,user_id,ud_id], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_editDetail query error";
                    error.log = err;
    
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })  
    };
}

module.exports = userClass;